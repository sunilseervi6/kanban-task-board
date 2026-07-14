import Card from '../Card/Card';
import styles from './Column.module.css';

function Column({ title, column, tasks, onEditTask, onDeleteTask }) {
  return (
    <div className={styles.column}>
      <h2 className={styles.title}>
        {title} <span className={styles.count}>({tasks.length})</span>
      </h2>
      <div className={styles.list}>
        {tasks.map((task) => (
          // Fulfilling: List rendering with stable explicit key strings
          <Card
            key={task.id}
            task={task}
            onEdit={onEditTask}
            onDelete={onDeleteTask}
          />
        ))}
      </div>
    </div>
  );
}

export default Column;