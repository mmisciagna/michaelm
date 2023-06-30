import Link from 'next/link';
import slugify from 'react-slugify';
import classNames from 'classnames';
import { Showcases } from '@/content/showcases';
import { Icons } from '@/components/Icons';
import { Colors } from '@/globals/constants';

export default function Pagination({ index }: { index: number }) {
  const prevBtnClasses = classNames({
    'button mx-12 min-w-[120px]': true,
    'disabled': index === 0,
  });

  const nextBtnClasses = classNames({
    'button mx-12 min-w-[120px]': true,
    'disabled': index + 1 === Showcases.length,
  });

  return (
    <div className="-mx-12 flex items-center justify-between">
      <Link
        className={prevBtnClasses}
        href={`/projects/${slugify(Showcases[index - 1]?.data.title)}`}
        tabIndex={index === 0 ? -1 : 0}
      >
        Previous
      </Link>
      <a
        className="group/all-icon mx-12 inline-block leading-none"
        aria-label="Go to projects grid"
        href="#all-projects"
      >
        <Icons
          name="grid-dots"
          color={Colors.bronze['300']}
          className="w-40 transition-colors duration-200 ease-in-out group-hover/all-icon:fill-beige"
        />
      </a>
      <Link
        className={nextBtnClasses}
        href={`/projects/${slugify(Showcases[index + 1]?.data.title)}`}
        tabIndex={index + 1 === Showcases.length ? -1 : 0}
      >
        Next
      </Link>
    </div>
  );
}
