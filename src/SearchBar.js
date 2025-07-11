import React, { useState, useRef, useEffect } from 'react';
import styles from './SearchBar.module.css';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [expanded, setExpanded] = useState(window.innerWidth > 768);
  const inputRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setExpanded(window.innerWidth > 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (expanded && inputRef.current) {
      inputRef.current.focus();
    }
  }, [expanded]);

  const handleInput = (e) => {
    setQuery(e.target.value);
    onSearch(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form className={styles.searchForm} onSubmit={handleSubmit} role="search" aria-label="Search posts">
      {(!expanded && (
        <button
          type="button"
          className={styles.iconButton}
          aria-label="Open search"
          onClick={() => setExpanded(true)}
        >
          <span className={styles.icon}>🔍</span>
        </button>
      ))}
      {(expanded && (
        <>
          <label htmlFor="search-input" className={styles.srOnly}>Search posts</label>
          <input
            id="search-input"
            ref={inputRef}
            className={styles.input}
            type="text"
            placeholder="Search posts..."
            value={query}
            onChange={handleInput}
            autoComplete="off"
          />
          {window.innerWidth <= 768 && (
            <button
              type="button"
              className={styles.cancelButton}
              onClick={() => { setExpanded(false); setQuery(''); onSearch(''); }}
            >Cancel</button>
          )}
          <button type="submit" className={styles.iconButton} aria-label="Search">
            <span className={styles.icon}>🔍</span>
          </button>
        </>
      ))}
    </form>
  );
};

export default SearchBar;
