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
      href: '/contact', // Update to your booking/contact link if you have one
    },
  ],
};

// ---- Footer Data (Sample) ----
export const footerData = {
  links: [
    {
      title: 'Company',
      links: [
        { text: 'About', href: getPermalink('/about') },
        { text: 'Contact', href: getPermalink('/contact') },
        { text: 'Blog', href: getBlogPermalink() },
      ],
    },
    {
      title: 'Services',
      links: [
        { text: 'Google Business Profile', href: getPermalink('/services/google-business-profile-optimization') },
        { text: 'Local SEO', href: getPermalink('/services/local-seo') },
        { text: 'Web Design & Development', href: getPermalink('/services/web-design') },
        { text: 'Packages', href: getPermalink('/packages') },
      ],
    },
    {
      title: 'Legal',
      links: [
        { text: 'Privacy Policy', href: getPermalink('/privacy') },
        { text: 'Terms of Service', href: getPermalink('/terms') },
      ],
    },
  ],
  secondaryLinks: [
    { text: 'Sitemap', href: getPermalink('/sitemap') },
  ],
  socialLinks: [
    // Add your real social links here
    { ariaLabel: 'Twitter', icon: 'tabler:brand-twitter', href: 'https://twitter.com/' },
    { ariaLabel: 'LinkedIn', icon: 'tabler:brand-linkedin', href: 'https://linkedin.com/' },
  ],
  footNote: `
    &copy; ${new Date().getFullYear()} Lilos Growth. All rights reserved.
  `,
};
