import React from 'react';

export interface CardShape {
  type: string,
  imgSrc?: string,
  title: string,
  price: string,
  description: string,
}

const typeColorMap: Record<string, string[]> = {
  'pizza': ['hsl(120 35% 25%)', '#fff'],
  'bread': ['#fff'],
  'small-bites': ['hsl(0 45% 40%)', '#fff'],
}

function Card({details}: {details: CardShape}) {
  const colorKey = details.type.toLowerCase().split(' ').join('-');
  const typeBG = typeColorMap[colorKey][0];
  const typeColor = typeColorMap[colorKey][1];

  return (
    <div className="card">
      <div className="card__details">
        <div className="card__img fpo flex-center">
          FPO
        </div>
        <div className="card__type">
          <span
            style={{
              background: typeBG,
              color: typeColor || 'inherit',
            }}
          >
            {details.type}
          </span>
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
