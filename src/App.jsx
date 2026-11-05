
import {
  BrowserRouter,
  Routes,
  Route,
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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Homepage */}
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/dashboard" element={<Home />} />

        {/* Authentication */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Other pages */}
        <Route path="/terms-and-conditions" element={<TermsAndCondition />} />
        <Route path="/team" element={<Team />} />
        <Route path="/my-team" element={<MyTeam />} />
        <Route path="/product" element={<Product />} />
        <Route path="/income" element={<Income />} />
        <Route path="/mine" element={<Mine />} />
        <Route path="/support" element={<Support />} />
        <Route path="/notifications" element={<Notifications />} />

        {/* Fallback */}
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
