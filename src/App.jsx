import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom'
import HomePage from './components/HomePage'
import DetailPage from './components/DetailPage'
import BatchUploader from './components/BatchUploader'
import './App.css'

function App() {
  console.log('App component rendered')
  return (
    <Router>
      <div className="App">
        <nav className="app-nav">
          <Link to="/" className="nav-link">图片画廊</Link>
          <Link to="/batch-upload" className="nav-link">批量上传</Link>
        </nav>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/image/:id" element={<DetailPage />} />
          <Route path="/batch-upload" element={<BatchUploader />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
