import matter from 'gray-matter';

// ── Types ──────────────────────────────────────────────

export interface WriteupEntry {
  title: string;
  platform: string;
  os: string;
  difficulty: string;
  date: string;
  url: string;
  filename: string;
}

interface GitHubContentItem {
  name: string;
  path: string;
  type: 'file' | 'dir';
  download_url: string | null;
  html_url: string;
}

// ── Config ─────────────────────────────────────────────

const REPO_OWNER = 'pwnVader';
const REPO_NAME = 'writeups';
const API_BASE = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents`;

// Set via environment variable for higher rate limits (optional)
const GITHUB_TOKEN = import.meta.env.GITHUB_TOKEN || '';

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

/**
 * Clean a filename into a readable title.
 * "htb-devvortex.md" → "Htb Devvortex"
 */
function filenameToTitle(filename: string): string {
  return filename
    .replace(/\.md$/i, '')
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

/**
 * Parse YAML frontmatter from raw markdown content.
 * Returns extracted fields or sensible defaults.
 */
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
      url: htmlUrl,
      filename,
    };
  } catch {
    // Frontmatter parse failed — use filename fallback
    return {
      title: filenameToTitle(filename),
      platform: 'N/A',
      os: 'N/A',
      difficulty: 'N/A',
      date: 'N/A',
      url: htmlUrl,
      filename,
    };
  }
}

/**
 * Normalize various date formats to YYYY-MM-DD string.
 */
function normalizeDate(value: unknown): string {
  if (value instanceof Date) {
    return value.toISOString().split('T')[0];
  }
  if (typeof value === 'string') {
    // Already in YYYY-MM-DD
    if (/^\d{4}-\d{2}-\d{2}$/.test(value)) return value;
    // Try parsing
    const d = new Date(value);
    if (!isNaN(d.getTime())) return d.toISOString().split('T')[0];
  }
  return 'N/A';
}

// ── Recursive Fetch ────────────────────────────────────

/**
 * Recursively fetch all .md files from a GitHub repo directory.
 * Enters subdirectories (/hackthebox/, /tryhackme/, etc.)
 */
async function fetchDirectoryRecursive(
  path: string = ''
): Promise<WriteupEntry[]> {
  const url = path ? `${API_BASE}/${path}` : API_BASE;
  const headers = buildHeaders();

  const response = await fetch(url, { headers });

  if (!response.ok) {
    const status = response.status;
    const rateLimitRemaining = response.headers.get('x-ratelimit-remaining');
    console.warn(
      `[fetchWriteups] GitHub API returned ${status} for path "${path}". ` +
        `Rate limit remaining: ${rateLimitRemaining}`
    );
    return [];
  }

  const items: GitHubContentItem[] = await response.json();
  const entries: WriteupEntry[] = [];

  for (const item of items) {
    if (item.type === 'dir') {
      // Recurse into subdirectories
      const subEntries = await fetchDirectoryRecursive(item.path);
      entries.push(...subEntries);
    } else if (item.type === 'file' && item.name.endsWith('.md')) {
      // Skip README files
      if (item.name.toLowerCase() === 'readme.md') continue;

      // Fetch raw content for frontmatter parsing
      if (item.download_url) {
        try {
          const rawResponse = await fetch(item.download_url, {
            headers: { 'User-Agent': 'pwnvader-portfolio' },
          });

          if (rawResponse.ok) {
            const rawContent = await rawResponse.text();
            const entry = parseFrontmatter(rawContent, item.name, item.html_url);
            entries.push(entry);
          } else {
            // Could not fetch content — use filename fallback
            entries.push({
              title: filenameToTitle(item.name),
              platform: 'N/A',
              os: 'N/A',
              difficulty: 'N/A',
              date: 'N/A',
              url: item.html_url,
              filename: item.name,
            });
          }
        } catch (err) {
          console.warn(`[fetchWriteups] Failed to fetch ${item.name}:`, err);
          entries.push({
            title: filenameToTitle(item.name),
            platform: 'N/A',
            os: 'N/A',
            difficulty: 'N/A',
            date: 'N/A',
            url: item.html_url,
            filename: item.name,
          });
        }
      }
    }
  }

  return entries;
}

// ── Public API ─────────────────────────────────────────

/**
 * Fetch all writeups from the GitHub repo.
 *
 * Call this in Astro frontmatter at build time:
 * ```ts
 * const writeups = await getWriteups();
 * ```
 */
export async function getWriteups(): Promise<WriteupEntry[]> {
  try {
    console.log('[fetchWriteups] Fetching from GitHub API...');
    const entries = await fetchDirectoryRecursive();

    if (entries.length === 0) {
      console.warn('[fetchWriteups] No entries found from API.');
      return [];
    }

    // Sort by date descending (most recent first)
    entries.sort((a, b) => {
      if (a.date === 'N/A') return 1;
      if (b.date === 'N/A') return -1;
      return b.date.localeCompare(a.date);
    });

    console.log(`[fetchWriteups] ✓ Loaded ${entries.length} writeups from GitHub.`);
    return entries;
  } catch (err) {
    console.error('[fetchWriteups] API fetch failed.', err);
    return [];
  }
}
