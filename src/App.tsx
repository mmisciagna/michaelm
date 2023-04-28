import React from 'react';
import { Route, Routes, useLocation, useParams } from 'react-router-dom';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import About from './pages/about/About';
import Projects from './pages/projects/Projects';
import ProjectsLayout from './layouts/projects/ProjectsLayout';
import TidbitsLayout from './layouts/tidbits/TidbitsLayout';
import Showcase from './pages/showcase/Showcase';
import Contact from './pages/contact/Contact';
import Tidbits from './pages/tidbits/Tidbits';
import NotFound from './pages/404';


function App() {
  return (
    <>
      <Header />
      <main className="mm-main">
        <Routes>
          {/* Tidbits */}
          <Route path="/" element={<TidbitsLayout />}>
            <Route index element={<Tidbits />} />
            <Route path=":index" element={<Tidbits />} />
          </Route>
          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}

export default App;
