import { defineCollection, z } from "astro:content";

const ImageObj = z.object({
  src: z.string(), alt: z.string().default(""),
  width: z.number().optional(), height: z.number().optional(),
});

const blog = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string().max(160),
    slug: z.string().optional(),
    date: z.union([z.string(), z.date()]).optional(),
    datePublished: z.union([z.string(), z.date()]).optional(),
    dateModified: z.union([z.string(), z.date()]).optional(),
    publishDate: z.union([z.string(), z.date()]).optional(),
    updatedDate: z.union([z.string(), z.date()]).optional(),
    author: z.string().optional().default(""),
    tags: z.array(z.string()).optional().default([]),
    category: z.string().optional().default("General"),
    image: z.union([z.string(), ImageObj]).optional(),
    imageAlt: z.string().optional(),
    draft: z.boolean().optional().default(false),
    canonical: z.string().url().optional(),
    faq: z.array(z.object({ q: z.string(), a: z.string() })).optional(),
    faqs: z.array(z.object({ question: z.string(), answer: z.string() })).optional(),
    serviceAreas: z.array(z.string()).optional().default([]),
    pubDate: z.union([z.string(), z.date()]).optional(),
  }),
});

const authors = defineCollection({
  type: "content",
  schema: z.object({
    name: z.string(), role: z.string().optional(), bio: z.string().optional(),
    avatar: z.union([z.string(), ImageObj]).optional(),
    url: z.string().url().optional(),
    twitter: z.string().optional(), linkedin: z.string().optional(),
  }),
});

export const collections = { blog, authors };
