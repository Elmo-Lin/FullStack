import React, { useEffect, useState, useRef } from 'react';
import keycloak from './keycloak';

const Home: React.FC = () => {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const [roles, setRoles] = useState<string[]>([]);
  const [message, setMessage] = useState<string | null>(null);
  const initRef = useRef(false);

  useEffect(() => {
    if (initRef.current) return;
    initRef.current = true;

    keycloak
      .init({ onLoad: 'login-required' })
      .then((auth: boolean) => {
        setAuthenticated(auth);
        if (auth) {
          const userRoles =
            keycloak.tokenParsed?.resource_access?.['react-client']?.roles || [];
          setRoles(userRoles);
        }
      })
      .catch((err: unknown) => {
        console.error('Keycloak init failed', err);
        setAuthenticated(false);
      });
  }, []);

  const handleAdminClick = () => {
    if (roles.includes('admin')) {
      setMessage('Hello');
    } else {
      setMessage('403 Forbidden: 你沒有權限執行此動作');
    }
  };

  const callHelloApi = async () => {
    if (!keycloak.token) {
      setMessage('Token 不見了，請重新登入');
      return;
    }
    try {
      const res = await fetch('/hello', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${keycloak.token}`,
          Accept: 'text/plain',
        },
      });
      if (!res.ok) {
        throw new Error(`${res.status} ${res.statusText}`);
      }
      const text = await res.text();
      setMessage(`API 回傳：${text}`);
    } catch (err: unknown) {
      console.error(err);
      if (err instanceof Error) {
        setMessage(`呼叫 API 失敗：${err.message}`);
      } else {
        setMessage('呼叫 API 失敗：未知錯誤');
      }
    }
  };

  if (authenticated === null) {
    return <div>Loading...</div>;
  }
  if (authenticated === false) {
    return <div>登入失敗或未授權</div>;
  }

  return (
    <div style={{ padding: '1rem' }}>
      <h1>React + Keycloak Demo</h1>
      <p>Hello, {keycloak.tokenParsed?.preferred_username}</p>
      <p>Roles: {roles.join(', ')}</p>

      {roles.includes('admin') && (
        <div>
          <h2>Admin Panel</h2>
          <p>只有 admin 看得到</p>
        </div>
      )}
      {roles.includes('user') && (
        <div>
          <h2>User Panel</h2>
          <p>只有 user 看得到</p>
        </div>
      )}

      <button onClick={handleAdminClick}>Admin Action</button>

      <button onClick={callHelloApi} style={{ marginLeft: '0.5rem' }}>
        呼叫 /hello API
      </button>

      {message && (
        <div
          style={{
            marginTop: '1rem',
            border: '1px solid #ccc',
            padding: '0.5rem',
          }}
        >
          {message}
        </div>
      )}

      <button onClick={() => keycloak.logout()}>Logout</button>
    </div>
  );
};

export default Home;
