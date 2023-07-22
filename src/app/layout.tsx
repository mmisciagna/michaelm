import Root from '@/components/_Root';
import '@/globals/globals.scss';
import { head } from '@/globals/metadata';
import { Analytics } from '@vercel/analytics/react';

export const metadata = head;

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Root>
      {children}
      <Analytics />
    </Root>
  );
}
