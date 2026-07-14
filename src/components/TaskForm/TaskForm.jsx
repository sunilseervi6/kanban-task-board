import { useState } from 'react';
import { COLUMNS } from '../../data/columns';
import styles from './TaskForm.module.css';

function TaskForm({ onAddTask }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [column, setColumn] = useState(COLUMNS[0].id);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Title cannot be empty!');
      return;
    }
    setError('');
    onAddTask(title.trim(), description.trim(), column);
    setTitle('');
    setDescription('');
    setColumn(COLUMNS[0].id);
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
          value={column}
          onChange={(e) => setColumn(e.target.value)}
        >
          {COLUMNS.map((col) => (
            <option key={col.id} value={col.id}>
              {col.title}
            </option>
          ))}
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