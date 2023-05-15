import React from 'react';
import { Route, Routes, useLocation, useParams } from 'react-router-dom';
import classnames from 'classnames';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import About from './pages/about/About';
import Projects from './pages/projects/Projects';
import ProjectsLayout from './layouts/projects/ProjectsLayout';
import TidbitsLayout from './layouts/tidbits/TidbitsLayout';
import Showcase from './pages/showcase/Showcase';
import Contact from './pages/contact/Contact';
import Tidbits from './pages/tidbits/Tidbits';
import Bakery from './for-fun/bakery/Bakery';
import NotFound from './pages/404';


function App() {
  const location = useLocation();
  const pathParts = location.pathname.split('/');

  if (!pathParts[2] || pathParts[1] !== 'tidbits') {
    window.scrollTo(0, 0);
  }

  const noHeaderPaths = ['/', '/bakery'];
  const noFooterPaths = ['/bakery'];
  const bakeryPaths = ['/bakery'];

  const mainClassnames = classnames({
    'mm-main': true,
    'bakery-main': bakeryPaths.includes(location.pathname),
  });

  return (
    <>
      {(!noHeaderPaths.includes(location.pathname)) && <Header />}
      <main className={mainClassnames}>
        <Routes>
          {/* Home/About */}
          <Route path="/" element={<About />} />
          {/* Projects */}
          <Route path="/projects" element={<ProjectsLayout />} >
            <Route index element={<Projects />} />
            <Route path=":id" element={<Showcase />} />
          </Route>
          {/* Tidbits */}
          <Route path="/tidbits" element={<TidbitsLayout />}>
            <Route index element={<Tidbits />} />
            <Route path=":index" element={<Tidbits />} />
          </Route>
          {/* Contact */}
          <Route path="/contact" element={<Contact />} />
          {/* Bakery */}
          <Route path="/bakery" element={<Bakery />} />
          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      {!noFooterPaths.includes(location.pathname) && <Footer />}
    </>
  )
}

export default App;
