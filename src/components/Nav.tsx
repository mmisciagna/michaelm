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
    href: '/projects/',
  },
  {
    label: 'Tidbits',
    href: '/tidbits/',
  },
  {
    label: 'Contact',
    href: '/contact/',
  },
];

export default function Nav({ isInHeader = false }: { isInHeader: boolean }) {
  const pathname = usePathname();

  let cn = classNames({
    'flex gap-16 lg:gap-24': true,
    'items-center xs:items-end': isInHeader,
    'bg-off-white dark:bg-slate-800': isInHeader,
    'h-[var(--header-height)] sm:h-full': isInHeader,
    'px-4 sm:p-0': isInHeader,
    'relative': isInHeader,
    'w-full xs:w-auto': isInHeader,
  });

  return (
    <nav className={cn}>
      {items.map((item) => {
        let isActive = false;

        if (pathname === '/') {
          isActive = item.href === '/';
        } else {
          isActive = pathname.startsWith(item.href) && item.href !== '/';
        }

        cn = classNames({
          // active text color
          'text-slate-800 dark:text-white': isActive,
          'text-white': isActive && !isInHeader,
          // ::after
          'after:[width:25%]': isActive,
          'after:bg-slate-800 dark:after:bg-white': isInHeader,
          'after:bg-white': !isInHeader,
          // :hover
          'hover:text-slate-800': isInHeader,
          'hover:text-white ': !isInHeader,
          // :first-child and :last-child
          'first:ml-24 sm:first:ml-48 lg:first:ml-80': isInHeader,
          'last:mr-24 sm:last:mr-48 lg:last:mr-80': isInHeader,
        });

        return (
          <Link
            key={item.label}
            className={twMerge(
              `eyebrow text-bronze-300 dark:text-bronze-300 relative inline-block transition duration-200 ease-in-out after:absolute after:left-0 after:top-0 after:w-0 after:duration-200 after:ease-in-out after:[height:2px] after:[transition-property:width] hover:after:[width:25%] dark:hover:text-white ${cn}`
            )}
            href={item.href}>
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
