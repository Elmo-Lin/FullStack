import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Count from './pages/Count';
import Template from './pages/Template';
import Library from './pages/Library';
import Drive from './pages/Drive';
import UI from './pages/UI';
import StockPage from './pages/Stock';
import Dropdown from './pages/Dropdown';
import Todolist from './pages/Todolist';
import Notion from './pages/Notion';
import Home from './pages/Home';

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/count" element={<Count />} />
        <Route path="/template" element={<Template />} />
        <Route path="/library" element={<Library />} />
        <Route path="/Drive" element={<Drive />} />
        <Route path="/UI" element={<UI />} />
        <Route path="/Stock" element={<StockPage />} />
        <Route path="/Dropdown" element={<Dropdown />} />
        <Route path="/Todolist" element={<Todolist />} />
        <Route path="/Notion" element={<Notion />} />
      </Routes>
    </Router>
  );
}
