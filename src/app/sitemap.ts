import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `https://michaelm.site`,
      lastModified: new Date(),
    },
    {
      url: `https://michaelm.site/projects`,
      lastModified: new Date(),
    },
    {
      url: `https://michaelm.site/tidbits`,
      lastModified: new Date(),
    },
    {
      url: `https://michaelm.site/contact`,
      lastModified: new Date(),
    },
  ];
}
