import { describe, expect, it } from "vitest";
import { reviewBlogContent, loadBlogContentReview } from "../scripts/audit-blog-publication.mjs";

const post = (slug, title, body = "", draft = false) => ({
  slug,
  title,
  body,
  draft,
  filename: slug + ".mdx",
});

describe("blog editorial publication integrity", () => {
  it("accepts published articles with distinct titles and valid direct redirects", () => {
    const result = reviewBlogContent({
      posts: [post("survivor", "A useful guide"), post("other", "Other topic")],
      redirects: [["/blog/retired", "/blog/survivor"]],
    });
    expect(result.errors).toEqual([]);
    expect(result.staleInternalLinks).toEqual([]);
  });

  it("detects normalized title collisions and duplicate published slugs", () => {
    const result = reviewBlogContent({
      posts: [post("first", "Local SEO — A Guide"), post("first", "Local SEO: A Guide")],
      redirects: [],
    });
    expect(result.errors.some((error) => error.includes("duplicate published slug"))).toBe(true);
    expect(result.errors.some((error) => error.includes("duplicate published title"))).toBe(true);
  });

  it("detects redirect chains and redirects pointing to absent articles", () => {
    const result = reviewBlogContent({
      posts: [post("survivor", "A useful guide")],
      redirects: [
        ["/blog/old", "/blog/middle"],
        ["/blog/middle", "/blog/missing"],
      ],
    });
    expect(result.errors.some((error) => error.includes("redirect chain"))).toBe(true);
    expect(result.errors.some((error) => error.includes("no published article"))).toBe(true);
  });

  it("flags internal links to retired article URLs without hiding their destination", () => {
    const result = reviewBlogContent({
      posts: [post("survivor", "A useful guide"), post("referrer", "Another post", "Read [the old guide](/blog/old).")],
      redirects: [["/blog/old", "/blog/survivor"]],
    });
    expect(result.errors).toEqual([]);
    expect(result.staleInternalLinks).toEqual([
      { from: "/blog/referrer", to: "/blog/old", destination: "/blog/survivor" },
    ]);
  });

  it("keeps draft title duplication out of public slug collision checks", () => {
    const result = reviewBlogContent({
      posts: [post("published", "An article"), post("draft", "An article", "", true)],
      redirects: [],
    });
    expect(result.errors).toEqual([]);
  });

  it("reports current repository inventory without reader-facing speculation", () => {
    const review = loadBlogContentReview();
    expect(review.published).toBeGreaterThan(0);
    expect(review.redirects).toBeGreaterThan(0);
  });
});
