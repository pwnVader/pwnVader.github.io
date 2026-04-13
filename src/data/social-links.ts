export interface SocialLink {
  label: string;
  href: string;
  icon: string;
  handle: string;
  colorHoverClass: string;
  colorGroupClass: string;
}

export const socialLinks: SocialLink[] = [
  {
    label: 'GitHub',
    href: 'https://github.com/pwnvader',
    icon: 'lucide:github',
    handle: 'pwnVader',
    colorHoverClass: 'hover:border-white hover:text-white hover:shadow-[0_0_15px_rgba(255,255,255,0.3)]',
    colorGroupClass: 'group-hover:text-white group-hover:border-white group-hover:shadow-[0_0_15px_rgba(255,255,255,0.3)]'
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/perezromerojesus',
    icon: 'lucide:linkedin',
    handle: '2.2K seguidores',
    colorHoverClass: 'hover:border-[#58a6ff] hover:text-[#58a6ff] hover:shadow-[0_0_15px_rgba(88,166,255,0.3)]',
    colorGroupClass: 'group-hover:text-[#58a6ff] group-hover:border-[#58a6ff] group-hover:shadow-[0_0_15px_rgba(88,166,255,0.3)]'
  },
  {
    label: 'Medium',
    href: 'https://medium.com/@pwnvader',
    icon: 'social-medium',
    handle: '@pwnvader',
    colorHoverClass: 'hover:border-white hover:text-white hover:shadow-[0_0_15px_rgba(255,255,255,0.3)]',
    colorGroupClass: 'group-hover:text-white group-hover:border-white group-hover:shadow-[0_0_15px_rgba(255,255,255,0.3)]'
  },
  {
    label: 'TryHackMe',
    href: 'https://tryhackme.com/p/pwnVader',
    icon: 'social-thm',
    handle: 'Top 1%',
    colorHoverClass: 'hover:border-[#d29922] hover:text-[#d29922] hover:shadow-[0_0_15px_rgba(210,153,34,0.3)]',
    colorGroupClass: 'group-hover:text-[#d29922] group-hover:border-[#d29922] group-hover:shadow-[0_0_15px_rgba(210,153,34,0.3)]'
  },
  {
    label: 'HackTheBox',
    href: 'https://app.hackthebox.com/users/1247070',
    icon: 'lucide:box',
    handle: 'pwnVader',
    colorHoverClass: 'hover:border-[#3fb950] hover:text-[#3fb950] hover:shadow-[0_0_15px_rgba(63,185,80,0.3)]',
    colorGroupClass: 'group-hover:text-[#3fb950] group-hover:border-[#3fb950] group-hover:shadow-[0_0_15px_rgba(63,185,80,0.3)]'
  },
  {
    label: 'Email',
    href: 'mailto:contacto.jesuspr.upon866@passmail.com',
    icon: 'social-proton',
    handle: 'contacto.jesuspr.upon866@passmail.com',
    colorHoverClass: 'hover:border-[#a371f7] hover:text-[#a371f7] hover:shadow-[0_0_15px_rgba(163,113,247,0.3)]',
    colorGroupClass: 'group-hover:text-[#a371f7] group-hover:border-[#a371f7] group-hover:shadow-[0_0_15px_rgba(163,113,247,0.3)]'
  },
  {
    label: 'TikTok',
    href: 'https://www.tiktok.com/@pwnvader',
    icon: 'social-tiktok',
    handle: '@pwnvader',
    colorHoverClass: 'hover:border-accent hover:text-accent hover:shadow-[0_0_15px_var(--color-accent)]',
    colorGroupClass: 'group-hover:text-accent group-hover:border-accent group-hover:shadow-[0_0_15px_var(--color-accent)]'
  },
];
