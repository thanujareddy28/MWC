import { Routes, Route } from 'react-router-dom'
import Welcome from './pages/Welcome.jsx'
import Signup from './pages/Signup.jsx'
import Login from './pages/Login.jsx'

function Dashboard() {
  return (
    <div className="min-h-screen bg-mwc-sand flex items-center justify-center">
      <h1 className="text-2xl font-medium text-mwc-forest">Dashboard coming soon 🌿</h1>
    </div>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  )
}

export default App