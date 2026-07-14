import Board from './components/Board/Board';
import TaskForm from './components/TaskForm/TaskForm';
import Header from './components/Header/Header';

// Static hardcoded tasks representing our future state layout
const MOCK_TASKS = [
  { id: '1', title: 'Learn React Context', description: 'Deep dive into providers and consumers.', status: 'todo' },
  { id: '2', title: 'Setup Kanban Skeleton', description: 'Build components, CSS modules, and layout layout layout.', status: 'in-progress' },
  { id: '3', title: 'Perfect Immutable Updates', description: 'Mastering .map() and .filter() array methods.', status: 'done' },
  { id: '4', title: 'Drink Water', description: 'Hydration is essential for debugging.', status: 'todo' }
];

function App() {
  return (
    <div className="app-container">
      <Header />
      <main style={{ padding: '2rem' }}>
        <TaskForm />
        {/* Pass the mock array down strictly to verify layout rendering */}
        <Board tasks={MOCK_TASKS} />
      </main>
    </div>
  );
}

export default App;