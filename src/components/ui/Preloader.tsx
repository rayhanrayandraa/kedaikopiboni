import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import styles from './Preloader.module.css';

interface PreloaderProps {
  progress: number;
  onComplete: () => void;
}

const Preloader: React.FC<PreloaderProps> = ({ progress, onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (progress >= 100) {
      gsap.to(containerRef.current, {
        opacity: 0,
        duration: 0.8,
        ease: 'power2.inOut',
        onComplete,
      });
    }
  }, [progress, onComplete]);

  return (
    <div ref={containerRef} className={styles.preloader}>
      <div className={styles.content}>
        <h1 className={styles.logo}>BONI</h1>
        <div className={styles.progressWrapper}>
          <div 
            ref={barRef} 
            className={styles.progressBar} 
            style={{ width: `${progress}%` }} 
          />
        </div>
        <p className={styles.percentage}>{Math.round(progress)}%</p>
      </div>
    </div>
  );
};

export default Preloader;
