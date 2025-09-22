import { defineCollection, z } from 'astro:content';

export const collections = {
  blog: defineCollection({
    type: 'content',
    schema: ({ image }) =>
      z.object({
        title: z.string(),
        description: z.string(),
        date: z.string().datetime(), // accept ISO string
        updated: z.string().datetime().optional(), // accept ISO string
        author: z.string(),
        tags: z.array(z.string()).default([]),
        hero: z.union([image(), z.string()]).optional(),
        excerpt: z.string(),
        schemaOverrides: z.record(z.any()).optional(),
      }),
  }),
};
