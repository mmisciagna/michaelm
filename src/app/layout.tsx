import Header from '@/components/Header';
import { head } from '@/global/metadata';
import '@/global/globals.scss';

export const metadata = head;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className="h-full text-lg leading-relaxed text-slate-blue antialiased [font-variant-ligatures:normal] sm:text-xl"
    >
      <body className="m-0 flex min-h-full w-full flex-col bg-off-white">
        <Header />
        <main className="main-spacing-x flex-1">{children}</main>
      </body>
    </html>
  );
}
