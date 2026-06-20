import React, { useState, useEffect } from 'react';
import { useTheme } from '../../hooks/useTheme';
import { Sun, Moon, Menu, X } from 'lucide-react';
import styles from './Header.module.css';
import { clsx } from 'clsx';

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={clsx(styles.header, isScrolled && styles.scrolled)}>
      <div className={styles.container}>
        <a href="/" className={styles.logo}>BONI</a>
        
        <nav className={clsx(styles.nav, isMenuOpen && styles.navOpen)}>
          <ul className={styles.navList}>
            <li><a href="#about" onClick={() => setIsMenuOpen(false)}>About</a></li>
            <li><a href="#menu" onClick={() => setIsMenuOpen(false)}>Menu</a></li>
            <li><a href="#contact" onClick={() => setIsMenuOpen(false)}>Contact</a></li>
          </ul>
        </nav>

        <div className={styles.actions}>
          <button onClick={toggleTheme} aria-label="Toggle Theme" className={styles.actionBtn}>
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>
          <button 
            className={clsx(styles.actionBtn, styles.menuBtn)} 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
