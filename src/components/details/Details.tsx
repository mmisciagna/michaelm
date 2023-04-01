import React from 'react';


function Details({title, list}: {title: string, list: string[]}) {
  return (
    <div className="mm-details">
      <p className="mm-details__title">
        <span className="mm-details__label">
          {title}
        </span>
      </p>
      <ul className="mm-details__list">
        {list.map((label: string) => {
          return (
            <li key={label}
                className="mm-details__label">
              {label}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default Details;
