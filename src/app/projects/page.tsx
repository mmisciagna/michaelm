import { Metadata } from 'next';
import { head } from '@/globals/metadata';

export const metadata: Metadata = {
  title: `Projects - ${head.title}`,
  alternates: {
    canonical: '/projects',
  },
};

export default function ProjectsOverviewPage() {
  return (
    <>
      <section className="mx-auto my-80 max-w-900">
        <h1 className="font-display text-h1 leading-snug">
          Showcasing my projects
        </h1>
      </section>
      <section className="main-spacing-x negate-main-spacing-x my-80 bg-slate-800 py-80 text-beige dark:bg-slate-900">
        <div className="mx-auto w-full max-w-900">
          <p className="m-0">
            As a frontend engineer and designer with a passion for creating
            exceptional user experiences, I am constantly seeking new challenges
            and opportunities to refine my skills. On this page, you will find a
            selection of projects that showcase my expertise in a variety of
            programming languages, frameworks, and tools. Each project
            represents a unique challenge that required creative thinking and
            technical prowess.
          </p>
        </div>
      </section>
    </>
  );
}
