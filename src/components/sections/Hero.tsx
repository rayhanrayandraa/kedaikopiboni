import React, { useRef } from 'react';
import { useScrollProgress } from '../../hooks/useScrollProgress';
import { useImageSequence } from '../../hooks/useImageSequence';
import styles from './Hero.module.css';

const Hero: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scrollProgress = useScrollProgress(sectionRef);
  useImageSequence(canvasRef, scrollProgress);

  return (
    <section ref={sectionRef} className={styles.hero}>
      <div className={styles.canvasContainer}>
        <canvas ref={canvasRef} className={styles.canvas} />
        <div className={styles.overlay} />
      </div>
      
      <div className={styles.content}>
        <div className={styles.textWrapper}>
          <h1 className={styles.title}>
            KEDAI KOPI <span className={styles.accent}>BONI</span>
          </h1>
          <p className={styles.subtitle}>
            Crafting memories, one cup at a time. Experience the finest beans and premium atmosphere.
          </p>
          <a href="#menu" className={styles.cta}>Discover Menu</a>
        </div>
      </div>

      <div className={styles.scrollIndicator}>
        <div className={styles.mouse}>
          <div className={styles.wheel} />
        </div>
        <span className={styles.scrollText}>Scroll to explore</span>
      </div>
    </section>
  );
};

export default Hero;
