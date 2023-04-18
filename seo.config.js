//SEO 관련 metaTag
export default {
  titleTemplate: '%s - Next.js를 이용한 프로젝트', //%s : title에 있는 문구가 들어온다.
  openGraph: {
    type: 'website',
    site_name: 'Next.js 프로젝트',
    images: [
      { url: 'https://nextjs.org/static/blog/next-13/twitter-card.png' },
    ],
  },
  additionalLinkTags: [
    {
      rel: 'shortcut icon',
      href: '/favicon.ico',
    },
  ],
};
