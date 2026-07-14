import { useTheme } from '../../context/ThemeContext';
import styles from './Header.module.css';

function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className={styles.header}>
      <h1 className={styles.title}>Kanban Task Board</h1>
      <button onClick={toggleTheme} className={styles.themeToggle}>
        {theme === 'light' ? '🌙' : '☀️'}
      </button>
    </header>
  );
}

export default Header;
