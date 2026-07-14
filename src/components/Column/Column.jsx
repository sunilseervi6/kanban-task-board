import Card from '../Card/Card';
import { COLUMNS } from '../../data/columns';
import styles from './Column.module.css';

function Column({ title, column, tasks, onEditTask, onDeleteTask, onMoveTask }) {
  const colIndex = COLUMNS.findIndex((c) => c.id === column);
  const isFirst = colIndex === 0;
  const isLast = colIndex === COLUMNS.length - 1;

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
            onMove={onMoveTask}
            isFirst={isFirst}
            isLast={isLast}
          />
        ))}
      </div>
    </div>
  );
}

export default Column;