import { Layout, Menu } from 'antd'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import RegisterInfo from './pages/RegisterInfo'
import Alarm from './pages/Alarm'
import Isolation from './pages/Isolation'
import Home from "./pages/Home";
import ToolList from './pages/ToolList'
import ToolInfo from './pages/ToolInfo'
import Detail from './pages/Detail'
import Playground from './pages/Playground'
import Test from './pages/Test'

const { Header, Content, Footer } = Layout

function App() {
  return (
    <Router>
      <Layout style={{ minHeight: '100vh', width: '100vw' }}>
        <Header style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ color: '#fff', fontSize: 20, marginRight: 20 }}>LSC Web</div>
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['home']}
            style={{ flex: 1, minWidth: 0 }}
            items={[
              {
                key: 'home',
                label: <Link to="/home">Home</Link>,
              },
              {
                key: 'registerinfo',
                label: <Link to="/registerinfo">RegisterInfo</Link>,
              },
              {
                key: 'alarm',
                label: <Link to="/alarm">Alarm</Link>,
              },
              {
                key: 'isolation',
                label: <Link to="/isolation">Isolation</Link>,
              },
              {
                key: 'playground',
                label: <Link to="/playground">Playground</Link>,
              },
              {
                key: 'test',
                label: <Link to="/test">Test</Link>,
              },
            ]}
          />
        </Header>

        <Content style={{ padding: '10px' }}>
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/registerinfo" element={<RegisterInfo />} />
            <Route path="/alarm" element={<Alarm />} />
            <Route path="/isolation" element={<Isolation />} />
            <Route path="/:kind/:brand/:status" element={<ToolList />} />
            <Route path="/:kind/:brand" element={<ToolList />} />
            <Route path="/:kind/:brand/:status/:toolId" element={<ToolInfo />} />
            <Route path="/:kind/:brand/:status/:toolId/:chamber/Detail" element={<Detail />} />
            <Route path="/playground" element={<Playground />} />
            <Route path="/test" element={<Test />} />
          </Routes>
        </Content>

        <Footer style={{ textAlign: 'center' }}>©2025 Created by FSID</Footer>
      </Layout>
    </Router>
  )
}

export default App
