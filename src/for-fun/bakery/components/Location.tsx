import React from 'react';

interface LocationShape {
  city: string;
  img: string;
}

const locations: LocationShape[] = [
  {
    city: 'New York',
    img: '/static/imgs/showcase/wildfire-interactive.webp',
  },
  {
    city: 'San Francisco',
    img: '/static/imgs/showcase/youtube-trends-2022.webp',
  },
  {
    city: 'Nashville',
    img: '/static/imgs/showcase/youtube-creators.webp',
  },
]

function LocationPanel({details}: {details: LocationShape}) {
  return (
    <div className="flex-center location__accordion-panel" style={{
      backgroundImage: `url(${details.img})`,
    }}>
      <div className="location__overlay"></div>
      <div className="location__content">
        <div>{details.city}</div>
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
