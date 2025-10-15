export const headerData = {
  links: [
    {
      text: 'Services',
      href: '/services',
      links: [
        { text: 'Local SEO', href: '/services/local-seo' },
        { text: 'Google Business Profile Optimization', href: '/services/google-business-profile-optimization' },
        { text: 'Website Design', href: '/services/web-design' },
        { text: 'Additional Services', href: '/additional-services' },
      ],
    },
    { text: 'Packages', href: '/packages' },
    { text: 'Case Studies', href: '/results' },
    { text: 'Local SEO Tools', href: '/local-seo-tools' },
    { text: 'Blog', href: '/blog' },
    { text: 'About', href: '/about' },
    { text: 'Contact', href: '/contact' },
  ],
  actions: [{ text: 'Book a Call', href: '/contact#book' }],
} as const;
