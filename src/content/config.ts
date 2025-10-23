import { defineCollection, z } from "astro:content";

const ImageObj = z.object({
  src: z.string(),
  alt: z.string().default(""),
  width: z.number().optional(),
  height: z.number().optional(),
});

const FaqItem = z.object({ q: z.string(), a: z.string() });

const blog = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string().max(155),
    slug: z.string().optional(),
    // Accept string or date for resilience to YAML parsing
    datePublished: z.union([z.string(), z.date()]).optional(),
    dateModified: z.union([z.string(), z.date()]).optional(),
    author: z.string().optional().default(""),
    tags: z.array(z.string()).optional().default([]),
    category: z.string().optional().default("General"),
    image: z.union([z.string(), ImageObj]).optional(),
    draft: z.boolean().optional().default(false),
    canonical: z.string().url().optional(),
    faq: z.array(FaqItem).optional(),
    // Back-compat with existing content that may use pubDate
    pubDate: z.union([z.string(), z.date()]).optional(),
  }),
});

// Optional authors collection to remove auto-generate warning if folder exists
const authors = defineCollection({
  type: "content",
  schema: z.object({
    name: z.string(),
    role: z.string().optional(),
    bio: z.string().optional(),
    avatar: z.union([z.string(), ImageObj]).optional(),
    url: z.string().url().optional(),
    twitter: z.string().optional(),
    linkedin: z.string().optional(),
  }),
});

export const collections = { blog, authors };
