import React, { useState } from 'react';
import styles from './BlogPostDetail.module.css';
import CommentList from './CommentList';
import CommentForm from './CommentForm';

const initialComments = [
  // Example: { name: 'Alice', date: new Date(), text: 'Great post!', avatar: '' }
];

const BlogPostDetail = ({ title, content, author, date }) => {
  const [comments, setComments] = useState(initialComments);

  if (!title || !content || !author || !date) {
    return <p className={styles.notFound}>Blog post not found.</p>;
  }
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const handleAddComment = (comment) => {
    setComments((prev) => [
      ...prev,
      { ...comment, date: new Date(), avatar: '' },
    ]);
  };

  return (
    <div className={styles.blogPostDetail}>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.author}>By {author}</p>
      <p className={styles.date}>Published on {formattedDate}</p>
      <div
        className={styles.content}
        dangerouslySetInnerHTML={{
          __html: content,
        }}
      />
      <section className={styles.commentsSection} aria-label="Comments">
        <h2 className={styles.commentsTitle}>Comments</h2>
        <CommentList comments={comments} />
        <CommentForm onSubmit={handleAddComment} isLoggedIn={false} />
      </section>
    </div>
  );
};

export default BlogPostDetail;
