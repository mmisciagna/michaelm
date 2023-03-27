import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


function NotFound() {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => navigate(-1), 1500);
  });

  return (
    <section className="mm-section">
      <h1>404 Not Found</h1>
      <p>Redirecting to previous page...</p>
    </section>
  )
}

export default NotFound;
