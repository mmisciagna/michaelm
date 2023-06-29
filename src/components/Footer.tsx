import { Colors, GCP_STORAGE_BUCKET } from '@/globals/constants';
import Nav from '@/components/Nav';
import { Icons } from '@/components/Icons';

export default function Footer() {
  return (
    <footer className="flex flex-col items-center justify-between gap-12 bg-slate-800 p-24 text-bronze-300 dark:bg-slate-900 xs:h-[var(--footer-height)] xs:flex-row sm:px-48 lg:px-80">
      <Nav isInHeader={false} />

      <div className="eyebrow flex items-center justify-center gap-8 sm:justify-end lg:gap-16">
        <a
          href="#top"
          className="transition-colors duration-300 ease-in-out hover:text-white">
          Back to top
        </a>
        •
        <a
          className="transition-colors duration-300 ease-in-out hover:text-white"
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
            className="h-20 w-20 transition-colors duration-300 ease-in-out group-hover:fill-white sm:h-24 sm:w-24"
            color={Colors.bronze['300']}
          />
        </a>
      </div>
    </footer>
  );
}
