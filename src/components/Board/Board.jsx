import { useState } from 'react';
import Column from '../Column/Column';
import TaskForm from '../TaskForm/TaskForm';
import { COLUMNS } from '../../data/columns';
import styles from './Board.module.css';

function Board({ tasks: initialTasks = [] }) {
  //adding state for tasks
  const [tasks, setTasks] = useState(initialTasks);

  const addTask = (title, description, column) => {
    const newTask = {
      id: crypto.randomUUID(),
      title,
      description,
      column,
    };
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const editTask = (id, updates) => {
    setTasks((prevTasks) =>
      prevTasks.map((t) => (t.id === id ? { ...t, ...updates } : t))
    );
  };

  const deleteTask = (id) => {
    setTasks((prevTasks) => prevTasks.filter((t) => t.id !== id));
  };

  return (
    <div>
      <TaskForm onAddTask={addTask} />
      <div className={styles.board}>
        {COLUMNS.map((col) => (
          <Column
            key={col.id}
            title={col.title}
            column={col.id}
            tasks={tasks.filter((task) => task.column === col.id)}
            onEditTask={editTask}
            onDeleteTask={deleteTask}
          />
        ))}
      </div>
    </div>
  );
}

export default Board;