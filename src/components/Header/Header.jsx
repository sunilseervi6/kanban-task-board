import styles from './Header.module.css';

function Header() {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>Kanban Task Board</h1>
    </header>
  );
}

export default Header;
