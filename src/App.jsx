import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './components/HomePage'
import DetailPage from './components/DetailPage'
import './App.css'

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/image/:id" element={<DetailPage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
