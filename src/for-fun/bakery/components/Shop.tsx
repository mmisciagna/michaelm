import React from 'react';
import Card from './Card';

function Shop() {
  return (
    <section className="section section--fullbleed shop" id="shop">
      <div className="section__inner">
        <h2 className="eyebrow">
          Order Online
        </h2>
        <div className="grid grid--4cols" style={{ columnGap: '1em', rowGap: '3em' }}>
          <div>
            <Card details={{
              type: 'Pizza',
              title: 'Pizza Margharita',
              price: '$18.00',
              description: `Pizza Margherita is a classic Italian pizza made with a thin crust, tomato sauce, fresh mozzarella cheese, basil, and extra-virgin olive oil. It is a simple yet delicious pizza that highlights the quality of the ingredients used.`,
            }} />
          </div>
          <div>
            <Card details={{
              type: 'Pizza',
              title: 'Salsiccia Pizza',
              price: '$22.00',
              description: `Salsiccia Pizza is a delicious pizza that is sure to satisfy any pizza lover's cravings. This pizza features a thin, crispy crust that is topped with tangy tomato sauce, fresh mozzarella cheese, and savory Italian sausage.`,
            }} />
          </div>
          <div>
            <Card details={{
              type: 'Bread',
              title: 'Foccacia',
              price: '$24.00',
              description: `We make our focaccia in-house, using only the finest ingredients and traditional techniques. Our focaccia is baked to perfection, with a golden-brown crust and a fragrant aroma that will tantalize your taste buds. It is the perfect addition to any meal.`
            }} />
          </div>
          <div>
            <Card details={{
              type: 'Small Bites',
              title: 'Taralli',
              price: '$14.00',
              description: `Taralli are small, crispy, and savory Italian biscuits with a unique and irresistible texture. They are made from simple ingredients such as flour, water, olive oil, white wine, and salt. The result is a crispy and crunchy texture with a subtle savory flavor that makes them a perfect snack or accompaniment to a variety of dishes.`
            }} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Shop;
