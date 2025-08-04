import { getPermalink, getBlogPermalink, getAsset } from './utils/permalinks';

export const headerData = {
  links: [
    {
      text: 'Home',
      href: getPermalink('/'),
    },
    {
      text: 'Services',
      links: [
        {
          text: 'All Services',
          href: getPermalink('/services'),
        },
        {
          text: 'Google Business Profile Optimization',
          href: getPermalink('/services/google-business-profile-optimization'),
        },
        {
          text: 'Local SEO',
          href: getPermalink('/services/local-seo'),
        },
        {
          text: 'Website Design & Development',
          href: getPermalink('/services/web-design'),
        },
      ],
    },
    {
      text: 'Packages',
      href: getPermalink('/packages'),
    },
    {
      text: 'About',
      href: getPermalink('/about'),
    },
    {
      text: 'Contact',
      href: getPermalink('/contact'),
    },
    {
      text: 'Blog',
      href: getBlogPermalink(),
    },
  ],
  actions: [
    {
      text: 'Book a Call',
      href: '/contact', // Update to your booking/contact link if you have one
    },
  ],
};

// The rest of your file (footerData etc) remains unchanged. Paste just the headerData code if that's all you need.
