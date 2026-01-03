import type { Todo } from './TodoList';

interface TodoItemProps {
  todo: Todo;
  // onToggle: (id: number) => void;
}
const TodoItem = ({ todo }: TodoItemProps) => {
  return (
    <li className='flex items-center gap-2 p-3 bg-gray-50 rounded-lg shadow-sm'>
      <input
        type='checkbox'
        checked={todo.completed}
        className='h-4 w-4 accent-indigo-500'
      />
      <span
        className={`flex-1 ${
          todo.completed ? 'line-through text-gray-600' : 'text-gray-700'
        }`}
      >
        {todo.text}
      </span>
    </li>
  );
};

export default TodoItem;
