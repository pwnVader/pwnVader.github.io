import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const writeupsCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/writeups" }),
  schema: z.object({
    title: z.string(),
    date: z.string(),
    platform: z.string(),
    os: z.string(),
    difficulty: z.string(),
    draft: z.boolean().optional().default(false),
  })
});

export const collections = {
  'writeups': writeupsCollection,
};
