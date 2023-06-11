'use client';

import Link, { LinkProps } from 'next/link';
import { usePathname } from 'next/navigation';
import { twMerge } from 'tailwind-merge';

const items = [
  {
    label: 'About',
    href: '/',
  },
  {
    label: 'Projects',
    href: '/projects',
  },
  {
    label: 'Tidbits',
    href: '/tidbits',
  },
  {
    label: 'Contact',
    href: '/contact',
  },
];

export default function Nav() {
  const pathName = usePathname();

  return (
    <nav className="mm-nav">
      {items.map((item) => {
        const isActive = pathName === item.href;

        return (
          <Link
            key={item.label}
            className={twMerge(
              `relative mx-8 inline-block font-display text-xs font-bold uppercase tracking-wider text-bronze transition duration-200 ease-in-out after:absolute after:left-0 after:top-0 after:w-0 after:bg-slate-blue after:duration-200 after:ease-in-out after:content-[''] after:[height:2px] after:[transition-property:width] hover:text-slate-blue hover:after:[width:25%] sm:text-sm ${
                isActive && 'text-slate-blue after:[width:25%]'
              }`
            )}
            href={item.href}
          >
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
