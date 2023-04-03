import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import About from './pages/about/About';
import Projects from './pages/projects/Projects';
import ProjectsLayout from './layouts/projects/ProjectsLayout';
import Showcase from './pages/showcase/Showcase';
import Contact from './pages/contact/Contact';
import NotFound from './pages/404';


function App() {
  const location = useLocation();

  window.scrollTo(0, 0);

  return (
    <>
      {location.pathname !== '/' && <Header />}
      <main className="mm-main">
        <Routes>
          {/* Home/About */}
          <Route path="/" element={<About />} />
          {/* Projects */}
          <Route path="/projects" element={<ProjectsLayout />} >
            <Route index element={<Projects />} />
            <Route path=":id" element={<Showcase />} />
          </Route>
          {/* Snippets */}
          <Route path="/snippets" element={<h1>Snippets</h1>} />
          {/* Contact */}
          <Route path="/contact" element={<Contact />} />
          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}

export default App;
