'use client';

import { usePathname } from 'next/navigation';
import { StorageKey } from '@/globals/constants';
import {
  getLocalStorage,
  getUserPreferredTheme,
  setLocalStorage,
  setTheme,
} from '@/globals/utils';
import Header from '@/components/Header';
import { useEffect } from 'react';
import Footer from '@/components/Footer';

export default function Root({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const defaultTheme =
    getLocalStorage(StorageKey.THEME) || getUserPreferredTheme() || 'light';

  if (getLocalStorage(StorageKey.THEME) === null) {
    setLocalStorage(StorageKey.THEME, defaultTheme);
  }

  useEffect(() => {
    setTheme(defaultTheme);
  }, []);

  return (
    <html
      lang="en"
      className="h-full scroll-py-[calc(var(--header-height)*2)] scroll-smooth font-body text-md leading-relaxed antialiased [font-variant-ligatures:normal] sm:text-lg md:text-xl"
    >
      <body className="m-0 flex min-h-full w-full flex-col bg-beige text-slate-800 transition-colors duration-300 ease-in-out dark:bg-slate-800 dark:text-beige">
        {pathname !== '/' && <Header />}
        <main
          className="main-spacing-x flex-1"
          id="top"
        >
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
