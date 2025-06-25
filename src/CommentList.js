import React from 'react';
import Comment from './Comment';
import styles from './CommentList.module.css';

const CommentList = ({ comments }) => {
  if (!comments || comments.length === 0) {
    return <div className={styles.empty}>No comments yet.</div>;
  }
  return (
    <div className={styles.commentList} aria-live="polite">
      {comments.map((comment, idx) => (
        <Comment key={idx} {...comment} />
      ))}
    </div>
  );
};

export default CommentList;
