import { Link } from 'react-router-dom'
import { Bell, User, Zap } from 'lucide-react'

export default function TopNavbar({ onNotificationClick, unreadCount = 2 }) {
  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-emerald-100/80 shadow-xs">
      <div className="max-w-md mx-auto px-4 py-2.5 sm:px-5 flex items-center justify-between">
        {/* Brand & Logo */}
        <Link to="/" className="flex items-center gap-2.5 group select-none">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-700 via-emerald-600 to-green-500 flex items-center justify-center text-white shadow-md shadow-emerald-600/20 group-hover:scale-105 transition-transform duration-200">
            <Zap size={22} className="fill-white/20 stroke-white" strokeWidth={2.4} />
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-lg text-emerald-950 tracking-tight leading-tight">
                Nova Power
              </span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 leading-none">
                VIP
              </span>
            </div>
            <span className="text-[10px] text-emerald-700/80 font-medium tracking-wider uppercase">
              Invest • Grow • Prosper
            </span>
          </div>
        </Link>

        {/* Right side: Notifications & Profile */}
        <div className="flex items-center gap-2">
          {/* Notification bell */}
          <Link
            to="/notifications"
            onClick={onNotificationClick}
            aria-label="View notifications"
            className="w-9 h-9 rounded-xl border border-emerald-100 bg-emerald-50/60 hover:bg-emerald-100/70 text-emerald-800 flex items-center justify-center transition-all duration-150 active:scale-95 relative"
          >
            <Bell size={18} strokeWidth={2} />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-white animate-pulse" />
            )}
          </Link>

          {/* User profile avatar */}
          <Link
            to="/mine"
            aria-label="User Profile"
            className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-800 to-green-700 hover:from-emerald-900 hover:to-green-800 text-white flex items-center justify-center shadow-xs transition-all duration-150 active:scale-95"
          >
            <User size={18} strokeWidth={2.2} />
          </Link>
        </div>
      </div>
    </header>
  )
}

