import React, { useEffect, useRef } from 'react';
import styles from './ConfirmationDialog.module.css';
const ConfirmationDialog = ({ isOpen, onClose, onConfirm, loading }) => {
  const dialogRef = useRef(null);
  useEffect(() => {
    if (isOpen && dialogRef.current) {
      dialogRef.current.focus();
      // Trap focus inside dialog
      const handleKeyDown = (e) => {
        if (e.key === 'Escape') onClose();
        if (e.key === 'Tab') {
          const focusable = dialogRef.current.querySelectorAll('button');
          if (focusable.length === 0) return;
          const first = focusable[0];
          const last = focusable[focusable.length - 1];
          if (e.shiftKey) {
            if (document.activeElement === first) {
              e.preventDefault();
              last.focus();
            }
          } else {
            if (document.activeElement === last) {
              e.preventDefault();
              first.focus();
            }
          }
        }
      };
      dialogRef.current.addEventListener('keydown', handleKeyDown);
      return () => dialogRef.current.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, onClose]);
  if (!isOpen) return null;
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={styles.dialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description"
        ref={dialogRef}
        tabIndex={-1}
        onClick={e => e.stopPropagation()}
      >
        <h2 id="dialog-title" className={styles.title}>Confirm Deletion</h2>
        <p id="dialog-description" className={styles.description}>Are you sure you want to delete this post?</p>
        <div className={styles.buttons}>
          <button onClick={onClose} className={styles.cancelBtn} autoFocus>Cancel</button>
          <button onClick={onConfirm} className={styles.deleteBtn} disabled={loading} aria-busy={loading}>
            {loading ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  );
};
export default ConfirmationDialog;
