export default function Details({
  title,
  list,
}: {
  title: string;
  list: string[];
}) {
  return (
    <div className="group/details-row mx-auto -mt-1 flex max-w-900 items-start justify-between border-t border-solid border-bronze-300/25 first:mt-0">
      <div className="flex">
        <h2 className="eyebrow border-r-0 p-8 pl-0 leading-snug">{title}</h2>
      </div>
      <ul className="m-0 flex list-none flex-col items-end justify-start xs:flex-row xs:items-start">
        {list.map((label: string) => {
          return (
            <li
              key={label}
              className="eyebrow m-0 inline-block border-b border-r border-solid border-bronze-300/25 p-8 leading-snug first:mt-0 group-last/details-row:border-b xs:border-b-0"
            >
              {label}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
