import styles from './Card.module.css';

function Card({ task }) {
  return (
    <div className={styles.card}>
      <h3 className={styles.taskTitle}>{task.title}</h3>
      <p className={styles.taskDescription}>{task.description}</p>
      <div className={styles.actions}>
        <button className={styles.btn}>← Move</button>
        <button className={`${styles.btn} ${styles.btnDelete}`}>Delete</button>
        <button className={styles.btn}>Move →</button>
      </div>
    </div>
  );
}

export default Card;
