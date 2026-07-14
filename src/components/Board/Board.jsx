import Column from '../Column/Column';
import styles from './Board.module.css';

function Board({ tasks }) {
  return (
    <div className={styles.board}>
      <Column title="To Do" status="todo" tasks={tasks} />
      <Column title="In Progress" status="in-progress" tasks={tasks} />
      <Column title="Done" status="done" tasks={tasks} />
    </div>
  );
}

export default Board;