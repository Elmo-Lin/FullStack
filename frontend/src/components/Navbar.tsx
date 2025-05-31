import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav style={{ padding: '1rem', borderBottom: '1px solid #ccc' }}>
      <Link to="/" style={{ marginRight: '1rem' }}>Home</Link>
      <Link to="/count" style={{ marginRight: '1rem' }}>Count</Link>
      <Link to="/template" style={{ marginRight: '1rem' }}>Template</Link>
      <Link to="/library" style={{ marginRight: '1rem' }}>Library</Link>
      <Link to="/drive" style={{ marginRight: '1rem' }}>Drive</Link>
      <Link to="/ui" style={{ marginRight: '1rem' }}>UI</Link>
      <Link to="/stock" style={{ marginRight: '1rem' }}>Stock</Link>
      <Link to="/dropdown" style={{ marginRight: '1rem' }}>Dropdown</Link>
      <Link to="/todolist" style={{ marginRight: '1rem' }}>Todolist</Link>
      <Link to="/notion" style={{ marginRight: '1rem' }}>Notion</Link>
    </nav>
  );
}
