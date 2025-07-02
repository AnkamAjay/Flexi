import React from 'react';
import styles from './Comment.module.css';

const Comment = ({ name, date, text, avatar }) => {
  const formattedDate = new Date(date).toLocaleString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
  });
  return (
    <div className={styles.comment} aria-live="polite">
      {avatar && <img src={avatar} alt={name + " avatar"} className={styles.avatar} />}
      <div className={styles.content}>
        <div className={styles.header}>
          <span className={styles.name}>{name}</span>
          <span className={styles.date}>{formattedDate}</span>
        </div>
        <div className={styles.text}>{text}</div>
      </div>
    </div>
  );
};

export default Comment;
