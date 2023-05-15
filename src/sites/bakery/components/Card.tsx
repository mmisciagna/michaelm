import React from 'react';

function Card({details}: {details: {
  type: string,
  imgSrc?: string,
  title: string,
  price: string,
  description: string,
}}) {
  return (
    <div className="card">
      <div className="card__details">
        <div className="card__img fpo"></div>
        <div className="card__type">
          {details.type}
        </div>
        <div>
          <h4 className="card__title">
            {details.title}
          </h4>
          <p className="card__price">
            {details.price}
          </p>
        </div>
        <div>
          <p className="card__description">
            {details.description}
          </p>
        </div>
      </div>
      <div>
        <button className="button button--dark">
          Add to cart
        </button>
      </div>
    </div>
  )
}

export default Card;
