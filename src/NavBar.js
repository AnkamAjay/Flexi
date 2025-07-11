import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './NavBar.module.css';
import SearchBar from './SearchBar';

const NavBar = ({ onSearch }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const hamburgerRef = useRef(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isMobileMenuOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        hamburgerRef.current &&
        !hamburgerRef.current.contains(event.target)
      ) {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobileMenuOpen]);

  // Close menu on link click
  const handleLinkClick = () => setIsMobileMenuOpen(false);

  // Keyboard accessibility for hamburger
  const handleHamburgerKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setIsMobileMenuOpen((open) => !open);
    }
  };

  return (
    <nav className={styles.navBar}>
      <Link to="/" className={styles.logo} tabIndex={0} aria-label="Go to home page">Blog Application</Link>
      <div className={styles.searchBarWrapper}>
        <SearchBar onSearch={onSearch} />
      </div>
      <div className={styles.rightLinks}>
        <Link to="/" tabIndex={0}>Home</Link>
        <Link to="/posts/new" tabIndex={0}>New Post</Link>
      </div>
      <button
        ref={hamburgerRef}
        className={styles.hamburger}
        onClick={() => setIsMobileMenuOpen((open) => !open)}
        onKeyDown={handleHamburgerKeyDown}
        aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={isMobileMenuOpen}
        aria-controls="mobile-menu"
        tabIndex={0}
      >
        {isMobileMenuOpen ? '✕' : '☰'}
      </button>
      <div
        id="mobile-menu"
        ref={menuRef}
        className={`${styles.mobileMenu} ${isMobileMenuOpen ? styles.open : ''}`}
        aria-hidden={!isMobileMenuOpen}
      >
        <Link to="/" onClick={handleLinkClick} tabIndex={isMobileMenuOpen ? 0 : -1}>Home</Link>
        <Link to="/posts/new" onClick={handleLinkClick} tabIndex={isMobileMenuOpen ? 0 : -1}>New Post</Link>
      </div>
    </nav>
  );
};

export default NavBar;
