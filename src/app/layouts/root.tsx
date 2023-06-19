'use client';

import Header from '@/app/components/Header';
import { usePathname } from 'next/navigation';

export default function Root({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <html
      lang="en"
      className="h-full text-lg leading-relaxed antialiased [font-variant-ligatures:normal] sm:text-xl">
      <body className="m-0 flex min-h-full w-full flex-col bg-off-white text-slate-blue dark:bg-slate-blue dark:text-off-white">
        {pathname !== '/' && <Header />}
        <main className="main-spacing-x flex-1">{children}</main>
      </body>
    </html>
  );
}
