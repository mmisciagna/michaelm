import { Colors, GCP_STORAGE_BUCKET } from '@/globals/constants';
import Nav from '@/components/Nav';
import { Icons } from '@/components/Icons';

export default function Footer() {
  return (
    <footer className="main-spacing-x bg-beige border-t border-solid border-bronze-300/25 text-bronze-300 dark:bg-slate-800 xs:h-[var(--footer-height)]">
      <div className="flex w-full flex-col items-center justify-between gap-12 py-24 xs:flex-row">
        <Nav isInHeader={false} />

        <div className="eyebrow flex items-center justify-center gap-8 sm:justify-end lg:gap-16">
          <a
            href="#top"
            className="transition-colors duration-300 ease-in-out hover:text-slate-800">
            Back to top
          </a>
          •
          <a
            className="transition-colors duration-300 ease-in-out hover:text-slate-800"
            href={`${GCP_STORAGE_BUCKET}/michael-misciagna-resume.pdf`}
            target="_blank"
            aria-label="CV"
            download>
            CV
          </a>
          •
          <a
            className="group"
            href="https://www.linkedin.com/in/michaelmisciagna/"
            target="_blank"
            aria-label="LinkedIn">
            <Icons
              name="linkedIn"
              className="h-20 w-20 transition-colors duration-300 ease-in-out group-hover:fill-slate-800 sm:h-24 sm:w-24"
              color={Colors.bronze['300']}
            />
          </a>
        </div>
      </div>
    </footer>
  );
}
