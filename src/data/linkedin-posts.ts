export interface LinkedInPost {
  title: string;
  excerpt: string;
  url: string;
  reactions?: number;
  date: string;
  topic: string;
}

export const linkedInMetrics = {
  followers: '30K+',
  topicsCount: 4,
  mainTopics: ['Ciberseguridad', 'Red Team', 'Carrera en Tech', 'IA & Hacking'],
};

/**
 * Featured LinkedIn posts.
 * Replace these with actual post URLs and data.
 */
export const linkedInPosts: LinkedInPost[] = [
  {
    title: 'Mi camino hacia el eJPTv2',
    excerpt:
      'Comparto mi experiencia preparándome para la certificación eJPTv2, los recursos que usé y consejos para quienes están empezando en pentesting.',
    url: 'https://linkedin.com/in/perezromerojesus',
    reactions: undefined,
    date: '2025-11-01',
    topic: 'Certificaciones',
  },
  {
    title: 'IA aplicada a la Ciberseguridad (MCP)',
    excerpt:
      'Ponencia en NetSentinel Academy sobre cómo los modelos de lenguaje y el Model Context Protocol están transformando el pentesting y la automatización de seguridad.',
    url: 'https://linkedin.com/in/perezromerojesus',
    reactions: undefined,
    date: '2025-09-15',
    topic: 'Speaker',
  },
  {
    title: 'Mentoría en NicaSecurity',
    excerpt:
      'Por qué decidí ser mentor en NicaSecurity y cómo la comunidad hispana de ciberseguridad está creciendo.',
    url: 'https://linkedin.com/in/perezromerojesus',
    reactions: undefined,
    date: '2025-07-20',
    topic: 'Comunidad',
  },
];
