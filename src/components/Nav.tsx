'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { twMerge } from 'tailwind-merge';
import classNames from 'classnames';

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

export default function Nav({ isInHeader = false }: { isInHeader: boolean }) {
  const pathName = usePathname();

  let cn = classNames({
    'flex': true,
    'items-center xs:items-end': isInHeader,
    'bg-off-white': isInHeader,
    'h-48 sm:h-full': isInHeader,
    'px-4 sm:p-0': isInHeader,
    'relative': isInHeader,
    'w-full xs:w-auto': isInHeader,
  });

  return (
    <nav className={cn}>
      {items.map((item) => {
        const isActive = pathName === item.href;

        cn = classNames({
          'text-slate-blue': isActive,
          'after:[width:25%]': isActive,
          'first:ml-24 sm:first:ml-48 lg:first:ml-80': isInHeader,
          'last:mr-24 sm:last:mr-48 lg:last:mr-80': isInHeader,
          'lg:mx-12': isInHeader,
        });

        return (
          <Link
            key={item.label}
            className={twMerge(
              `relative mx-8 inline-block font-display text-xs font-bold uppercase leading-loose tracking-wider text-bronze transition duration-200 ease-in-out after:absolute after:left-0 after:top-0 after:w-0 after:bg-slate-blue after:duration-200 after:ease-in-out after:content-[''] after:[height:2px] after:[transition-property:width] hover:text-slate-blue hover:after:[width:25%] sm:text-sm ${cn}`
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
