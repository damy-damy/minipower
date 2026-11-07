
import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Copy,
  ChevronLeft,
  Share2,
  Wallet,
  ArrowUpRight,
  ClipboardList,
  Crown,
  ChartColumn,
} from 'lucide-react'

import BottomNavbar from '../components/BottomNavbar'
import Notification from '../components/notificationCom'
import { USER_PROFILE, TEAM_DATA } from '../data/sampleData'

export default function Team() {
  const [toastMessage, setToastMessage] = useState('')

  const handleCopy = async (text) => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text)
      } else {
        const textarea = document.createElement('textarea')
        textarea.value = text
        document.body.appendChild(textarea)
        textarea.select()
        document.execCommand('copy')
        document.body.removeChild(textarea)
      }

      setToastMessage('Success')
      setTimeout(() => setToastMessage(''), 3000)
    } catch {
      setToastMessage('Unable to copy. Please try again.')
      setTimeout(() => setToastMessage(''), 3000)
    }
  }

  const summaryItems = [
    {
      label: 'Cumulative Recharge',
      value: '₦0.00',
      icon: Wallet,
    },
    {
      label: 'Cumulative Withdrawal',
      value: '₦0.00',
      icon: ArrowUpRight,
    },
    {
      label: 'Total Orders',
      value: '0',
      icon: ClipboardList,
    },
    {
      label: 'VIP Level',
      value: USER_PROFILE.memberTier,
      icon: Crown,
    },
  ]

  const teamLevels = [
    { name: 'Level 1', count: TEAM_DATA.level1Count ?? 0 },
    { name: 'Level 2', count: TEAM_DATA.level2Count ?? 0 },
    { name: 'Level 3', count: TEAM_DATA.level3Count ?? 0 },
    { name: 'Level 4', count: TEAM_DATA.level4Count ?? 0 },
    { name: 'Level 5', count: TEAM_DATA.level5Count ?? 0 },
  ]

  const maxMembers = Math.max(
    ...teamLevels.map((level) => level.count),
    1
  )

  const totalGenerationMembers = teamLevels.reduce(
    (total, level) => total + level.count,
    0
  )

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50/40 via-white to-emerald-50/30 text-gray-900 pb-28">

      <Notification
        message={toastMessage}
        onClose={() => setToastMessage('')}
      />

      {/* Header */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-emerald-100/80 px-4 py-3">
        <div className="max-w-md mx-auto flex items-center justify-between">

          <div className="w-9" />

        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-md mx-auto px-4 pt-4 space-y-4">

        {/* Team Summary Card */}
        <section className="relative overflow-hidden rounded-2xl border border-emerald-700/60 bg-gradient-to-br from-emerald-400 via-emerald-700 to-green-600 p-4 shadow-xl shadow-emerald-900/15">

          <div className="absolute -top-16 -right-12 w-40 h-40 rounded-full bg-emerald-400/10 blur-3xl pointer-events-none" />

          <div className="relative z-10">

            <div className="flex items-center justify-between mb-3">

              <div>
                <p
                  className="text-sm font-semibold text-white"
                  style={{ fontFamily: 'inter, sans-serif' }}
                >
                  Team Summary
                </p>

                <p className="text-[10px] text-emerald-200/80 mt-0.5">
                  Your team activity at a glance
                </p>
              </div>

              <div className="rounded-lg border border-white/15 bg-white/10 p-2">
                <Wallet size={16} className="text-emerald-100" />
              </div>

            </div>

            {/* Four Summary Boxes */}
            <div className="grid grid-cols-2 gap-2">

              {summaryItems.map((item) => {
                const Icon = item.icon

                return (
                  <div
                    key={item.label}
                    className="min-w-0 rounded-xl border border-white/20 bg-white/10 backdrop-blur-md px-2 py-1 shadow-sm"
                  >

                    <div className="flex items-center gap-1.5 mb-2">
                      <Icon
                        size={13}
                        strokeWidth={1.8}
                        className="text-emerald-200 shrink-0"
                      />

                      <span className="text-[10px] leading-4 text-emerald-50/90 font-medium">
                        {item.label}
                      </span>
                    </div>

                    <p className="text-sm sm:text-base font-semibold text-white leading-5 break-words">
                      {item.value}
                    </p>

                  </div>
                )
              })}

            </div>

          </div>
        </section>

        {/* Invitation Section */}
        <section className="rounded-2xl bg-white text-gray-900 p-4 border border-emerald-100 shadow-sm">

          <div className="flex items-center justify-between mb-3">

            <span className="text-sm font-semibold text-gray-900">
              Invitation Code
            </span>

            <span className="text-[11px] bg-emerald-50 text-emerald-800 px-2.5 py-1 rounded-lg border border-emerald-100 font-medium">
              L1: 10% · L2: 3%
            </span>

          </div>

          {/* Referral Code */}
          <div className="flex items-center justify-between bg-gray-50 rounded-xl p-3 border border-gray-100 mb-3">

            <div className="min-w-0">

              <span className="text-[10px] text-gray-500 block mb-1">
                Your Referral Code
              </span>

              <span className="text-base font-bold text-emerald-900 tracking-wider font-mono">
                {USER_PROFILE.referralCode}
              </span>

            </div>

            <button
              type="button"
              onClick={() => handleCopy(USER_PROFILE.referralCode)}
              className="px-3 py-2 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold flex items-center gap-1.5 active:scale-95 transition-all"
            >
              <Copy size={13} />
              Copy
            </button>

          </div>

          {/* Invitation Link */}
          <button
            type="button"
            onClick={() => handleCopy(USER_PROFILE.referralLink)}
            className="w-full py-3 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-100 text-sm font-semibold hover:bg-emerald-100 flex items-center justify-center gap-2 active:scale-[0.99] transition-all"
          >
            <Share2 size={16} />
            Copy Full Invitation Link
          </button>

        </section>

        {/* Team Statistics - Compact Side-by-Side Cards */}
        <section className="grid grid-cols-2 gap-2">

          {/* Total Team Members */}
          <Link
            to="/my-team"
            className="h-[60px] rounded-lg bg-white border border-gray-100 p-2 shadow-sm">

            <span className="text-[10px] text-gray-500 block">
              My Team
            </span>

            <span className="text-base font-bold text-gray-900">
              {TEAM_DATA.totalMembers}
            </span>


          </Link>

          {/* Total Commission */}
          <div className="h-[60px] rounded-lg bg-white border border-gray-100 p-2 shadow-sm">

            <span className="text-[10px] text-gray-500 block">
              Commision Earned
            </span>

            <span className="text-base font-bold text-gray-900">
              ₦{TEAM_DATA.totalCommission.toLocaleString()}
            </span>


          </div>

        </section>

        {/* Team Generation Vertical Bar Chart */}
        <section className="rounded-2xl bg-white border border-gray-200 p-4 shadow-sm">

          <div className="flex items-center justify-between mb-6">

            <div>
              <h2 className="text-sm font-semibold text-gray-900">
                Team Generation
              </h2>

              <p className="text-xs text-gray-400 mt-1">
                Members across five generations
              </p>
            </div>

            <div className="p-2 rounded-lg bg-emerald-50">
              <ChartColumn size={18} className="text-emerald-700" />
            </div>

          </div>

          {/* Vertical Bar Chart */}
          <div className="flex items-end justify-around gap-3 h-48 border-b border-gray-200 pb-2">

            {teamLevels.map((level) => {
              const height = (level.count / maxMembers) * 100

              return (
                <div
                  key={level.name}
                  className="flex-1 h-full flex flex-col items-center justify-end min-w-0"
                >

                  {/* Member Count */}
                  <span className="text-xs font-semibold text-gray-800 mb-2">
                    {level.count}
                  </span>

                  {/* Bar */}
                  <div className="w-full max-w-12 flex-1 flex items-end">

                    <div
                      className="w-full rounded-t-lg bg-gradient-to-t from-emerald-700 to-emerald-400 transition-all duration-700"
                      style={{
                        height: `${height}%`,
                        minHeight: level.count > 0 ? '6px' : '0px',
                      }}
                    />

                  </div>

                  {/* Level Name */}
                  <span className="text-[10px] font-medium text-gray-500 mt-3 whitespace-nowrap">
                    {level.name}
                  </span>

                </div>
              )
            })}

          </div>

          {/* Total Generation Members */}
          <div className="flex justify-between items-center mt-4">

            <span className="text-xs text-gray-400">
              Total Generation Members
            </span>

            <span className="text-sm font-bold text-emerald-700">
              {totalGenerationMembers}
            </span>

          </div>

        </section>

      </main>

      <BottomNavbar />

    </div>
  )
}
