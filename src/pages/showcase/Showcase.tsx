import React from 'react';
import { Navigate, useParams }  from 'react-router-dom';
import slugify from 'react-slugify';
import { SHOWCASES } from '../../global/content/showcases';
import { usePageTitleEffect } from '../../global/global.utils';


function Showcase() {
  const {id} = useParams();

  const showcase = SHOWCASES.find((showcase) => {
    return slugify(showcase.title) === id;
  });

  // Redirect to 404 if no showcase is found.
  if (!showcase) return <Navigate to="/404" />

  usePageTitleEffect(`Showcase - ${showcase.title}`, [showcase.title]);

  return (
    <section className="mm-section">
      <h1>{showcase.title}</h1>
    </section>
  )
}

export default Showcase;
