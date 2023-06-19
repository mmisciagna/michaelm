import { head } from '@/globals/metadata';
import '@/globals/globals.scss';
import Root from './layouts/root';

export const metadata = head;

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Root>{children}</Root>;
}
