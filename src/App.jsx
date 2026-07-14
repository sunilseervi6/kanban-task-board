import Board from './components/Board/Board';
import Header from './components/Header/Header';


function App() {
  return (
    <div className="app-container">
      <Header />
      <main style={{ padding: '2rem' }}>
        <Board />
      </main>
    </div>
  );
}

export default App;