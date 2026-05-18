export interface SocialLink {
  label: string;
  href: string;
  icon: string;
  handle: string;
  colorHoverClass: string;
  colorGroupClass: string;
  /**
   * When set, the link is rendered with email obfuscation: visible address stays as
   * `[email protected]` placeholder and href stays at `#` until JS rehydrates it.
   * `handle` should already contain the same placeholder so the layout doesn't shift.
   */
  protectedEmail?: { user: string; domain: string };
}

export const socialLinks: SocialLink[] = [
  {
    label: 'GitHub',
    href: 'https://github.com/pwnvader',
    icon: 'social-github',
    handle: 'pwnVader',
    colorHoverClass: 'hover:border-[#cdd6f4] hover:text-[#cdd6f4] hover:shadow-[0_0_15px_rgba(205,214,244,0.25)]',
    colorGroupClass: 'group-hover:text-[#cdd6f4] group-hover:border-[#cdd6f4] group-hover:shadow-[0_0_15px_rgba(205,214,244,0.25)]'
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/jesuspromero/',
    icon: 'social-linkedin',
    handle: '2.2K seguidores',
    colorHoverClass: 'hover:border-[#74c7ec] hover:text-[#74c7ec] hover:shadow-[0_0_15px_rgba(116,199,236,0.3)]',
    colorGroupClass: 'group-hover:text-[#74c7ec] group-hover:border-[#74c7ec] group-hover:shadow-[0_0_15px_rgba(116,199,236,0.3)]'
  },
  {
    label: 'Medium',
    href: 'https://medium.com/@pwnvader',
    icon: 'social-medium',
    handle: '@pwnvader',
    colorHoverClass: 'hover:border-[#bac2de] hover:text-[#bac2de] hover:shadow-[0_0_15px_rgba(186,194,222,0.25)]',
    colorGroupClass: 'group-hover:text-[#bac2de] group-hover:border-[#bac2de] group-hover:shadow-[0_0_15px_rgba(186,194,222,0.25)]'
  },
  {
    label: 'TryHackMe',
    href: 'https://tryhackme.com/p/pwnVader',
    icon: 'social-thm',
    handle: 'Top 1%',
    colorHoverClass: 'hover:border-[#f9e2af] hover:text-[#f9e2af] hover:shadow-[0_0_15px_rgba(249,226,175,0.3)]',
    colorGroupClass: 'group-hover:text-[#f9e2af] group-hover:border-[#f9e2af] group-hover:shadow-[0_0_15px_rgba(249,226,175,0.3)]'
  },
  {
    label: 'HackTheBox',
    href: 'https://app.hackthebox.com/users/1247070',
    icon: 'lucide:box',
    handle: 'pwnVader',
    colorHoverClass: 'hover:border-[#a6e3a1] hover:text-[#a6e3a1] hover:shadow-[0_0_15px_rgba(166,227,161,0.3)]',
    colorGroupClass: 'group-hover:text-[#a6e3a1] group-hover:border-[#a6e3a1] group-hover:shadow-[0_0_15px_rgba(166,227,161,0.3)]'
  },
  {
    label: 'Email',
    href: '#',
    icon: 'social-proton',
    handle: '[email protected]',
    protectedEmail: { user: 'contacto', domain: 'pwnvader.com' },
    colorHoverClass: 'hover:border-[#b4befe] hover:text-[#b4befe] hover:shadow-[0_0_15px_rgba(180,190,254,0.3)]',
    colorGroupClass: 'group-hover:text-[#b4befe] group-hover:border-[#b4befe] group-hover:shadow-[0_0_15px_rgba(180,190,254,0.3)]'
  },
  {
    label: 'TikTok',
    href: 'https://www.tiktok.com/@pwnvader',
    icon: 'social-tiktok',
    handle: '@pwnvader',
    colorHoverClass: 'hover:border-[#94e2d5] hover:text-[#94e2d5] hover:shadow-[0_0_15px_rgba(148,226,213,0.3)]',
    colorGroupClass: 'group-hover:text-[#94e2d5] group-hover:border-[#94e2d5] group-hover:shadow-[0_0_15px_rgba(148,226,213,0.3)]'
  },
];
