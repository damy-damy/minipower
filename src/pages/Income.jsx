
import { useMemo } from 'react'
import {
  ChevronLeft,
  Users,
  UserPlus,
  CheckCircle2,
  Lock,
} from 'lucide-react'

import BottomNavbar from '../components/BottomNavbar'
import { USER_PROFILE } from '../data/sampleData'

// Demo referral statistics
const DIRECT_REFERRALS = 4
const TOTAL_TEAM = 18

// Illustrative VIP requirements and rewards
const VIP_LEVELS = [
  { level: 1, direct: 2, team: 5, salary: 200 },
  { level: 2, direct: 4, team: 15, salary: 500 },
  { level: 3, direct: 6, team: 30, salary: 900 },
  { level: 4, direct: 8, team: 50, salary: 1500 },
  { level: 5, direct: 10, team: 80, salary: 2200 },
  { level: 6, direct: 12, team: 120, salary: 3000 },
  { level: 7, direct: 15, team: 180, salary: 4000 },
  { level: 8, direct: 18, team: 250, salary: 5500 },
  { level: 9, direct: 22, team: 350, salary: 7500 },
  { level: 10, direct: 25, team: 500, salary: 10000 },
]

export default function Income() {
  const currentVIP = useMemo(() => {
    return VIP_LEVELS.filter(
      (vip) =>
        DIRECT_REFERRALS >= vip.direct &&
        TOTAL_TEAM >= vip.team
    ).at(-1)
  }, [])

  const nextVIP = VIP_LEVELS.find(
    (vip) => !currentVIP || vip.level > currentVIP.level
  )

  return (
    <div className="h-dvh w-full flex flex-col overflow-hidden bg-[#f0fdf4] text-gray-900">

      {/* Fixed Page Header */}
      <header className="shrink-0 w-full bg-[#f0fdf4]">
        <div className="max-w-md mx-auto px-4 pt-4 pb-3 flex items-center gap-3">
          <button
            onClick={() => window.history.back()}
            className="w-9 h-9 shrink-0 rounded-xl border border-emerald-100 bg-emerald-50 text-emerald-800 flex items-center justify-center"
          >
            <ChevronLeft size={20} />
          </button>

          <h1 className="text-base font-bold text-emerald-950">
            VIP Salary Center
          </h1>
        </div>
      </header>

      {/* Scrollable VIP Content */}
      <main className="flex-1 min-h-0 w-full overflow-y-auto overscroll-contain">

        <div className="max-w-md mx-auto px-4 pt-2 pb-28 space-y-4">

          {/* Current VIP Card */}
          <section className="rounded-3xl bg-gradient-to-br from-emerald-950 via-emerald-800 to-green-700 text-white p-5 shadow-lg">

            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-emerald-200">
                  Your Current VIP Level
                </p>

                <h2 className="text-3xl font-black mt-1">
                  {currentVIP ? `VIP ${currentVIP.level}` : 'Not Qualified'}
                </h2>
              </div>

              <div className="w-14 h-14 rounded-2xl bg-white/15 flex items-center justify-center">
                <img
                  src="/mini.png"
                  alt="MiniPower Icon"
                  className="w-9 h-9 object-contain"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-6 pt-4 border-t border-white/20">
              <div>
                <p className="text-[10px] text-emerald-200">
                  Direct Referrals
                </p>
                <p className="text-xl font-bold">
                  {DIRECT_REFERRALS}
                </p>
              </div>

              <div>
                <p className="text-[10px] text-emerald-200">
                  Total Team Members
                </p>
                <p className="text-xl font-bold">
                  {TOTAL_TEAM}
                </p>
              </div>
            </div>
          </section>

          {/* Referral Progress */}
          <section className="bg-white rounded-2xl border border-emerald-100 p-4 shadow-sm">

            <h2 className="text-sm font-bold text-gray-900 mb-4">
              Referral Progress
            </h2>

            {nextVIP ? (
              <>
                <div className="flex justify-between text-xs mb-2">
                  <span className="text-gray-500">
                    Next Target: VIP {nextVIP.level}
                  </span>

                  <span className="font-bold text-emerald-700">
                    {Math.floor(
                      Math.min(
                        DIRECT_REFERRALS / nextVIP.direct,
                        TOTAL_TEAM / nextVIP.team
                      ) * 100
                    )}%
                  </span>
                </div>

                <div className="h-2.5 rounded-full bg-gray-100 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-green-500 to-emerald-700 transition-all"
                    style={{
                      width: `${Math.min(
                        100,
                        Math.min(
                          DIRECT_REFERRALS / nextVIP.direct,
                          TOTAL_TEAM / nextVIP.team
                        ) * 100
                      )}%`,
                    }}
                  />
                </div>

                <div className="grid grid-cols-2 gap-3 mt-4">

                  <div className="rounded-xl bg-emerald-50 p-3">
                    <UserPlus size={18} className="text-emerald-700 mb-2" />
                    <p className="text-[10px] text-gray-500">
                      Direct referrals needed
                    </p>
                    <p className="font-bold text-sm">
                      {DIRECT_REFERRALS} / {nextVIP.direct}
                    </p>
                  </div>

                  <div className="rounded-xl bg-emerald-50 p-3">
                    <Users size={18} className="text-emerald-700 mb-2" />
                    <p className="text-[10px] text-gray-500">
                      Team members needed
                    </p>
                    <p className="font-bold text-sm">
                      {TOTAL_TEAM} / {nextVIP.team}
                    </p>
                  </div>

                </div>
              </>
            ) : (
              <p className="text-sm text-emerald-700 font-semibold">
                You have reached the highest VIP level.
              </p>
            )}
          </section>

          {/* VIP Levels */}
          <section className="space-y-3">

            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-gray-900">
                VIP Levels 1–10
              </h2>

              <span className="text-[10px] text-gray-400">
                Qualification requirements
              </span>
            </div>

            {VIP_LEVELS.map((vip) => {
              const qualified =
                DIRECT_REFERRALS >= vip.direct &&
                TOTAL_TEAM >= vip.team

              const isCurrent = currentVIP?.level === vip.level

              return (
                <article
                  key={vip.level}
                  className={`rounded-2xl border p-4 shadow-sm transition-all ${isCurrent
                    ? 'border-emerald-500 bg-emerald-50'
                    : qualified
                      ? 'border-green-200 bg-white'
                      : 'border-gray-100 bg-white'
                    }`}
                >

                  <div className="flex items-center justify-between">

                    <div className="flex items-center gap-3">
                      <div
                        className={`w-11 h-11 rounded-xl flex items-center justify-center ${qualified
                          ? 'bg-emerald-100 text-emerald-700'
                          : 'bg-gray-100 text-gray-400'
                          }`}
                      >
                        <img
                          src="/mini.png"
                          alt="MiniPower Icon"
                          className="w-10 h-10 object-contain"
                        />
                      </div>

                      <div>
                        <h3 className="font-extrabold text-sm">
                          VIP {vip.level}
                        </h3>

                        <p className="text-[10px] text-gray-500">
                          {isCurrent
                            ? 'Current Level'
                            : qualified
                              ? 'Qualified'
                              : 'Locked'}
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="text-[10px] text-gray-400">
                        Demo daily reward
                      </p>

                      <p className="text-base font-black text-emerald-700">
                        ₦{vip.salary.toLocaleString()}
                      </p>
                    </div>

                  </div>

                  <div className="grid grid-cols-2 gap-2 mt-4">

                    <div className="rounded-lg bg-gray-50 p-2">
                      <p className="text-[10px] text-gray-500">
                        Direct referrals
                      </p>
                      <p className="text-xs font-bold">
                        {vip.direct} people
                      </p>
                    </div>

                    <div className="rounded-lg bg-gray-50 p-2">
                      <p className="text-[10px] text-gray-500">
                        Total team
                      </p>
                      <p className="text-xs font-bold">
                        {vip.team} members
                      </p>
                    </div>

                  </div>

                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">

                    <span className="text-[10px] text-gray-500">
                      Both targets must be met
                    </span>

                    {qualified ? (
                      <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-700">
                        <CheckCircle2 size={14} />
                        Qualified
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-[10px] font-bold text-gray-400">
                        <Lock size={13} />
                        Locked
                      </span>
                    )}

                  </div>

                </article>
              )
            })}
          </section>

          {/* Earnings Overview */}
          <section className="bg-white rounded-2xl border border-emerald-100 p-4 shadow-sm">
            <h2 className="text-sm font-bold text-gray-900 mb-3">
              Earnings Overview
            </h2>

            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-emerald-50 p-3">
                <p className="text-[10px] text-gray-500">
                  Account Balance
                </p>
                <p className="text-base font-black text-emerald-700">
                  ₦{USER_PROFILE.accountBalance.toLocaleString()}
                </p>
              </div>

              <div className="rounded-xl bg-emerald-50 p-3">
                <p className="text-[10px] text-gray-500">
                  Total Earnings
                </p>
                <p className="text-base font-black text-emerald-700">
                  ₦{USER_PROFILE.totalEarnings.toLocaleString()}
                </p>
              </div>
            </div>
          </section>

          <p className="text-[10px] text-gray-400 text-center px-3 pb-2">
            VIP requirements and rewards shown are illustrative demo values.
          </p>

        </div>
      </main>

      {/* Stationary Bottom Navigation */}
      <BottomNavbar />

    </div>
  )
}
