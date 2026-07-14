import { useState } from 'react';
import Column from '../Column/Column';
import TaskForm from '../TaskForm/TaskForm';
import styles from './Board.module.css';

function Board({ tasks: initialTasks }) {
  //adding state for tasks
  const [tasks, setTasks] = useState(initialTasks);

  const addTask = (title, description) => {
    const newTask = {
      id: crypto.randomUUID(),
      title,
      description,
      status: 'todo',
    };
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  return (
    <div>
      <TaskForm onAddTask={addTask} />
      <div className={styles.board}>
        <Column title="To Do" status="todo" tasks={tasks} />
        <Column title="In Progress" status="in-progress" tasks={tasks} />
        <Column title="Done" status="done" tasks={tasks} />
      </div>
    </div>
  );
}

export default Board;