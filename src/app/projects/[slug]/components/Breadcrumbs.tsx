import Link from 'next/link';
import { Showcases } from '@/content/showcases';

export default function BreadCrumbs({
  title,
  index,
}: {
  title: string;
  index: number;
}) {
  return (
    <div className="eyebrow mb-48 flex items-center justify-between gap-24">
      <ul className="m-0 inline-flex max-w-[75%] list-none items-center gap-12 p-0">
        <li className="mm-showcase__breadcrumbs-item">
          <Link
            className="leading-snug text-bronze-300 transition-colors duration-200 ease-in-out hover:text-beige"
            href="/projects"
          >
            Projects
          </Link>
        </li>
        <li className="relative mb-0 mt-0 overflow-hidden pl-12 after:absolute after:left-0 after:top-1/2 after:block after:h-[80%] after:w-1 after:-translate-y-1/2 after:bg-beige first:ml-0 first:flex-shrink-0 first:pl-0">
          <h1 className="leading-snug">{title}</h1>
        </li>
      </ul>
      <div className="leading-snug">
        {index} / {Showcases.length}
      </div>
    </div>
  );
}
