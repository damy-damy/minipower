import { Link } from 'react-router-dom'
import { ChevronLeft, Gift, Sparkles, CheckCircle2 } from 'lucide-react'

export default function Notifications() {
  const notifications = [
    {
      id: 1,
      title: 'Welcome to Nova Power Platform!',
      desc: 'Congratulations on joining Nova Power. Complete your first solar share investment to begin earning daily returns.',
      time: '10 mins ago',
      icon: Sparkles,
      unread: true,
    },
    {
      id: 2,
      title: 'Exclusive Promo Code Available',
      desc: 'Use promo code NOVA2026 under Redeem Coupon to claim a ₦1,500 demo investor starter gift.',
      time: '2 hours ago',
      icon: Gift,
      unread: true,
    },
    {
      id: 3,
      title: 'Daily Yield Accounting Completed',
      desc: 'All active project dividends for today have been computed and settled to accounts.',
      time: 'Yesterday',
      icon: CheckCircle2,
      unread: false,
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50/40 via-white to-emerald-50/30 text-gray-900 pb-16">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-emerald-100/80 px-4 py-3">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <Link
            to="/"
            className="w-9 h-9 rounded-xl border border-emerald-100 bg-emerald-50/60 text-emerald-800 flex items-center justify-center active:scale-95 transition-all"
          >
            <ChevronLeft size={20} />
          </Link>
          <h1 className="text-base font-bold text-emerald-950">Notifications & News</h1>
          <div className="w-9" />
        </div>
      </header>

      {/* List */}
      <main className="max-w-md mx-auto px-4 pt-4 space-y-3">
        {notifications.map((n) => {
          const Icon = n.icon
          return (
            <div
              key={n.id}
              className={`p-4 rounded-2xl border transition-all ${
                n.unread
                  ? 'bg-white border-emerald-200 shadow-sm'
                  : 'bg-gray-50/80 border-gray-100 text-gray-500'
              }`}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                    n.unread ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  <Icon size={18} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h2 className="text-xs sm:text-sm font-bold text-gray-900 leading-tight">
                      {n.title}
                    </h2>
                    {n.unread && (
                      <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0 ml-2" />
                    )}
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed mb-1.5">{n.desc}</p>
                  <span className="text-[10px] text-gray-400 font-mono">{n.time}</span>
                </div>
              </div>
            </div>
          )
        })}
      </main>
    </div>
  )
}
