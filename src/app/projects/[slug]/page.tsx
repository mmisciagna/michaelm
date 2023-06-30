import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { marked } from 'marked';
import { head } from '@/globals/metadata';
import { getCurrentShowcase } from '@/globals/utils';
import { Showcases } from '@/content/showcases';
import BreadCrumbs from './components/Breadcrumbs';
import Pagination from './components/Pagination';
import Video from './components/Video';
import Details from './components/Details';

interface Params {
  params: { slug: string };
}

export default function ProjectPage({ params }: Params) {
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
      <section className="negate-main-spacing-x bg-slate-800 px-24 pb-80 pt-24 text-beige dark:bg-slate-900">
        <div className="mx-auto w-full max-w-900">
          <BreadCrumbs
            title={title}
            index={index + 1}
          />
          <Pagination index={index} />
        </div>
      </section>
      {/* Video */}
      {data.videoId && (
        <section className="negate-main-spacing-x bg-slate-800 pb-80 text-beige dark:bg-slate-900">
          <div className="mx-auto w-full max-w-1200">
            <Video showcase={showcase} />
          </div>
        </section>
      )}
      <section className="negate-main-spacing-x bg-slate-800 pb-80 text-beige dark:bg-slate-900">
        <div className="main-spacing-x mx-auto w-full max-w-1200">
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
      {/* Markdown content */}
      <section className="negate-main-spacing-x overflow-hidden bg-slate-800 px-24 pb-80 text-beige dark:bg-slate-900">
        <div className="mx-auto w-full max-w-900">
          {data.siteLink && (
            <div className="mb-48">
              <a
                href={data.siteLink}
                target="_blank"
                rel="noopener noreferrer"
                className="button"
              >
                Launch site
              </a>
            </div>
          )}
          <div className="markdown">
            <div
              dangerouslySetInnerHTML={{
                __html: marked(content, { mangle: false, headerIds: false }),
              }}
            />
          </div>
        </div>
      </section>
    </>
  );
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const showcase = getCurrentShowcase(params.slug);

  return {
    title: `${showcase?.data.title} - Projects - ${head.title}`,
  };
}
