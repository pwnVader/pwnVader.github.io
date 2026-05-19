import matter from 'gray-matter';

// ── Types ──────────────────────────────────────────────

export interface WriteupEntry {
  title: string;
  platform: string;
  os: string;
  difficulty: string;
  date: string;
  tags: string[];
  url: string;
  filename: string;
}

interface TreeNode {
  path: string;
  type: 'tree' | 'blob';
  url: string;
}

interface TreeResponse {
  tree: TreeNode[];
  truncated: boolean;
}

// ── Config ─────────────────────────────────────────────

const REPO_OWNER = 'pwnVader';
const REPO_NAME = 'CybersecurityDocs';
const CANDIDATE_BRANCHES = ['main', 'master'];

// Optional auth raises rate limit from 60 → 5000 req/h.
// Read from process.env (build-time, Node) and fall back to import.meta.env
// (only catches PUBLIC_/VITE_ prefixed vars, kept for completeness).
const GITHUB_TOKEN =
  (typeof process !== 'undefined' && process.env?.GITHUB_TOKEN) ||
  import.meta.env.GITHUB_TOKEN ||
  import.meta.env.PUBLIC_GITHUB_TOKEN ||
  '';

// ── Helpers ────────────────────────────────────────────

function buildHeaders(): Record<string, string> {
  const headers: Record<string, string> = {
    Accept: 'application/vnd.github.v3+json',
    'User-Agent': 'pwnvader-portfolio',
  };
  if (GITHUB_TOKEN) {
    headers['Authorization'] = `Bearer ${GITHUB_TOKEN}`;
  }
  return headers;
}

function filenameToTitle(filename: string): string {
  return filename
    .replace(/\.md$/i, '')
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function normalizeDate(value: unknown): string {
  if (value instanceof Date) {
    return value.toISOString().split('T')[0];
  }
  if (typeof value === 'string') {
    if (/^\d{4}-\d{2}-\d{2}$/.test(value)) return value;
    const d = new Date(value);
    if (!isNaN(d.getTime())) return d.toISOString().split('T')[0];
  }
  return 'N/A';
}

function normalizeTags(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.map((v) => String(v).trim()).filter(Boolean);
  }
  if (typeof value === 'string') {
    return value.split(',').map((s) => s.trim()).filter(Boolean);
  }
  return [];
}

function parseFrontmatter(
  raw: string,
  filename: string,
  htmlUrl: string
): WriteupEntry {
  try {
    const { data } = matter(raw);
    return {
      title: data.title || filenameToTitle(filename),
      platform: data.platform || 'N/A',
      os: data.os || 'N/A',
      difficulty: data.difficulty || 'N/A',
      date: data.date ? normalizeDate(data.date) : 'N/A',
      tags: normalizeTags(data.tags),
      url: htmlUrl,
      filename,
    };
  } catch {
    return {
      title: filenameToTitle(filename),
      platform: 'N/A',
      os: 'N/A',
      difficulty: 'N/A',
      date: 'N/A',
      tags: [],
      url: htmlUrl,
      filename,
    };
  }
}

// ── GitHub fetch — single trees call + raw content ──────

async function fetchTree(branch: string): Promise<TreeResponse | null> {
  const url = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/git/trees/${branch}?recursive=1`;
  try {
    const response = await fetch(url, { headers: buildHeaders() });
    if (!response.ok) {
      const remaining = response.headers.get('x-ratelimit-remaining');
      const limit = response.headers.get('x-ratelimit-limit');
      const auth = GITHUB_TOKEN ? 'authenticated' : 'unauthenticated';
      const hint =
        response.status === 403 && remaining === '0'
          ? `   → rate limit hit. Limit ${limit}/h ${auth}. Set GITHUB_TOKEN in .env to raise to 5000/h.`
          : response.status === 404
            ? `   → branch "${branch}" not found in ${REPO_OWNER}/${REPO_NAME}.`
            : '';
      console.warn(
        `[fetchWriteups] tree fetch "${branch}" → ${response.status} (rate-limit remaining: ${remaining}/${limit}, ${auth})`
      );
      if (hint) console.warn(hint);
      return null;
    }
    return (await response.json()) as TreeResponse;
  } catch (err) {
    console.warn(`[fetchWriteups] tree fetch "${branch}" threw:`, err);
    return null;
  }
}

async function fetchRaw(branch: string, path: string): Promise<string | null> {
  const url = `https://raw.githubusercontent.com/${REPO_OWNER}/${REPO_NAME}/${branch}/${path}`;
  try {
    const response = await fetch(url, {
      headers: { 'User-Agent': 'pwnvader-portfolio' },
    });
    if (!response.ok) return null;
    return await response.text();
  } catch {
    return null;
  }
}

// ── Public API ─────────────────────────────────────────

/**
 * Fetch all .md writeups from the GitHub repo.
 * Strategy:
 *   1. Resolve the default branch (main → master fallback).
 *   2. Single recursive `git/trees` call to list every file.
 *   3. Pull raw content per .md file from raw.githubusercontent.com
 *      (no API rate limit).
 *   4. Parse YAML frontmatter (title, platform, os, difficulty, date).
 *
 * Excludes README files and any path under `htb-academy/` since those are
 * already surfaced as their own cards in the writeups page.
 */
export async function getWriteups(): Promise<WriteupEntry[]> {
  console.log('[fetchWriteups] Fetching from GitHub git/trees…');

  let tree: TreeResponse | null = null;
  let branch = '';
  for (const candidate of CANDIDATE_BRANCHES) {
    tree = await fetchTree(candidate);
    if (tree) {
      branch = candidate;
      break;
    }
  }

  if (!tree) {
    console.warn('[fetchWriteups] Could not retrieve repo tree from any branch.');
    return [];
  }

  if (tree.truncated) {
    console.warn('[fetchWriteups] Tree response was truncated by GitHub. Some entries may be missing.');
  }

  const mdNodes = tree.tree.filter((n) => {
    if (n.type !== 'blob') return false;
    const lowerPath = n.path.toLowerCase();
    if (!lowerPath.endsWith('.md')) return false;
    if (lowerPath.endsWith('readme.md')) return false;
    // Only fetch files inside the writeups_src/ directory
    if (!lowerPath.startsWith('writeups_src/')) return false;
    // Skip HTB Academy files since they have dedicated cards
    if (lowerPath.startsWith('writeups_src/htb-academy/')) return false;
    return true;
  });

  const entries = await Promise.all(
    mdNodes.map(async (node) => {
      const filename = node.path.split('/').pop() ?? node.path;
      const htmlUrl = `https://github.com/${REPO_OWNER}/${REPO_NAME}/blob/${branch}/${node.path}`;
      const raw = await fetchRaw(branch, node.path);
      if (!raw) {
        return {
          title: filenameToTitle(filename),
          platform: 'N/A',
          os: 'N/A',
          difficulty: 'N/A',
          date: 'N/A',
          tags: [],
          url: htmlUrl,
          filename,
        };
      }
      return parseFrontmatter(raw, filename, htmlUrl);
    })
  );

  entries.sort((a, b) => {
    if (a.date === 'N/A') return 1;
    if (b.date === 'N/A') return -1;
    return b.date.localeCompare(a.date);
  });

  console.log(`[fetchWriteups] ✓ Loaded ${entries.length} writeups (branch: ${branch}).`);
  return entries;
}
