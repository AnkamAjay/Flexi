import React, { useState, useEffect } from 'react';
import styles from './BlogPostForm.module.css';

const BlogPostForm = ({ post, onSubmit }) => {
  const [title, setTitle] = useState(post?.title || '');
  const [content, setContent] = useState(post?.content || '');
  const [author, setAuthor] = useState(post?.author || '');
  const [date, setDate] = useState(post?.date ? formatDateForInput(post.date) : '');
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setTitle(post?.title || '');
    setContent(post?.content || '');
    setAuthor(post?.author || '');
    setDate(post?.date ? formatDateForInput(post.date) : '');
  }, [post]);

  function formatDateForInput(dateValue) {
    if (!dateValue) return '';
    const d = typeof dateValue === 'string' ? new Date(dateValue) : dateValue;
    return d.toISOString().split('T')[0];
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!title.trim()) newErrors.title = 'Required';
    if (!content.trim()) newErrors.content = 'Required';
    if (!author.trim()) newErrors.author = 'Required';
    if (!date) newErrors.date = 'Required';
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;
    setSubmitting(true);
    try {
      await onSubmit({ title, content, author, date });
      // Optionally reset form here if needed
      // setTitle(''); setContent(''); setAuthor(''); setDate('');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className={styles.blogPostForm} onSubmit={handleSubmit} noValidate>
      <div className={styles.formGroup}>
        <label htmlFor="title" className={styles.label}>Title</label>
        <input
          id="title"
          className={styles.input}
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          aria-invalid={!!errors.title}
          aria-describedby={errors.title ? 'title-error' : undefined}
        />
      </div>
      {errors.title && <p className={styles.error} id="title-error">{errors.title}</p>}

      <div className={styles.formGroup}>
        <label htmlFor="content" className={styles.label}>Content</label>
        <textarea
          id="content"
          className={styles.textarea}
          value={content}
          onChange={e => setContent(e.target.value)}
          aria-invalid={!!errors.content}
          aria-describedby={errors.content ? 'content-error' : undefined}
        />
      </div>
      {errors.content && <p className={styles.error} id="content-error">{errors.content}</p>}

      <div className={styles.formGroup}>
        <label htmlFor="author" className={styles.label}>Author</label>
        <input
          id="author"
          className={styles.input}
          type="text"
          value={author}
          onChange={e => setAuthor(e.target.value)}
          aria-invalid={!!errors.author}
          aria-describedby={errors.author ? 'author-error' : undefined}
        />
      </div>
      {errors.author && <p className={styles.error} id="author-error">{errors.author}</p>}

      <div className={styles.formGroup}>
        <label htmlFor="date" className={styles.label}>Publication Date</label>
        <input
          id="date"
          className={styles.date}
          type="date"
          value={date}
          onChange={e => setDate(e.target.value)}
          aria-invalid={!!errors.date}
          aria-describedby={errors.date ? 'date-error' : undefined}
        />
      </div>
      {errors.date && <p className={styles.error} id="date-error">{errors.date}</p>}

      <button
        type="submit"
        className={styles.submitBtn}
        disabled={submitting}
        aria-busy={submitting}
      >
        {submitting ? 'Submitting...' : post ? 'Update Post' : 'Create Post'}
      </button>
    </form>
  );
};

export default BlogPostForm;
