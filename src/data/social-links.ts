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
    colorHoverClass: 'hover:border-white hover:text-white',
    colorGroupClass: 'group-hover:text-white group-hover:border-white/50'
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/perezromerojesus',
    icon: 'lucide:linkedin',
    handle: '2.2K seguidores',
    colorHoverClass: 'hover:border-[#58a6ff] hover:text-[#58a6ff]',
    colorGroupClass: 'group-hover:text-[#58a6ff] group-hover:border-[#58a6ff]/50'
  },
  {
    label: 'Medium',
    href: 'https://medium.com/@pwnvader',
    icon: 'social-medium',
    handle: '@pwnvader',
    colorHoverClass: 'hover:border-white hover:text-white',
    colorGroupClass: 'group-hover:text-white group-hover:border-white/50'
  },
  {
    label: 'TryHackMe',
    href: 'https://tryhackme.com/p/pwnVader',
    icon: 'social-thm',
    handle: 'Top 1%',
    colorHoverClass: 'hover:border-[#d29922] hover:text-[#d29922]',
    colorGroupClass: 'group-hover:text-[#d29922] group-hover:border-[#d29922]/50'
  },
  {
    label: 'HackTheBox',
    href: 'https://app.hackthebox.com/users/1247070',
    icon: 'lucide:box',
    handle: 'pwnVader',
    colorHoverClass: 'hover:border-[#3fb950] hover:text-[#3fb950]',
    colorGroupClass: 'group-hover:text-[#3fb950] group-hover:border-[#3fb950]/50'
  },
  {
    label: 'Email',
    href: 'mailto:contacto.jesuspr.upon866@passmail.com',
    icon: 'social-proton',
    handle: 'contacto.jesuspr.upon866@passmail.com',
    colorHoverClass: 'hover:border-[#a371f7] hover:text-[#a371f7]',
    colorGroupClass: 'group-hover:text-[#a371f7] group-hover:border-[#a371f7]/50'
  },
  {
    label: 'TikTok',
    href: 'https://www.tiktok.com/@pwnvader',
    icon: 'social-tiktok',
    handle: '@pwnvader',
    colorHoverClass: 'hover:border-accent hover:text-accent',
    colorGroupClass: 'group-hover:text-accent group-hover:border-accent/50'
  },
];
