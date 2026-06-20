import React, { useState } from 'react';
import Header from './components/layout/Header';
import SmoothScroll from './components/layout/SmoothScroll';
import Hero from './components/sections/Hero';
import Preloader from './components/ui/Preloader';
import './styles/variables.css';

const App: React.FC = () => {
  const [loadingComplete, setLoadingComplete] = useState(false);

  return (
    <div className="app">
      {!loadingComplete && (
        <Preloader 
          progress={100} 
          onComplete={() => setLoadingComplete(true)} 
        />
      )}
      
      <Header />
      
      <SmoothScroll>
        <main>
          <Hero />
          
          <section id="about" style={{ height: '100vh', background: 'var(--bg-secondary)', padding: '100px' }}>
            <h2 style={{ fontSize: 'var(--fs-h2)' }}>About Us</h2>
            <p>Our story begins with a passion for quality coffee and community.</p>
          </section>
          
          <section id="menu" style={{ height: '100vh', background: 'var(--bg-primary)', padding: '100px' }}>
            <h2 style={{ fontSize: 'var(--fs-h2)' }}>The Menu</h2>
            <p>Explore our carefully curated selection of beans and pastries.</p>
          </section>

          <section id="contact" style={{ height: '100vh', background: 'var(--bg-secondary)', padding: '100px' }}>
            <h2 style={{ fontSize: 'var(--fs-h2)' }}>Get in Touch</h2>
            <p>Visit us at our primary location or follow us on social media.</p>
          </section>
        </main>
      </SmoothScroll>
    </div>
  );
};

export default App;
