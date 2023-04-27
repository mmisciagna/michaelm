import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Footer from './components/footer/Footer';
import About from './pages/about/About';
import NotFound from './pages/404';


function App() {

  return (
    <>
      <main className="mm-main">
        <Routes>
          {/* Home/About */}
          <Route path="/" element={<About />} />
          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}

export default App;
