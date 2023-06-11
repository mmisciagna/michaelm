import { Raleway, Source_Sans_Pro } from 'next/font/google';

export const displayTypeface = Raleway({
  weight: ['500', '700'],
  subsets: ['latin'],
});

export const bodyTypeface = Source_Sans_Pro({
  weight: ['400', '700'],
  subsets: ['latin'],
});
