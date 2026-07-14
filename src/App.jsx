import Board from './components/Board/Board';
import Header from './components/Header/Header';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <div className="app-container">
        <Header />
        <main style={{ padding: '2rem' }}>
          <Board />
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;