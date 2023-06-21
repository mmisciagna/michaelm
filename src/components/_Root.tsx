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
import { useEffect, useState } from 'react';

export default function Root({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const [defaultTheme] = useState(
    getLocalStorage(StorageKey.THEME) || getUserPreferredTheme() || 'light'
  );

  useEffect(() => {
    if (getLocalStorage(StorageKey.THEME) === null) {
      setLocalStorage(StorageKey.THEME, defaultTheme);
    }

    setTheme(defaultTheme);
  }, []);

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
