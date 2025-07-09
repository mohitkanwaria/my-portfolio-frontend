// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './pages/Experience/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Blog from './pages/Blog/Blog'; // ✅ Import your Blog page
import './App.css';

const Home = () => (
  <>
    <Header />
    <Hero />
    <About />
    <Experience />
    <Projects />
    <Skills />
    <Education />
    <Contact />
    <Footer />
  </>
);

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />          {/* ✅ Home route */}
        <Route path="/blog" element={<Blog />} />      {/* ✅ Blog route */}
      </Routes>
    </Router>
  );
};

export default App;
