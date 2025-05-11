import { useState } from 'react';
import { Button } from '@mui/material';

export default function Home() {
  const [count, setCount] = useState<number>(0);

  const handleClick = (): void => {
    setCount(prev => prev + 1);
  };

  const handleReset = (): void => {
    setCount(0);
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Welcome to the Home Page</h2>
      <p>You've clicked {count} times.</p>
      <div style={{ display: 'flex', gap: '8px' }}>
        <Button variant='contained' onClick={handleClick}>{'Click me'}</Button>
        <Button variant='contained' onClick={handleReset}>{'Reset'}</Button>
      </div>
    </div>
  );
}
