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
    'bg-off-white dark:bg-slate-blue': isInHeader,
    'h-[var(--header-height)] sm:h-full': isInHeader,
    'px-4 sm:p-0': isInHeader,
    'relative': isInHeader,
    'w-full xs:w-auto': isInHeader,
  });

  return (
    <nav className={cn}>
      {items.map((item) => {
        const isActive = pathname === item.href;

        cn = classNames({
          // active text color
          'text-slate-blue dark:text-white': isActive,
          'text-white': isActive && !isInHeader,
          // ::after
          'after:[width:25%]': isActive,
          'after:bg-slate-blue dark:after:bg-white': isInHeader,
          'after:bg-white': !isInHeader,
          // :hover
          'hover:text-slate-blue': isInHeader,
          'hover:text-white ': !isInHeader,
          // :first-child and :last-child
          'first:ml-24 sm:first:ml-48 lg:first:ml-80': isInHeader,
          'last:mr-24 sm:last:mr-48 lg:last:mr-80': isInHeader,
        });

        return (
          <Link
            key={item.label}
            className={twMerge(
              `relative inline-block font-display text-xs font-bold uppercase leading-loose tracking-1 text-bronze transition duration-200 ease-in-out after:absolute after:left-0 after:top-0 after:w-0 after:duration-200 after:ease-in-out after:[height:2px] after:[transition-property:width] hover:after:[width:25%] dark:text-bronze dark:hover:text-white sm:text-sm ${cn}`
            )}
            href={item.href}>
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
