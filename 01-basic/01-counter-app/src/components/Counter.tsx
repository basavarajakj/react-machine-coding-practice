import { useEffect, useState } from 'react';

const Counter = () => {
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(1);
  const [auto, setAuto] = useState(false);
  const [history, setHistory] = useState<number[]>([]);

  const increment = () => setCount((prev) => prev + step);
  const decrement = () => setCount((prev) => Math.max(prev - step, 0));
  const reset = () => setCount(0);

  // Auto update counter
  useEffect(() => {
    if (!auto) return;

    const id = setInterval(() => {
      setCount((prev) => prev + step);
    }, 1000);

    return () => clearInterval(id);
  }, [auto, step]);

  // Update history whenever count changes
  useEffect(() => {
    setHistory((prev) => {
      const updated = [...prev, count];
      return updated.slice(-5); // keep last 5
    });
  }, [count]);

  return (
    <section className='bg-white p-6 rounded-xl shadow-md w-150 text-center'>
      <h1 className='text-3xl font-bold mb-4'>Counter App</h1>

      <div className='text-4xl font-bold mb-4'>{count}</div>

      <input
        type='text'
        min={0}
        max={10}
        value={step}
        onChange={(e) => setStep(Number(e.target.value))}
        className='border px-2 py-1 rounded w-20 text-center mb-5 text-lg'
      />

      <div className='flex justify-center gap-3'>
        <button
          onClick={increment}
          className='cursor-pointer px-4 py-2 bg-gray-300 rounded'
        >
          Increment
        </button>
        <button
          onClick={reset}
          className='cursor-pointer px-4 py-2 bg-gray-300 rounded'
        >
          Reset
        </button>
        <button
          onClick={decrement}
          className='cursor-pointer px-4 py-2 bg-gray-300 rounded'
        >
          Decrement
        </button>

        <button
          onClick={() => setAuto((prev) => !prev)}
          className='cursor-pointer px-4 py-2 bg-teal-500 rounded'
        >
          {auto ? 'Stop Auto Mode' : 'Start Auto Mode'}
        </button>
      </div>
      {/* History tracking */}
      <div className='mt-4 text-center'>
        <p className='font-medium'>History:</p>
        <ul className='text-sm text-gray-600'>
          {history.map((h, index) => (
            <li key={index}>Value: {h}</li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Counter;
