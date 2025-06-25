import React, { useState } from 'react';
import styles from './CommentForm.module.css';

const CommentForm = ({ onSubmit, isLoggedIn, userName }) => {
  const [name, setName] = useState(userName || '');
  const [text, setText] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if ((!isLoggedIn && !name.trim()) || !text.trim()) {
      setError('Please fill in all fields.');
      return;
    }
    setError('');
    onSubmit({ name: isLoggedIn ? userName : name, text });
    setText('');
    if (!isLoggedIn) setName('');
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit} aria-label="Add a comment">
      {!isLoggedIn && (
        <div className={styles.formGroup}>
          <label htmlFor="comment-name">Name</label>
          <input
            id="comment-name"
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            className={styles.input}
            autoComplete="name"
            required
          />
        </div>
      )}
      <div className={styles.formGroup}>
        <label htmlFor="comment-text">Comment</label>
        <textarea
          id="comment-text"
          value={text}
          onChange={e => setText(e.target.value)}
          className={styles.textarea}
          rows={3}
          required
        />
      </div>
      {error && <div className={styles.error}>{error}</div>}
      <button type="submit" className={styles.button}>Submit</button>
    </form>
  );
};

export default CommentForm;
