import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Headphones,
  Link2,
  Wallet,
  Gift,
  Volume2,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
  X,
} from 'lucide-react'

import BottomNavbar from '../components/BottomNavbar'
import DashboardCard from '../components/DashboardCard'
import Notification from '../components/notificationCom'
import { USER_PROFILE, DEMO_ACTIVITIES } from '../data/sampleData'

export default function Home() {
  const navigate = useNavigate()

  // State for interactive modals and toasts
  const [toastMessage, setToastMessage] = useState('')
  const [showCouponModal, setShowCouponModal] = useState(false)
  const [showAboutModal, setShowAboutModal] = useState(false)

  // Demo coupon state
  const [couponCode, setCouponCode] = useState('')
  const [couponFeedback, setCouponFeedback] = useState(null)

  // Copy Referral Link action
  const handleCopyLink = async () => {
    const inviteLink = USER_PROFILE.referralLink

    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(inviteLink)
      } else {
        const textarea = document.createElement('textarea')
        textarea.value = inviteLink
        document.body.appendChild(textarea)
        textarea.select()
        document.execCommand('copy')
        document.body.removeChild(textarea)
      }

      setToastMessage('Referral link copied to clipboard!')
      setTimeout(() => setToastMessage(''), 3000)
    } catch {
      setToastMessage('Link copied: ' + inviteLink)
      setTimeout(() => setToastMessage(''), 3500)
    }
  }

  // Handle Coupon submission
  const handleRedeemCoupon = (e) => {
    e.preventDefault()

    if (!couponCode.trim()) {
      setCouponFeedback({
        type: 'error',
        message: 'Please enter a coupon code.',
      })
      return
    }

    const code = couponCode.trim().toUpperCase()

    if (
      code === 'NOVA2026' ||
      code === 'WELCOME100' ||
      code === 'GREEN'
    ) {
      setCouponFeedback({
        type: 'success',
        message: `Success! Coupon "${code}" redeemed for ₦1,500 demo bonus.`,
      })

      setTimeout(() => {
        setCouponCode('')
      }, 2000)
    } else {
      setCouponFeedback({
        type: 'error',
        message: 'Invalid or expired code. Try using demo code: NOVA2026',
      })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-emerald-50/30 text-gray-900 pb-28">

      {/* Toast Notification */}
      <Notification
        message={toastMessage}
        onClose={() => setToastMessage('')}
      />

      {/* Main Container */}
      <main className="max-w-md mx-auto px-4 pt-5 space-y-5">

        {/* Centered MiniPower Header */}
        <header className="flex flex-col items-center justify-center text-center py-3">
          <div className="flex items-center justify-center gap-2">
            <img
              src="/mini.png"
              alt="MiniPower Logo"
              className="w-12 h-12 object-contain"
            />

            <h1 className="text-2xl font-extrabold tracking-tight text-gray-900">
              MiniPower
            </h1>
          </div>

          <p className="text-xs text-gray-500 mt-1">
            Smart Digital Investment
          </p>
        </header>

        {/* 1. User Quick Balance Snapshot */}
        <section
          aria-label="Account Overview"
          className="rounded-2xl bg-white border border-gray-100 p-4 shadow-sm flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center border border-emerald-100">
              <Wallet size={20} />
            </div>

            <div>
              <span className="text-[11px] text-gray-500 block leading-none mb-1">
                Total Asset Balance (Demo)
              </span>

              <span className="text-base sm:text-lg font-bold text-gray-900 font-mono">
                ₦{USER_PROFILE.accountBalance.toLocaleString()}
              </span>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[10px] text-gray-400 block leading-none mb-1">
              Today's Return
            </span>

            <span className="text-xs sm:text-sm font-bold text-emerald-600 font-mono">
              +₦{USER_PROFILE.todayEarnings.toLocaleString()}
            </span>
          </div>
        </section>

        {/* 2. Three Quick-Action Icons */}
        <section aria-label="Quick Actions">
          <div className="flex items-center justify-between mb-3 px-1">
            <h2 className="text-sm font-bold text-gray-900 tracking-tight">
              Quick Services
            </h2>

            <span className="text-[11px] text-gray-400 font-medium">
              3 Services
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
            <DashboardCard
              icon={Headphones}
              title="Customer Service"
              to="/support"
              bgColor="bg-emerald-500/10"
              iconColor="text-emerald-700"
            />

            <DashboardCard
              icon={Link2}
              title="Copy Link"
              onClick={handleCopyLink}
              badge="Share"
              bgColor="bg-teal-500/10"
              iconColor="text-teal-700"
            />

            <DashboardCard
              icon={Gift}
              title="Redeem Coupon"
              onClick={() => setShowCouponModal(true)}
              badge="Bonus"
              bgColor="bg-amber-500/10"
              iconColor="text-amber-700"
            />
          </div>
        </section>

        {/* 3. Scrolling Activity Notification */}
        <section aria-label="Live Activities">
          <div className="relative overflow-hidden rounded-xl bg-white border border-gray-100 px-3 py-2.5 shadow-sm flex items-center gap-2.5">

            <div className="flex items-center gap-1.5 shrink-0 pr-2 border-r border-gray-100">
              <div className="w-6 h-6 rounded-lg bg-emerald-600 text-white flex items-center justify-center">
                <Volume2 size={13} strokeWidth={2.4} />
              </div>

              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">
                Live
              </span>
            </div>

            <div className="overflow-hidden whitespace-nowrap flex-1 relative">
              <div className="animate-ticker text-xs font-medium text-gray-600">

                {DEMO_ACTIVITIES.map((act) => (
                  <span
                    key={`a-${act.id}`}
                    className="inline-flex items-center mr-8"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block mr-2" />
                    {act.text}
                  </span>
                ))}

                {DEMO_ACTIVITIES.map((act) => (
                  <span
                    key={`b-${act.id}`}
                    className="inline-flex items-center mr-8"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block mr-2" />
                    {act.text}
                  </span>
                ))}

              </div>
            </div>
          </div>
        </section>

        {/* 4. About MiniPower */}
        <section aria-label="About MiniPower">
          <div className="rounded-2xl bg-white border border-gray-100 p-5 shadow-sm">

            <div className="flex items-start gap-3.5 mb-3">
              <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                <ShieldCheck size={24} strokeWidth={2} />
              </div>

              <div>
                <h2 className="text-base font-bold text-gray-900 tracking-tight">
                  About MiniPower
                </h2>

                <span className="text-[11px] text-emerald-700 font-medium">
                  Digital Investment Platform
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-4">
              MiniPower is an investment platform designed to provide users
              with an accessible and convenient digital investment experience.
            </p>

            <div className="grid grid-cols-3 gap-2 py-3 mb-4 border-y border-gray-100 text-center">

              <div className="p-1">
                <span className="block text-emerald-700 font-bold text-xs">
                  Simple
                </span>
                <span className="text-[10px] text-gray-500">
                  Experience
                </span>
              </div>

              <div className="p-1 border-x border-gray-100">
                <span className="block text-emerald-700 font-bold text-xs">
                  Secure
                </span>
                <span className="text-[10px] text-gray-500">
                  Accounts
                </span>
              </div>

              <div className="p-1">
                <span className="block text-emerald-700 font-bold text-xs">
                  24/7
                </span>
                <span className="text-[10px] text-gray-500">
                  Accessibility
                </span>
              </div>

            </div>

            <button
              type="button"
              onClick={() => setShowAboutModal(true)}
              className="w-full py-2.5 rounded-xl bg-gray-50 hover:bg-emerald-50 border border-gray-200 hover:border-emerald-200 text-gray-700 hover:text-emerald-800 text-xs sm:text-sm font-semibold transition-all duration-150 active:scale-95 flex items-center justify-center gap-1.5"
            >
              <span>Learn More</span>
              <ArrowRight size={14} />
            </button>

          </div>
        </section>

      </main>

      {/* 5. Modals */}

      {/* Modal: Redeem Coupon */}
      {showCouponModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="w-full max-w-sm rounded-3xl bg-white border border-gray-100 p-5 sm:p-6 shadow-2xl relative">

            <button
              type="button"
              onClick={() => {
                setShowCouponModal(false)
                setCouponFeedback(null)
              }}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              aria-label="Close coupon modal"
            >
              <X size={18} />
            </button>

            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
                <Gift size={20} />
              </div>

              <div>
                <h3 className="text-base font-bold text-gray-900">
                  Redeem Coupon / Red Packet
                </h3>

                <span className="text-[11px] text-gray-400">
                  Enter your gift or bonus code
                </span>
              </div>
            </div>

            <form onSubmit={handleRedeemCoupon} className="space-y-3.5">
              <div>
                <label
                  htmlFor="coupon-code-input"
                  className="text-xs font-semibold text-gray-700 block mb-1"
                >
                  Coupon Code
                </label>

                <div className="relative">
                  <input
                    id="coupon-code-input"
                    type="text"
                    placeholder="e.g. NOVA2026"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm font-mono tracking-wider outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 uppercase"
                  />

                  <button
                    type="button"
                    onClick={() => setCouponCode('NOVA2026')}
                    className="absolute right-2 top-2 text-[10px] font-bold px-2 py-1 rounded-lg bg-emerald-100 text-emerald-800"
                  >
                    Paste Demo Code
                  </button>
                </div>
              </div>

              {couponFeedback && (
                <div
                  className={`p-3 rounded-xl text-xs font-medium ${couponFeedback.type === 'success'
                    ? 'bg-green-50 text-green-800 border border-green-200'
                    : 'bg-red-50 text-red-700 border border-red-200'
                    }`}
                >
                  {couponFeedback.message}
                </div>
              )}

              <p className="text-[11px] text-gray-400">
                Official MiniPower bonus codes are released in our
                announcements and customer support channels.
              </p>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md shadow-emerald-600/20 active:scale-95 transition-all"
              >
                Redeem Code Now
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Modal: About MiniPower */}
      {showAboutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="w-full max-w-sm rounded-3xl bg-white border border-gray-100 p-5 sm:p-6 shadow-2xl relative max-h-[85vh] overflow-y-auto">

            <button
              type="button"
              onClick={() => setShowAboutModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              aria-label="Close about modal"
            >
              <X size={18} />
            </button>

            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                <ShieldCheck size={22} />
              </div>

              <div>
                <h3 className="text-base font-bold text-gray-900">
                  About MiniPower
                </h3>

                <span className="text-[11px] text-emerald-700 font-medium">
                  Digital Investment Platform
                </span>
              </div>
            </div>

            <div className="space-y-3 text-xs sm:text-sm text-gray-600 leading-relaxed">
              <p>
                <strong>MiniPower</strong> is an investment platform designed
                to provide users with an accessible and convenient digital
                investment experience.
              </p>

              <p>
                Our vision centers on providing a simple digital platform
                where users can explore investment opportunities and manage
                their accounts.
              </p>

              <div className="p-3 rounded-xl bg-emerald-50/80 border border-emerald-100 space-y-1.5 text-xs text-emerald-950 font-medium">
                <p className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-emerald-600 shrink-0" />
                  Convenient account management
                </p>

                <p className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-emerald-600 shrink-0" />
                  Referral programme information
                </p>

                <p className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-emerald-600 shrink-0" />
                  Customer service support
                </p>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-gray-100 flex gap-2">
              <button
                type="button"
                onClick={() => {
                  setShowAboutModal(false)
                  navigate('/support')
                }}
                className="flex-1 py-2.5 rounded-xl border border-emerald-200 text-emerald-800 text-xs font-semibold hover:bg-emerald-50"
              >
                Contact Support
              </button>

              <button
                type="button"
                onClick={() => setShowAboutModal(false)}
                className="flex-1 py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Fixed Bottom Navigation Bar */}
      <BottomNavbar />

    </div>
  )
}