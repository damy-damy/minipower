
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Copy,
  Check,
  Crown,
  ArrowDownToLine,
  ArrowUpFromLine,
  Headset,
  CreditCard,
  History,
  ChevronRight,
  Settings,
  LogOut,
  X,
} from 'lucide-react'

import BottomNavbar from '../components/BottomNavbar'
import { USER_PROFILE } from '../data/sampleData'

export default function Mine() {
  const [copied, setCopied] = useState('')
  const [showLogout, setShowLogout] = useState(false)

  const navigate = useNavigate()

  const userId =
    USER_PROFILE.userId || USER_PROFILE.id || USER_PROFILE.username

  const invitationCode = USER_PROFILE.referralCode || 'Not available'

  const electronicBalance = USER_PROFILE.accountBalance ?? 0
  const flexibleBalance = USER_PROFILE.rechargeBalance ?? 0

  const copyText = async (value, type) => {
    try {
      await navigator.clipboard.writeText(String(value))
      setCopied(type)

      setTimeout(() => setCopied(''), 1500)
    } catch {
      setCopied('')
    }
  }

  const handleSignOut = () => {
    setShowLogout(false)
    navigate('/login')
  }

  const menuItems = [
    { name: 'Customer Service', icon: Headset, path: '/support' },
    { name: 'Bind Bank Card', icon: CreditCard, path: '/bind-bank' },
    { name: 'Recharge Record', icon: History, path: '/recharge-record' },
    { name: 'Withdrawal Record', icon: History, path: '/withdrawal-record' },
    { name: 'Other Services', icon: Settings, path: '/settings' },
  ]

  return (
    <div className="min-h-screen bg-[#f0fdf4] text-gray-800 pb-28">

      <div className="max-w-md mx-auto px-5 pt-7">

        {/* Profile */}
        <div className="flex items-center gap-3 mb-7">

          <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-green-200 bg-green-50 flex items-center justify-center shrink-0">
            <img
              src="/mini.png"
              alt="MiniPower Logo"
              className="w-full h-full object-contain p-2"
            />
          </div>

          <div className="flex-1 min-w-0">
            <h1 className="text-xl font-bold text-gray-900 truncate">
              {USER_PROFILE.name}
            </h1>

            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs text-gray-500">
                User ID: {userId}
              </span>

              <button
                type="button"
                onClick={() => copyText(userId, 'id')}
                className="text-green-700"
              >
                {copied === 'id' ? <Check size={14} /> : <Copy size={14} />}
              </button>
            </div>

            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs text-gray-500">
                Invitation Code: {invitationCode}
              </span>

              <button
                type="button"
                onClick={() => copyText(invitationCode, 'invite')}
                className="text-green-700"
              >
                {copied === 'invite' ? <Check size={14} /> : <Copy size={14} />}
              </button>
            </div>
          </div>

          <div className="flex items-center gap-1 bg-green-50 border border-green-200 rounded-full px-3 py-1.5">
            <Crown size={14} className="text-green-700" />
            <span className="text-xs font-bold text-green-700">VIP</span>
          </div>
        </div>

        {/* Wallet Heading */}
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-bold text-gray-900">My Wallets</h2>
          <span className="text-xs text-green-700 font-medium">NGN (₦)</span>
        </div>

        {/* Wallets */}
        <div className="grid grid-cols-2 gap-3 mb-5">

          <div className="bg-white rounded-2xl p-4 border border-green-100 shadow-sm min-w-0">
            <p className="text-xs font-semibold text-gray-600">
              Deposit Balance
            </p>

            <p className="text-lg font-bold text-green-800 mt-3 break-words">
              ₦{Number(electronicBalance).toLocaleString('en-NG')}
            </p>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-green-100 shadow-sm min-w-0">
            <p className="text-xs font-semibold text-gray-600">
              Withdrawal Balance
            </p>

            <p className="text-lg font-bold text-green-800 mt-3 break-words">
              ₦{Number(flexibleBalance).toLocaleString('en-NG')}
            </p>
          </div>

        </div>

        {/* Deposit and Withdraw */}
        <div className="grid grid-cols-2 gap-3 mb-6">

          <button
            type="button"
            className="h-14 rounded-xl bg-gradient-to-r from-green-600 to-green-300 text-white font-bold flex items-center justify-center gap-2 shadow-md shadow-green-200"
          >
            <ArrowDownToLine size={19} />
            Deposit
          </button>

          <button
            type="button"
            className="h-14 rounded-xl border-2 border-green-600 text-green-700 font-bold flex items-center justify-center gap-2 bg-white hover:bg-green-50 transition"
          >
            <ArrowUpFromLine size={19} />
            Withdraw
          </button>

        </div>

        {/* Account Menu */}
        <div className="bg-white rounded-2xl shadow-sm border border-green-100 overflow-hidden">

          {menuItems.map((item, index) => {
            const Icon = item.icon

            return (
              <Link
                to={item.path}
                key={item.name}
                className={`flex items-center justify-between px-4 py-4 hover:bg-green-50 transition ${index !== menuItems.length - 1
                    ? 'border-b border-gray-100'
                    : ''
                  }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-green-50 flex items-center justify-center">
                    <Icon size={19} className="text-green-700" />
                  </div>

                  <span className="text-sm font-semibold text-gray-700">
                    {item.name}
                  </span>
                </div>

                <ChevronRight size={18} className="text-gray-400" />
              </Link>
            )
          })}

        </div>

        {/* Sign Out */}
        <button
          type="button"
          onClick={() => setShowLogout(true)}
          className="w-full mt-5 h-12 rounded-xl bg-white border border-red-100 text-red-600 font-bold flex items-center justify-center gap-2 hover:bg-red-50 transition"
        >
          <LogOut size={18} />
          Sign Out
        </button>

        <p className="text-center text-[10px] text-gray-400 mt-5">
          Wallet balances shown are demo values.
        </p>

      </div>

      {/* Sign Out Confirmation */}
      {showLogout && (
        <div className="fixed inset-0 z-[100] bg-black/50 flex items-center justify-center px-5">

          <div className="w-full max-w-sm bg-white rounded-2xl p-6 shadow-2xl">

            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setShowLogout(false)}
                className="text-gray-400 hover:text-gray-700"
              >
                <X size={21} />
              </button>
            </div>

            <div className="w-14 h-14 rounded-full bg-red-50 text-red-600 flex items-center justify-center mx-auto">
              <LogOut size={25} />
            </div>

            <h2 className="text-lg font-bold text-gray-900 text-center mt-4">
              Sign Out?
            </h2>

            <p className="text-sm text-gray-500 text-center mt-2">
              Are you sure you want to sign out of your MiniPower account?
            </p>

            <div className="grid grid-cols-2 gap-3 mt-6">

              <button
                type="button"
                onClick={() => setShowLogout(false)}
                className="h-11 rounded-xl border border-gray-200 text-gray-700 font-semibold"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleSignOut}
                className="h-11 rounded-xl bg-red-600 text-white font-semibold hover:bg-red-700 transition"
              >
                Sign Out
              </button>

            </div>

          </div>
        </div>
      )}

      <BottomNavbar />

    </div>
  )
}
