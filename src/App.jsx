import { useEffect } from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Team from './pages/Team'
import Product from './pages/Product'
import Income from './pages/Income'
import Mine from './pages/Mine'
import Support from './pages/Support'
import Notifications from './pages/Notifications'
import TermsAndCondition from './pages/termsAndCondition'
import MyTeam from './pages/MyTeam'


function AppContent() {
  const navigate = useNavigate()
  const location = useLocation()

  // Seamless navigation interceptor:
  // Allows existing Login page's href="#register" to navigate to /register without altering Login.jsx
  useEffect(() => {
    const handleCaptureClick = (e) => {
      const registerAnchor = e.target.closest('a[href="#register"]')
      if (registerAnchor) {
        e.preventDefault()
        e.stopPropagation()
        navigate('/register')
        return
      }

      const loginAnchor = e.target.closest('a[href="#login"]')
      if (loginAnchor) {
        e.preventDefault()
        e.stopPropagation()
        navigate('/login')
        return
      }
    }

    document.addEventListener('click', handleCaptureClick, true)
    return () => document.removeEventListener('click', handleCaptureClick, true)
  }, [navigate])

  // Synchronize with hash if user accesses #register or #login
  useEffect(() => {
    if (window.location.hash === '#register' && location.pathname !== '/register') {
      navigate('/register')
    } else if (window.location.hash === '#login' && location.pathname !== '/login') {
      navigate('/login')
    }
  }, [location, navigate])

  return (
    <Routes>
      {/* Nova Power Investment Dashboard */}
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/dashboard" element={<Home />} />

      {/* Auth routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/terms-and-conditions" element={<TermsAndCondition />} />

      {/* Main app tab routes */}
      <Route path="/team" element={<Team />} />
      <Route path="/my-team" element={<MyTeam />} />
      <Route path="/product" element={<Product />} />
      <Route path="/income" element={<Income />} />
      <Route path="/mine" element={<Mine />} />

      {/* Action and auxiliary routes */}
      <Route path="/support" element={<Support />} />
      <Route path="/notifications" element={<Notifications />} />

      {/* Fallback route */}
      <Route path="*" element={<Home />} />
    </Routes>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}

export default App
