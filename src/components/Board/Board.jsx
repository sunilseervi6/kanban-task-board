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

  const moveTask = (id, direction) => {
    setTasks((prevTasks) =>
      prevTasks.map((t) => {
        if (t.id !== id) return t;
        const currentIndex = COLUMNS.findIndex((col) => col.id === t.column);
        if (currentIndex === -1) return t;

        let nextIndex = currentIndex;
        if (direction === 'prev' && currentIndex > 0) {
          nextIndex = currentIndex - 1;
        } else if (direction === 'next' && currentIndex < COLUMNS.length - 1) {
          nextIndex = currentIndex + 1;
        }

        return { ...t, column: COLUMNS[nextIndex].id };
      })
    );
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
            onMoveTask={moveTask}
          />
        ))}
      </div>
    </div>
  );
}

export default Board;