export interface Skill {
  name: string;
  icon?: string;
}

export interface SkillCategory {
  title: string;
  icon: string;
  command: string;
  colorClass: string;
  hoverClass: string;
  skills: Skill[];
}

export const skillCategories: SkillCategory[] = [
  {
    title: 'Seguridad Ofensiva',
    icon: 'lucide:skull',
    command: 'cat /etc/security/offensive.conf',
    colorClass: 'text-[#f85149]',
    hoverClass: 'hover:border-[#f85149] hover:shadow-[0_0_20px_rgba(248,81,73,0.25)]',
    skills: [
      { name: 'Network Penetration Testing' },
      { name: 'Web Application Security (OWASP Top 10)' },
      { name: 'Buffer Overflow Exploitation (x86/x64)' },
      { name: 'Active Directory Attacks' },
      { name: 'Privilege Escalation (Linux & Windows)' },
      { name: 'Red Teaming' },
      { name: 'OSINT & Reconnaissance' },
    ],
  },
  {
    title: 'Sistemas & Redes',
    icon: 'lucide:server',
    command: 'systemctl status network.service',
    colorClass: 'text-[#58a6ff]',
    hoverClass: 'hover:border-[#58a6ff] hover:shadow-[0_0_20px_rgba(88,166,255,0.25)]',
    skills: [
      { name: 'Linux Administration (Kali, Ubuntu, CentOS)', icon: 'tech-kali' },
      { name: 'Windows Server / Active Directory' },
      { name: 'Networking (TCP/IP, Firewalls, VPN)' },
      { name: 'Scripting: Python', icon: 'tech-python' },
      { name: 'Scripting: Bash', icon: 'tech-bash' },
      { name: 'Scripting: PowerShell', icon: 'tech-powershell' },
    ],
  },
  {
    title: 'IA & Automatización',
    icon: 'lucide:bot',
    command: 'python3 -m ai_tools --list',
    colorClass: 'text-[#d29922]',
    hoverClass: 'hover:border-[#d29922] hover:shadow-[0_0_20px_rgba(210,153,34,0.25)]',
    skills: [
      { name: 'Prompt Engineering' },
      { name: 'LLM Integration (MCP)' },
      { name: 'Automatización con Scripts' },
      { name: 'AI-Assisted Pentesting' },
    ],
  },
  {
    title: 'Power Platform',
    icon: 'lucide:zap',
    command: 'Get-PowerApp | Format-Table',
    colorClass: 'text-[#a371f7]',
    hoverClass: 'hover:border-[#a371f7] hover:shadow-[0_0_20px_rgba(163,113,247,0.25)]',
    skills: [
      { name: 'Power Automate' },
      { name: 'Power Apps' },
      { name: 'Process Automation' },
    ],
  },
  {
    title: 'Plataformas CTF',
    icon: 'lucide:flag',
    command: 'ls ~/ctf/platforms/',
    colorClass: 'text-[#3fb950]',
    hoverClass: 'hover:border-[#3fb950] hover:shadow-[0_0_20px_rgba(63,185,80,0.25)]',
    skills: [
      { name: 'HackTheBox', icon: 'tech-htb' },
      { name: 'TryHackMe (Top 1%)', icon: 'social-thm' },
      { name: 'CTFs Competitivos' },
    ],
  },
  {
    title: 'Próximas Cert.',
    icon: 'lucide:award',
    command: 'cat ~/goals/certifications.txt',
    colorClass: 'text-[var(--color-accent)]',
    hoverClass: 'hover:border-accent hover:shadow-[0_0_20px_rgba(46,230,95,0.25)]',
    skills: [
      { name: 'HTB Certified Penetration Testing Specialist (CPTS)', icon: 'tech-htb' },
      { name: 'Certified Offensive AI Expert (COAE)', icon: 'tech-htb' },
    ],
  },
];
