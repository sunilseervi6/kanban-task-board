import { useState } from 'react';
import styles from './Card.module.css';

function Card({ task, onEdit, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDescription, setEditDescription] = useState(task.description);

  const handleSave = (e) => {
    e.preventDefault();
    if (!editTitle.trim()) return;
    onEdit(task.id, { title: editTitle.trim(), description: editDescription.trim() });
    setIsEditing(false);
  };

  const handleCancel = () => {
    // Reset to task's actual current values when cancelling
    setEditTitle(task.title);
    setEditDescription(task.description);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <form onSubmit={handleSave} className={styles.editForm}>
        <input
          type="text"
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
          className={styles.editInput}
          required
        />
        <textarea
          value={editDescription}
          onChange={(e) => setEditDescription(e.target.value)}
          className={styles.editTextarea}
          placeholder="Task description..."
        />
        <div className={styles.editActions}>
          <button type="submit" className={`${styles.btn} ${styles.btnSave}`}>
            Save
          </button>
          <button type="button" onClick={handleCancel} className={styles.btn}>
            Cancel
          </button>
        </div>
      </form>
    );
  }

  return (
    <div className={styles.card}>
      <h3 className={styles.taskTitle}>{task.title}</h3>
      <p className={styles.taskDescription}>{task.description}</p>
      <div className={styles.actions}>
        <button className={styles.btn}>← Move</button>
        <button className={styles.btn} onClick={() => setIsEditing(true)}>
          Edit
        </button>
        <button
          className={`${styles.btn} ${styles.btnDelete}`}
          onClick={() => onDelete(task.id)}
        >
          Delete
        </button>
        <button className={styles.btn}>Move →</button>
      </div>
    </div>
  );
}

export default Card;
