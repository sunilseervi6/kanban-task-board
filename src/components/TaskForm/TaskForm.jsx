import { useState } from 'react';
import styles from './TaskForm.module.css';

function TaskForm({ onAddTask }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAddTask(title.trim(), description.trim());
    setTitle('');
    setDescription('');
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Task Title..."
        className={styles.input}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Description..."
        className={styles.input}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button 
        type="submit" 
        className={styles.submitBtn} 
        disabled={!title.trim()}
      >
        Add Static Task
      </button>
    </form>
  );
}

export default TaskForm;