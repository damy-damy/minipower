
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
    ShieldCheck,
    Eye,
    EyeOff,
    ArrowLeft,
} from 'lucide-react'

import BottomNavbar from '../components/BottomNavbar'

export default function ChangeLoginPassword() {
    const navigate = useNavigate()

    const [showOld, setShowOld] = useState(false)
    const [showNew, setShowNew] = useState(false)
    const [showConfirm, setShowConfirm] = useState(false)

    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')


    const handleSubmit = (e) => {
        e.preventDefault()
        setMessage('')

        if (!oldPassword || !newPassword || !confirmPassword) {
            setMessage('Please fill in all fields.')
            return
        }

        if (newPassword.length < 6) {
            setMessage('New password must be at least 6 characters.')
            return
        }

        if (newPassword !== confirmPassword) {
            setMessage('New passwords do not match.')
            return
        }

        if (oldPassword === newPassword) {
            setMessage('Your new password must be different.')
            return
        }
    }

    return (
        <div className="min-h-screen bg-[#f0fdf4] text-gray-800 pb-28">
            <div className="max-w-md mx-auto px-5 pt-6">

                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-green-700 font-semibold text-sm mb-6"
                >
                    <ArrowLeft size={19} />
                    Back
                </button>

                {/* Heading */}
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-green-700 via-emerald-600 to-green-400 p-5 text-white shadow-lg shadow-green-200/60 mb-7 animate-in fade-in slide-in-from-top-3 duration-700">
                    <div className="absolute -right-8 -top-10 w-32 h-32 rounded-full bg-white/10 blur-2xl" />

                    <div className="relative">
                        <div className="w-12 h-12 rounded-2xl bg-white/15 flex items-center justify-center mb-3">
                            <ShieldCheck size={26} />
                        </div>

                        <h1 className="text-xl font-bold">
                            Change Login Password
                        </h1>

                        <p className="text-xs text-white/80 mt-2">
                            Keep your account secure by updating your login password.
                        </p>
                    </div>
                </div>

                {/* Form */}
                <form
                    onSubmit={handleSubmit}
                    className="bg-white rounded-3xl border border-green-100 p-5 shadow-sm space-y-5"
                >

                    {[
                        {
                            label: 'Old Login Password',
                            value: oldPassword,
                            setter: setOldPassword,
                            show: showOld,
                            toggle: setShowOld,
                        },
                        {
                            label: 'New Login Password',
                            value: newPassword,
                            setter: setNewPassword,
                            show: showNew,
                            toggle: setShowNew,
                        },
                        {
                            label: 'Confirm New Login Password',
                            value: confirmPassword,
                            setter: setConfirmPassword,
                            show: showConfirm,
                            toggle: setShowConfirm,
                        },
                    ].map((field) => (
                        <div key={field.label}>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                {field.label}
                            </label>

                            <div className="relative">
                                <input
                                    type={field.show ? 'text' : 'password'}
                                    value={field.value}
                                    onChange={(e) => field.setter(e.target.value)}
                                    placeholder={`Enter ${field.label.toLowerCase()}`}
                                    className="w-full h-12 rounded-xl border border-gray-200 bg-gray-50 px-4 pr-12 text-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 transition"
                                />

                                <button
                                    type="button"
                                    onClick={() => field.toggle(!field.show)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                                >
                                    {field.show ? <EyeOff size={19} /> : <Eye size={19} />}
                                </button>
                            </div>
                        </div>
                    ))}


                    <button
                        type="submit"
                        className="w-full h-12 rounded-xl bg-gradient-to-r from-green-700 to-emerald-500 text-white font-bold shadow-md shadow-green-200 hover:shadow-lg active:scale-[0.98] transition"
                    >
                        Update Login Password
                    </button>


                </form>

            </div>

            <BottomNavbar />
        </div>
    )
}
