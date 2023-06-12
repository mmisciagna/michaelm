import Header from '@/components/Header';
import { head } from '@/globals/metadata';
import '@/globals/globals.scss';

export const metadata = head;

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className="h-full text-lg leading-relaxed antialiased [font-variant-ligatures:normal] sm:text-xl"
    >
      <body className="m-0 flex min-h-full w-full flex-col bg-off-white text-slate-blue dark:bg-slate-blue dark:text-off-white">
        <Header />
        <main className="main-spacing-x flex-1">{children}</main>
      </body>
    </html>
  );
}
