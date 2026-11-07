
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Copy,
  Check,
  Crown,
  ArrowDownToLine,
  ArrowUpFromLine,
  Package,
  ShieldCheck,
  Gift,
  Users,
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
    { name: 'My Order', icon: Package, path: '/my-orders' },
    { name: 'Deposit Record', icon: ArrowDownToLine, path: '/deposit-record' },
    { name: 'Withdrawal Record', icon: ArrowUpFromLine, path: '/withdrawal-record' },
    { name: 'Security Center', icon: ShieldCheck, path: '/security' },
    { name: 'Activities', icon: Gift, path: '/activities' },
    { name: 'Team Management', icon: Users, path: '/team' },
  ]

  return (
    <div className="min-h-screen bg-[#f0fdf4] text-gray-800 pb-28">

      <div className="max-w-md mx-auto px-5 pt-7">

        {/* Profile Section - Gradient Design */}
        <div className="relative mb-7 overflow-hidden rounded-2xl bg-gradient-to-br from-green-700 via-emerald-600 to-green-400 p-4 text-white shadow-lg shadow-green-200/60 animate-in fade-in slide-in-from-top-3 duration-700">

          {/* Decorative Gradient Orbs */}
          <div className="absolute -right-8 -top-10 h-32 w-32 rounded-full bg-white/10 blur-2xl animate-pulse" />
          <div className="absolute -bottom-12 left-20 h-28 w-28 rounded-full bg-lime-200/20 blur-2xl" />

          <div className="relative flex items-center gap-3">

            {/* Logo */}
            <div className="h-16 w-16 shrink-0 overflow-hidden rounded-2xl border border-white/30 bg-white/15 p-2 backdrop-blur-sm">
              <img
                src="/mini.png"
                alt="MiniPower Logo"
                className="h-full w-full object-contain"
              />
            </div>

            {/* Account Details */}
            <div className="min-w-0 flex-1">

              {/* Username and VIP */}
              <div className="mb-2 flex items-center justify-between gap-2">
                <h1 className="truncate text-base font-bold text-white">
                  {USER_PROFILE.name}
                </h1>

                <div className="flex shrink-0 items-center gap-1 rounded-full border border-yellow-200/40 bg-yellow-300/20 px-2.5 py-1 backdrop-blur-sm">
                  <Crown size={13} className="text-yellow-200" />
                  <span className="text-[11px] font-bold text-yellow-100">
                    VIP
                  </span>
                </div>
              </div>

              {/* User ID */}
              <div className="mb-2 flex items-center justify-between gap-2">
                <span className="truncate text-xs text-white/85">
                  User ID: {userId}
                </span>

                <button
                  type="button"
                  onClick={() => copyText(userId, 'id')}
                  className="shrink-0 text-white hover:text-yellow-200 transition"
                >
                  {copied === 'id' ? <Check size={14} /> : <Copy size={14} />}
                </button>
              </div>

              {/* Invitation Code */}
              <div className="flex items-center justify-between gap-2">
                <span className="truncate text-xs text-white/85">
                  Invitation Code: {invitationCode}
                </span>

                <button
                  type="button"
                  onClick={() => copyText(invitationCode, 'invite')}
                  className="shrink-0 text-white hover:text-yellow-200 transition"
                >
                  {copied === 'invite' ? <Check size={14} /> : <Copy size={14} />}
                </button>
              </div>

            </div>
          </div>
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

        {/* Account Menu - Six Cards */}
        <div className="grid grid-cols-3 gap-3">

          {menuItems.map((item) => {
            const Icon = item.icon

            return (
              <Link
                to={item.path}
                key={item.name}
                className="min-h-[110px] bg-white rounded-3xl border border-green-100 shadow-sm flex flex-col items-center justify-center gap-3 p-1 hover:bg-green-50 hover:shadow-md transition-all active:scale-95"
              >
                <div className="w-12 h-12 rounded-2xl bg-green-50 flex items-center justify-center">
                  <Icon
                    size={29}
                    strokeWidth={1.8}
                    className="text-green-600"
                  />
                </div>

                <span className="text-xs font-bold text-gray-700 text-center leading-tight">
                  {item.name}
                </span>
              </Link>
            )
          })}

        </div>



      </div>


      <BottomNavbar />

    </div>
  )
}
