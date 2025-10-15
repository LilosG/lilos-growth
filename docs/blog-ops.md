Publishing
Create a file in src/content/blog with frontmatter: title, description (<=155), slug, datePublished, author, tags[], category, image, draft, canonical?, faq[].

Drafts
Drafts are excluded from prod lists, post pages, sitemap and RSS unless LOCAL_DRAFTS=1.

Images
Place under public/images/blog and reference with absolute paths like /images/blog/example.jpg.

Tags and Categories
Use one category and any number of tags.

FAQs
Add an array faq with question and answer fields to emit FAQPage JSON-LD.

Preview and Build
LOCAL_DRAFTS=1 npm run dev
npm run build

Canonicals
All blog routes resolve to https://lilosgrowth.com.
