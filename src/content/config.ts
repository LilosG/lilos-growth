import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: ({ image }) =>
    z.object({
      // existing fields
      title: z.string(),
      description: z.string(),
      date: z.string().datetime(), // accept ISO string
      updated: z.string().datetime().optional(),
      author: z.string(),
      tags: z.array(z.string()).default([]),
      hero: z.union([image(), z.string()]).optional(),
      excerpt: z.string(),
      schemaOverrides: z.record(z.any()).optional(),

      // ✅ optional fields referenced by your pages/routes
      draft: z.boolean().optional().default(false),
      cover: z.string().optional(),
      alt: z.string().optional(),
      category: z.string().optional(),
      categories: z.array(z.string()).optional(),
    }),
});

/**
 * Types-only alias for legacy utilities that still use "post".
 * Shares the same schema as "blog"; if no files exist under src/content/post,
 * getCollection('post') will just return an empty array at runtime.
 */
const post = defineCollection({
  type: 'content',
  // reuse the exact same schema as blog
  schema: blog.schema,
});

export const collections = {
  blog,
  post,
};
