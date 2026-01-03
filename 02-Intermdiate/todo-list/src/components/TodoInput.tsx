import { useState } from 'react';

interface TodoInputProps {
  onAdd: (text: string) => void;
}
const TodoInput = ({ onAdd }: TodoInputProps) => {
  const [value, setValue] = useState<string>('');

  const handleAdd = () => {
    if (!value.trim()) return;

    onAdd(value);
    setValue('');
  };
  return (
    <div className='flex gap-2 mb-4'>
      <input
        type='text'
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
        className='flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent'
      />

      <button
        onClick={handleAdd}
        className='px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition'
      >
        Add
      </button>
    </div>
  );
};

export default TodoInput;
