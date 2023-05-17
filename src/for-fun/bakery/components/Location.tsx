import React from 'react';

interface LocationShape {
  city: string;
  img: string;
  address: string;
}

const locations: LocationShape[] = [
  {
    city: 'San Francisco, CA',
    img: '/static/imgs/bakery/sf-city.webp',
    address: `345 Powell St 90012`,
  },
  {
    city: 'New York, NY',
    img: '/static/imgs/bakery/ny-city.webp',
    address: `123 Mulberry St 10023`,
  },
  {
    city: 'Nashville, TN',
    img: '/static/imgs/bakery/nash-city.webp',
    address: `678 N. Vols 37623`,
  },
]

function LocationPanel({details}: {details: LocationShape}) {
  return (
    <div className="flex-bottom location__accordion-panel" style={{
      backgroundImage: `url(${details.img})`,
    }}>
      <div className="location__overlay"></div>
      <div className="location__content">
        <div className="location__city">
          {details.city}
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960">
            <path d="M120 936V636h60v198l558-558H540v-60h300v300h-60V318L222 876h198v60H120Z"/>
          </svg>
        </div>
        <div className="location__address">
          {details.address}
        </div>
      </div>
    </div>
  );
}

function Location() {
  return (
    <section className="section section--outline location" id="location">
      <h2 className="eyebrow">
        Where to Find Us
      </h2>
      <p style={{ maxWidth: '900px', marginBottom: 'var(--main-padding-y' }}>
        We are excited to serve you at our three locations in San Francisco, New York, and Nashville, making it easy for you to satisfy your pizza cravings no matter where you are. Come visit us today at any of our three locations and taste the difference!
      </p>
      <div className="location__accordion">
        {locations.map((location: LocationShape) => {
          return <LocationPanel details={location} key={location.city} />
        })}
      </div>
    </section>
  );
}

export default Location;
