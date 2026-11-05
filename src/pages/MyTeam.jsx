import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
    ChevronLeft,
    Users,
    UserRound,
} from 'lucide-react'

import BottomNavbar from '../components/BottomNavbar'
import { TEAM_MEMBERS } from '../data/sampleData'

export default function MyTeam() {
    const [activeLevel, setActiveLevel] = useState(1)

    const levels = [1, 2, 3, 4, 5]

    const members = TEAM_MEMBERS.filter(
        (member) => member.level === activeLevel
    )

    return (
        <div className="min-h-screen bg-gradient-to-b from-emerald-50/40 via-white to-emerald-50/30 text-gray-900 pb-28">

            {/* Header */}
            <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-emerald-100 px-4 py-3">
                <div className="max-w-md mx-auto flex items-center justify-between">

                    <Link
                        to="/team"
                        className="w-9 h-9 rounded-xl border border-emerald-100 bg-emerald-50 flex items-center justify-center text-emerald-800"
                    >
                        <ChevronLeft size={20} />
                    </Link>

                    <h1 className="text-sm font-semibold">
                        My Team
                    </h1>

                    <div className="w-9" />

                </div>
            </header>

            <main className="max-w-md mx-auto px-4 pt-5 space-y-4">

                {/* Team Summary */}
                <section className="rounded-2xl bg-gradient-to-br from-emerald-400 via-emerald-700 to-green-600 p-5 text-white shadow-lg">

                    <div className="flex items-center justify-between">

                        <div>
                            <p className="text-sm text-emerald-100">
                                Total Team Members
                            </p>

                            <h2 className="text-3xl font-bold mt-1">
                                {TEAM_MEMBERS.length}
                            </h2>

                            <p className="text-xs text-emerald-100 mt-2">
                                Across five generations
                            </p>
                        </div>

                        <Users size={28} />

                    </div>

                </section>

                {/* Five Team Levels */}
                <section className="bg-white rounded-2xl border border-emerald-100 p-4 shadow-sm">

                    <h2 className="text-sm font-semibold mb-4">
                        Team Generations
                    </h2>

                    <div className="grid grid-cols-5 gap-2">

                        {levels.map((level) => {
                            const count = TEAM_MEMBERS.filter(
                                (member) => member.level === level
                            ).length

                            return (
                                <button
                                    key={level}
                                    type="button"
                                    onClick={() => setActiveLevel(level)}
                                    className={`rounded-xl py-3 border transition-all ${activeLevel === level
                                        ? 'bg-emerald-700 text-white border-emerald-700 shadow-md'
                                        : 'bg-emerald-50 text-gray-700 border-emerald-100'
                                        }`}
                                >
                                    <span className="block text-xs font-bold">
                                        Level {level}
                                    </span>


                                </button>
                            )
                        })}

                    </div>

                </section>

                {/* Members List */}
                <section className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">

                    <div className="flex items-center justify-between mb-4">

                        <div>
                            <h2 className="text-sm font-semibold">
                                Level {activeLevel} Members
                            </h2>

                            <p className="text-xs text-gray-400 mt-1">
                                {members.length} members found
                            </p>
                        </div>

                        <Users size={20} className="text-emerald-700" />

                    </div>

                    {members.length > 0 ? (
                        <div className="space-y-2">

                            {members.map((member) => (
                                <div
                                    key={member.id}
                                    className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100"
                                >

                                    <img
                                        src="/mini.png"
                                        alt="mini"
                                        className="w-10 h-10 object-contain"
                                    />

                                    <div>
                                        <p className="text-sm font-semibold text-gray-800">
                                            {member.username}
                                        </p>

                                        <p className="text-[10px] text-gray-400">
                                            Level {member.level}
                                        </p>
                                    </div>

                                </div>
                            ))}

                        </div>
                    ) : (
                        <div className="text-center py-10">

                            <Users
                                size={30}
                                className="mx-auto text-gray-300 mb-2"
                            />

                            <p className="text-sm font-medium text-gray-600">
                                No members in this level yet
                            </p>

                            <p className="text-xs text-gray-400 mt-1">
                                Members will appear here when they join.
                            </p>

                        </div>
                    )}

                </section>

            </main>

            <BottomNavbar />

        </div>
    )
}