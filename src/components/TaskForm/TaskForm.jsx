import { useState } from 'react';
import styles from './TaskForm.module.css';

function TaskForm({ onAddTask }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('todo');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Title cannot be empty!');
      return;
    }
    setError('');
    onAddTask(title.trim(), description.trim(), status);
    setTitle('');
    setDescription('');
    setStatus('todo');
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    if (error) {
      setError('');
    }
  };

  return (
    <div className={styles.formContainer}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Task Title..."
          className={styles.input}
          value={title}
          onChange={handleTitleChange}
        />
        <input
          type="text"
          placeholder="Description..."
          className={styles.input}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <select
          className={styles.select}
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="todo">To Do</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>
        <button type="submit" className={styles.submitBtn}>
          Add Task
        </button>
      </form>
      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
}

export default TaskForm;