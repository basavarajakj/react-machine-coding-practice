import TodoItem from './TodoItem';

export interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface TodoListProp {
  todos: Todo[];
  // onToggle: (id: number) => void;
}
const TodoList = ({ todos }: TodoListProp) => {
  if (todos.length === 0) {
    return <p className='text-center text-gray-600 my-6'>No Todos found.</p>;
  }
  return (
    <div className=''>
      <ul className='space-y-2 mb-4'>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            // onToggle={onToggle}
          />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
