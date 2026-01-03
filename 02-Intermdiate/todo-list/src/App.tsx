// const FILTERS = {
//   ALL: 'all',
//   ACTIVE: 'active',
//   COMPLETED: 'completed',

import { useCallback, useEffect, useState } from 'react';
import TodoInput from './components/TodoInput';
import TodoList, { type Todo } from './components/TodoList';

// };
function App() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const stored = localStorage.getItem('todos');

    return stored ? (JSON.parse(stored) as Todo[]) : [];
  });

  // Persist todos to localstorage
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  // Add Todo
  const addTodo = useCallback((text: string) => {
    setTodos((prev) => [...prev, { id: Date.now(), text, completed: false }]);
  }, []);

  return (
    <div className='min-h-screen bg-linear-to-br from-indigo-100 to-purple-100 flex items-center justify-center p-4'>
      <div className='w-full max-w-md bg-white rounded-2xl shadow-2xl p-6'>
        <h1 className='text-2xl font-bold text-center text-indigo-600 mb-4'>
          TODO APP
        </h1>

        <TodoInput onAdd={addTodo} />

        <TodoList
          todos={todos}
          // onToggle={}
        />
      </div>
    </div>
  );
}

export default App;
