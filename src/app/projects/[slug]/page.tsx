import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { marked } from 'marked';
import { head } from '@/globals/metadata';
import { getCurrentShowcase } from '@/globals/utils';
import { Showcases } from '@/content/showcases';
import slugify from 'react-slugify';
import classNames from 'classnames';
import { Icons } from '@/components/Icons';
import { Colors } from '@/globals/constants';

interface Params {
  params: { slug: string };
}

export default function Project({ params }: Params) {
  const showcase = getCurrentShowcase(params.slug);

  if (showcase == null) {
    redirect('/404');
  }

  const { data, content } = showcase;
  const { title } = data;

  const index = Showcases.indexOf(showcase);

  const roleList =
    data.role && typeof data.role === 'string' ? [data.role] : data.role;

  return (
    <>
      <section className="negate-main-spacing-x bg-slate-blue px-24 pb-48 pt-24 text-off-white dark:bg-slate-blue-dk">
        <div className="mx-auto w-full max-w-900">
          <BreadCrumbs
            title={title}
            index={index + 1}
          />
          <Pagination index={index} />
        </div>
        <div className="mt-48">
          {data.client && (
            <Details
              title="Client"
              list={[data.client]}
            />
          )}
          {data.role && (
            <Details
              title="Role"
              list={roleList as string[]}
            />
          )}
          {data.stack && (
            <Details
              title="Stack"
              list={data.stack}
            />
          )}
          {data.apis && (
            <Details
              title="APIs"
              list={data.apis}
            />
          )}
        </div>
      </section>
      {/* {data.videoId && (
        <Video
          showcase={showcase}
          ready={ytReady}
        />
      )} */}
      {/* Markdown content */}
      <section className="negate-main-spacing-x overflow-hidden bg-slate-blue px-24 py-80 text-off-white dark:bg-slate-blue-dk">
        <div className="mx-auto w-full max-w-900">
          {data.siteLink && (
            <div className="my-48">
              <a
                href={data.siteLink}
                target="_blank"
                rel="noopener noreferrer"
                className="button">
                Launch site
              </a>
            </div>
          )}
          <div className="markdown my-24">
            <div dangerouslySetInnerHTML={{ __html: marked(content) }} />
          </div>
        </div>
      </section>
    </>
  );
}

function BreadCrumbs({ title, index }: { title: string; index: number }) {
  return (
    <div className="eyebrow mb-48 flex items-center justify-between gap-24">
      <ul className="m-0 inline-flex list-none items-center gap-12 p-0">
        <li className="mm-showcase__breadcrumbs-item">
          <Link
            className="leading-snug text-bronze transition-colors duration-200 ease-in-out hover:text-off-white"
            href="/projects">
            Projects
          </Link>
        </li>
        <li className="relative mb-0 mt-0 overflow-hidden pl-12 after:absolute after:left-0 after:top-1/2 after:block after:h-[80%] after:w-1 after:-translate-y-1/2 after:bg-off-white first:ml-0 first:flex-shrink-0 first:pl-0">
          <h1 className="leading-snug">{title}</h1>
        </li>
      </ul>
      <div className="leading-snug">
        {index} / {Showcases.length}
      </div>
    </div>
  );
}

function Pagination({ index }: { index: number }) {
  const prevBtnClasses = classNames({
    'button mx-12 min-w-[120px]': true,
    'disabled': index === 0,
  });

  const nextBtnClasses = classNames({
    'button mx-12 min-w-[120px]': true,
    'disabled': index + 1 === Showcases.length,
  });

  return (
    <div className="-m-12 flex items-center justify-between">
      <Link
        className={prevBtnClasses}
        href={`/projects/${slugify(Showcases[index - 1]?.data.title)}`}
        tabIndex={index === 0 ? -1 : 0}>
        Previous
      </Link>
      <a
        className="group/all-icon mx-12 inline-block leading-none"
        aria-label="Go to projects grid"
        href="#all-projects">
        <Icons
          name="grid-dots"
          color={Colors.bronze}
          className="w-40 transition-colors duration-200 ease-in-out group-hover/all-icon:fill-off-white"
        />
      </a>
      <Link
        className={nextBtnClasses}
        href={`/projects/${slugify(Showcases[index + 1]?.data.title)}`}
        tabIndex={index + 1 === Showcases.length ? -1 : 0}>
        Next
      </Link>
    </div>
  );
}

function Details({ title, list }: { title: string; list: string[] }) {
  return (
    <div className="group/details-row mx-auto -mt-1 flex max-w-900 items-start justify-between border-t border-solid border-bronze-10 first:mt-0">
      <div className="flex">
        <h2 className="eyebrow border-r-0 p-8 pl-0 leading-snug">{title}</h2>
      </div>
      <ul className="m-0 flex list-none flex-col items-end justify-start xs:flex-row xs:items-start">
        {list.map((label: string) => {
          return (
            <li
              key={label}
              className="eyebrow m-0 inline-block border-b border-r border-solid border-bronze-10 p-8 leading-snug first:mt-0 group-last/details-row:border-b xs:border-b-0">
              {label}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const showcase = getCurrentShowcase(params.slug);

  return {
    title: `${showcase?.data.title} - Projects - ${head.title}`,
  };
}
