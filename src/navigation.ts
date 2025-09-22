import { getPermalink } from './utils/permalinks';

export const headerData = {
  links: [
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
      text: 'Additional Services',
      href: getPermalink('/additional-services'),
    },

    /* Content & tools hub (compact) */
    {
      text: 'Resources',
      links: [
        {
          text: 'Blog',
          href: getPermalink('/blog'),
          description: 'Local SEO, GBP, and web design insights',
        },
        {
          text: 'Local SEO Tools',
          href: getPermalink('/local-seo-tools'),
          description: 'Free utilities to speed up local SEO work',
        },
        {
          text: 'Client Results',
          href: getPermalink('/results'),
          description: 'Case studies and Map Pack wins',
        },
        {
          text: 'RSS',
          href: '/rss.xml',
          description: 'Subscribe to new posts',
        },
      ],
    },

    {
      text: 'About',
      href: getPermalink('/about'),
    },
    {
      text: 'Contact',
      href: getPermalink('/contact'),
    },
  ],
  actions: [
    {
      text: 'Book a Call',
      href: getPermalink('/contact#book'), // go directly to the scheduler section
    },
  ],
} as const;
