import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Template from './pages/Template';
import Library from './pages/Library';
import Drive from './pages/Drive';
import UI from './pages/UI';
import StockPage from './pages/Stock';
import Dropdown from './pages/Dropdown';
import Todolist from './pages/Todolist';

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/template" element={<Template />} />
        <Route path="/library" element={<Library />} />
        <Route path="/Drive" element={<Drive />} />
        <Route path="/UI" element={<UI />} />
        <Route path="/Stock" element={<StockPage />} />
        <Route path="/Dropdown" element={<Dropdown />} />
        <Route path="/Todolist" element={<Todolist />} />
      </Routes>
    </Router>
  );
}
