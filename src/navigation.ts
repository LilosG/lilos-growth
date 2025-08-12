// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { getPermalink, getBlogPermalink, getAsset } from './utils/permalinks';

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
    {
      text: 'Local SEO Tools',
      href: getPermalink('/local-seo-tools'),
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
      href: '/contact', // Update this to your booking/contact link if you have one
    },
  ],
};
