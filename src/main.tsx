import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './styles/index.css'
import Initial from './pages/Initial'
import Login from './pages/Login'
import Register from './pages/Register'
import Todos from './pages/Todos'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Initial />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/todos" element={<Todos />} />
      </Routes>
    </Router>
  </StrictMode>,
)
