import { useState } from 'react';
import { Button, CircularProgress } from '@mui/material';
import axios from 'axios';

export default function Profile() {
  
    const [loaidng, setLoading] = useState<boolean>(false);
    const [result, setResult] = useState<string | null>(null); 

    const handleClick = async () => {
        setLoading(true);
        setResult(null);

        try {
            const res = await axios.get('/books');
            setResult(`後端回傳：${JSON.stringify(res.data, null, 2)}`);
        } catch (err) {
            setResult(`錯誤`);
        } finally {
            setLoading(false);
        }
    };

    const handleReset = async () => {
        setResult(null);
    };

  return (
    <div style={{ padding: '1rem' }}>
        <h2>Profile Page</h2>
        <p>This is your profile.</p>

        <Button
            variant='contained'
            onClick={handleClick}
            disabled={loaidng}
            startIcon={loaidng && <CircularProgress size={20}/>}
        >
            {loaidng ? 'Loading...' : '取得資料'}
        </Button>
        <Button
            variant='contained'
            onClick={handleReset}
            disabled={loaidng}
            startIcon={loaidng && <CircularProgress size={20}/>}
            style={{ marginLeft: '1rem' }}
        >
            {loaidng ? 'Loading...' : '取得資料'}
        </Button>
        {result && <pre style={{ marginTop: '1rem'}}>{result}</pre>}

    </div>
  );
}
