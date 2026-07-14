import Card from '../Card/Card';
import styles from './Column.module.css';

function Column({ title, status, tasks }) {
  // Pure functional transformation: filtering specific elements
  const filteredTasks = tasks.filter(task => task.status === status);

  return (
    <div className={styles.column}>
      <h2 className={styles.title}>
        {title} <span className={styles.count}>({filteredTasks.length})</span>
      </h2>
      <div className={styles.list}>
        {filteredTasks.map(task => (
          // Fulfilling: List rendering with stable explicit key strings
          <Card key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}

export default Column;