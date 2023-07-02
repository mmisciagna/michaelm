import Link from 'next/link';
import classNames from 'classnames';
import { twMerge } from 'tailwind-merge';

export default function Pagination({
  tidbits,
  index,
  container,
}: {
  tidbits: TidbitGroup;
  index: number;
  container: HTMLElement;
}) {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
      <Link
        className="button order-2 mt-[1em] !hidden min-w-[120px] md:order-none md:m-0 md:!inline-block"
        href={`/tidbits/${index}`}
        //@ts-ignore
        disabled={index === 0}
        tabIndex={index === 0 ? -1 : 0}
      >
        Previous
      </Link>
      <p className="my-[1em] flex flex-wrap items-center gap-4 md:mx-4">
        {tidbits.map((tidbitGroup: Tidbit[], i: number) => {
          const isActive = index === i;

          const activeClasses = classNames({
            'border-b border-solid border-bronze-300/25': isActive,
            'text-bronze-300/25': isActive,
            'pointer-events-none': isActive,
          });

          return (
            <Link
              key={tidbitGroup[0].data.title}
              className={twMerge(
                `flex h-40 w-40 items-center justify-center border-b border-dotted border-bronze-300 text-bronze-300 transition-colors duration-200 ease-in-out hover:border-solid ${activeClasses}`
              )}
              href={`/tidbits/${i + 1}`}
            >
              {i + 1}
            </Link>
          );
        })}
      </p>
      <Link
        className="button order-2 mt-[1em] !hidden min-w-[120px] md:order-none md:m-0 md:!inline-block"
        href={`/tidbits/${index + 2}`}
        //@ts-ignore
        disabled={index + 1 === tidbits.length}
        tabIndex={index + 1 === tidbits.length ? -1 : 0}
      >
        Next
      </Link>
    </div>
  );
}
