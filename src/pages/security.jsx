
import { Link } from 'react-router-dom'
import {
    Wallet,
    LockKeyhole,
    LogOut,
    ChevronRight,
    ShieldCheck,
} from 'lucide-react'

import BottomNavbar from '../components/BottomNavbar'

export default function Security() {
    const securityOptions = [
        {
            name: 'Reset Fund Password',
            description: 'Reset your fund transaction password',
            path: '/reset-fund-password',
            icon: Wallet,
            color: 'text-emerald-600',
            bg: 'bg-emerald-50',
        },
        {
            name: 'Change Login Password',
            description: 'Update your account login password',
            path: '/change-login-password',
            icon: LockKeyhole,
            color: 'text-green-600',
            bg: 'bg-green-50',
        },
        {
            name: 'Sign Out',
            description: 'Sign out of your MiniPower account',
            path: '/login',
            icon: LogOut,
            color: 'text-red-500',
            bg: 'bg-red-50',
        },
    ]

    return (
        <div className="min-h-screen bg-[#f0fdf4] text-gray-800 pb-28">

            <div className="max-w-md mx-auto px-5 pt-7">

                {/* Heading */}
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-green-700 via-emerald-600 to-green-400 p-5 mb-7 text-white shadow-lg shadow-green-200/60 animate-in fade-in slide-in-from-top-3 duration-700">

                    <div className="absolute -right-8 -top-10 w-32 h-32 rounded-full bg-white/10 blur-2xl" />
                    <div className="absolute -bottom-12 left-20 w-28 h-28 rounded-full bg-lime-200/20 blur-2xl" />

                    <div className="relative">
                        <div className="w-11 h-11 rounded-2xl bg-white/15 border border-white/20 flex items-center justify-center mb-3">
                            <ShieldCheck size={23} className="text-white" />
                        </div>

                        <h1 className="text-xl font-bold">
                            Security Center
                        </h1>

                    </div>
                </div>

                {/* Security Options */}
                <div className="space-y-3">

                    {securityOptions.map((item, index) => {
                        const Icon = item.icon

                        return (
                            <Link
                                to={item.path}
                                key={item.name}
                                className="group flex items-center gap-3 rounded-2xl bg-white border border-green-100 p-4 shadow-sm hover:shadow-md hover:border-green-200 transition-all duration-300 active:scale-[0.98] animate-in fade-in slide-in-from-bottom-2"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                {/* Small Icon Box */}
                                <div className={`w-12 h-12 shrink-0 rounded-xl ${item.bg} flex items-center justify-center`}>
                                    <Icon size={22} strokeWidth={1.9} className={item.color} />
                                </div>

                                {/* Text */}
                                <div className="flex-1 min-w-0">
                                    <h3 className={`text-sm font-bold ${item.name === 'Sign Out'
                                        ? 'text-red-600'
                                        : 'text-gray-800'
                                        }`}>
                                        {item.name}
                                    </h3>

                                    <p className="text-xs text-gray-500 mt-1">
                                        {item.description}
                                    </p>
                                </div>

                                <ChevronRight
                                    size={19}
                                    className="text-gray-400 group-hover:text-green-600 transition"
                                />
                            </Link>
                        )
                    })}

                </div>

            </div>

            <BottomNavbar />

        </div>
    )
}
