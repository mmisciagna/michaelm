import Link from 'next/link';
import { GlobalString } from '@/global/constants';
import Nav from '@/components/Nav';
// import ThemeToggle from '@/components/ThemeToggle';

export default function Header() {
  // let lastScrollPosition = 0;

  // const handleSlideAway = () => {
  //   const currentScrollPosition = window.pageYOffset;
  //   const headerOffsetTop = headerRef.current!.offsetTop;

  //   // Checks if the element is at the top of the page.
  //   // Do nothing if it's not.
  //   if (currentScrollPosition !== headerOffsetTop) return;

  //   headerRef.current!.classList.toggle(
  //     'mm-header--slide-away',
  //     currentScrollPosition > lastScrollPosition
  //   );
  //   console.log(lastScrollPosition);

  //   lastScrollPosition = currentScrollPosition;
  // };

  // window.addEventListener('scroll', handleSlideAway);

  return (
    <header className="sticky left-0 top-0 z-50 flex flex-col items-center justify-between duration-300 ease-in-out [transition-property:transform] xs:h-48 xs:flex-row">
      <div className="relative flex h-48 w-full flex-1 basis-[48px] items-center justify-start overflow-hidden bg-slate-blue italic text-white before:absolute before:left-24 before:top-1/2 before:translate-y-[-50%] before:bg-white before:content-[''] before:[height:1px] before:[width:calc(100%-24px)] xs:h-full xs:border-b xs:border-off-white xs:px-24 sm:px-48 sm:before:[width:calc(100%-48px)] lg:px-80 lg:before:[width:calc(100%-80px)]">
        <Link
          href={`/`}
          aria-label="Home"
          className="z-10 bg-slate-blue text-sm font-bold italic tracking-wider xs:ml-[-12px]"
        >
          <span className="bg-blue-slate relative z-10 px-24 xs:px-12">
            {GlobalString.PRONUNCIATION}
          </span>
        </Link>
        {/* <ThemeToggle /> */}
      </div>
      <Nav isInHeader={true} />
    </header>
  );
}
