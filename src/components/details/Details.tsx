import React from 'react';


function Details({title, list}: {title: string, list: string[]}) {
  return (
    <div className="mm-details">
      <p className="mm-details__title">
        <span className="mm-details__label">
          {title}
        </span>
      </p>
      <p className="mm-details__list">
        {list.map((label: string) => {
          return (
            <span key={label}
                className="mm-details__label">
              {label}
            </span>
          )
        })}
      </p>
    </div>
  )
}

export default Details;
