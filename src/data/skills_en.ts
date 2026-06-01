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
    title: 'Offensive Security',
    icon: 'lucide:skull',
    command: 'cat /etc/security/offensive.conf',
    colorClass: 'text-[#f38ba8]',
    hoverClass: 'hover:border-[#f38ba8] hover:shadow-[0_0_20px_rgba(243,139,168,0.25)]',
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
    title: 'Systems & Networks',
    icon: 'lucide:server',
    command: 'systemctl status network.service',
    colorClass: 'text-[#89b4fa]',
    hoverClass: 'hover:border-[#89b4fa] hover:shadow-[0_0_20px_rgba(137,180,250,0.25)]',
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
    title: 'AI & Automation',
    icon: 'lucide:bot',
    command: 'python3 -m ai_tools --list',
    colorClass: 'text-[#fab387]',
    hoverClass: 'hover:border-[#fab387] hover:shadow-[0_0_20px_rgba(250,179,135,0.25)]',
    skills: [
      { name: 'Prompt Engineering' },
      { name: 'LLM Integration (MCP)' },
      { name: 'Script Automation' },
      { name: 'AI-Assisted Pentesting' },
    ],
  },
  {
    title: 'Power Platform',
    icon: 'lucide:zap',
    command: 'Get-PowerApp | Format-Table',
    colorClass: 'text-[#cba6f7]',
    hoverClass: 'hover:border-[#cba6f7] hover:shadow-[0_0_20px_rgba(203,166,247,0.25)]',
    skills: [
      { name: 'Power Automate' },
      { name: 'Power Apps' },
      { name: 'Process Automation' },
    ],
  },
  {
    title: 'CTF Platforms',
    icon: 'lucide:flag',
    command: 'ls ~/ctf/platforms/',
    colorClass: 'text-[#a6e3a1]',
    hoverClass: 'hover:border-[#a6e3a1] hover:shadow-[0_0_20px_rgba(166,227,161,0.25)]',
    skills: [
      { name: 'HackTheBox', icon: 'tech-htb' },
      { name: 'TryHackMe (Top 1%)', icon: 'social-thm' },
      { name: 'Competitive CTFs' },
    ],
  },
  {
    title: 'Upcoming Certs.',
    icon: 'lucide:award',
    command: 'cat ~/goals/certifications.txt',
    colorClass: 'text-[#b4befe]',
    hoverClass: 'hover:border-[#b4befe] hover:shadow-[0_0_20px_rgba(180,190,254,0.25)]',
    skills: [
      { name: 'HTB Certified Penetration Testing Specialist (CPTS)', icon: 'tech-htb' },
      { name: 'TCM Practical Network Penetration Tester (PNPT)' },
    ],
  },
];
