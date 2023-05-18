import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper';
import { v4 as uuidv4 } from 'uuid';
import Card, {CardShape} from './Card';
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';

const cards: CardShape[] = [
  {
    type: 'Pizza',
    title: 'Pizza Margharita',
    price: '$18.00',
    description: `Pizza Margherita is a classic Italian pizza made with a thin crust, tomato sauce, fresh mozzarella cheese, basil, and extra-virgin olive oil. It is a simple yet delicious pizza that highlights the quality of the ingredients used.`,
  },
  {
    type: 'Pizza',
    title: 'Pizza Salsiccia',
    price: '$22.00',
    description: `Salsiccia Pizza is a delicious pizza that is sure to satisfy any pizza lover's cravings. This pizza features a thin, crispy crust that is topped with tangy tomato sauce, fresh mozzarella cheese, and savory Italian sausage.`,
  },
  {
    type: 'Bread',
    title: 'Foccacia',
    price: '$24.00',
    description: `We make our focaccia in-house, using only the finest ingredients and traditional techniques. Our focaccia is baked to perfection, with a golden-brown crust and a fragrant aroma that will tantalize your taste buds. It is the perfect addition to any meal.`
  },
  {
    type: 'Small Bites',
    title: 'Taralli',
    price: '$14.00',
    description: `Taralli are small, crispy, and savory Italian biscuits with a unique and irresistible texture. They are made from simple ingredients such as flour, water, olive oil, white wine, and salt. The result is a crispy and crunchy texture with a subtle savory flavor that makes them a perfect snack or accompaniment to a variety of dishes.`
  },
  {
    type: 'Pizza',
    title: 'Pizza Margharita',
    price: '$18.00',
    description: `Pizza Margherita is a classic Italian pizza made with a thin crust, tomato sauce, fresh mozzarella cheese, basil, and extra-virgin olive oil. It is a simple yet delicious pizza that highlights the quality of the ingredients used.`,
  },
  {
    type: 'Pizza',
    title: 'Pizza Salsiccia',
    price: '$22.00',
    description: `Salsiccia Pizza is a delicious pizza that is sure to satisfy any pizza lover's cravings. This pizza features a thin, crispy crust that is topped with tangy tomato sauce, fresh mozzarella cheese, and savory Italian sausage.`,
  },
  {
    type: 'Bread',
    title: 'Foccacia',
    price: '$24.00',
    description: `We make our focaccia in-house, using only the finest ingredients and traditional techniques. Our focaccia is baked to perfection, with a golden-brown crust and a fragrant aroma that will tantalize your taste buds. It is the perfect addition to any meal.`
  },
  {
    type: 'Small Bites',
    title: 'Taralli',
    price: '$14.00',
    description: `Taralli are small, crispy, and savory Italian biscuits with a unique and irresistible texture. They are made from simple ingredients such as flour, water, olive oil, white wine, and salt. The result is a crispy and crunchy texture with a subtle savory flavor that makes them a perfect snack or accompaniment to a variety of dishes.`
  },
];

function Shop() {
  return (
    <section className="section section--fullbleed shop" id="shop">
      <div className="section__inner">
        <h2 className="eyebrow">
          Order Online
        </h2>
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={24}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          breakpoints={{
            600: {slidesPerView: 2},
            900: {slidesPerView: 3},
            1200: {slidesPerView: 4},
          }}
        >
          {cards.map((card: CardShape) => <SwiperSlide key={uuidv4()}><Card details={card} /></SwiperSlide>)}
        </Swiper>
      </div>
    </section>
  );
}

export default Shop;
