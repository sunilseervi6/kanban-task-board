import styles from './TaskForm.module.css';

function TaskForm() {
  return (
    <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
      <input
        type="text"
        placeholder="Task Title..."
        className={styles.input}

      />
      <input
        type="text"
        placeholder="Description..."
        className={styles.input}

      />
      <button type="submit" className={styles.submitBtn} disabled>
        Add Static Task
      </button>

    </form>
  );
}

export default TaskForm;