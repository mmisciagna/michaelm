export default function Tooltip({
  trigger,
  content,
}: {
  trigger: React.ReactNode | string;
  content: React.ReactNode | string;
}) {
  return (
    <span className="group relative z-50 my-1 inline cursor-help border-b-2 border-dotted border-slate-blue hover:border-bronze dark:border-off-white dark:hover:border-bronze">
      {trigger}
      <span className="pointer-events-none absolute bottom-[calc(100%+16px)] right-0 inline-block max-w-200 whitespace-normal rounded-lg bg-slate-blue px-24 py-12 text-sm italic leading-relaxed text-off-white opacity-0 transition-opacity duration-200 ease-in-out after:absolute after:left-8 after:top-full after:border-6 after:border-solid after:border-slate-blue after:border-b-transparent after:border-r-transparent group-hover:pointer-events-auto group-hover:-z-50 group-hover:opacity-100 dark:bg-slate-blue-dk after:dark:border-slate-blue-dk after:dark:border-b-transparent after:dark:border-r-transparent">
        {content}
      </span>
    </span>
  );
}
