import { Metadata } from 'next';
import { GlobalString } from '@/globals/constants';

const metaTitle = GlobalString.PRONUNCIATION;
const metaUrl = 'https://michaelm.site';
const metaDescription =
  'As a highly skilled Senior Frontend Engineer, I bring over 12 years of experience and a proven track record of bridging the gap between engineering and design teams.';
const metaImg = '/static/imgs/share_image.jpg';

export const head: Metadata = {
  title: metaTitle,
  description: metaDescription,
  icons: [
    { rel: 'icon', url: '/static/imgs/favicon-48x48.png' },
    { rel: 'icon', url: '/static/imgs/favicon-72x72.png' },
    { rel: 'icon', url: '/static/imgs/favicon-96x96.png' },
    { rel: 'icon', url: '/static/imgs/favicon-144x144.png' },
  ],
  openGraph: {
    type: 'website',
    url: metaUrl,
    title: metaTitle,
    description: metaDescription,
    siteName: metaTitle,
    images: [{ url: metaImg }],
  },
  twitter: {
    card: 'summary_large_image',
    title: metaTitle,
    description: metaDescription,
    images: [{ url: metaImg }],
  },
};
