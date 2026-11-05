
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  UserRound,
  Lock,
  Eye,
  EyeOff,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react'

import {
  validateUsername,
  validatePassword,
  validateLoginForm,
} from '../auth/loginValidation'

const fadeUpStyle = `
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(24px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes staggerIn {
    from { opacity: 0; transform: translateY(35px) scale(0.97); }
    to { opacity: 1; transform: translateY(0) scale(1); }
  }

  .stagger-item {
    opacity: 0;
    animation: staggerIn 0.7s ease-out both;
  }

  @keyframes floatOne {
    0%, 100% { transform: translate(0, 0) scale(1); }
    50% { transform: translate(80px, 60px) scale(1.2); }
  }

  @keyframes floatTwo {
    0%, 100% { transform: translate(0, 0) scale(1); }
    50% { transform: translate(-70px, -60px) scale(1.3); }
  }

  @keyframes floatThree {
    0%, 100% { transform: translate(0, 0); }
    50% { transform: translate(50px, -50px); }
  }

  .orb-one { animation: floatOne 12s ease-in-out infinite; }
  .orb-two { animation: floatTwo 15s ease-in-out infinite; }
  .orb-three { animation: floatThree 10s ease-in-out infinite; }

  @keyframes cardGlow {
    0%, 100% {
      transform: translate(0, 0) scale(1);
      opacity: 0.2;
    }
    50% {
      transform: translate(35px, 25px) scale(1.3);
      opacity: 0.5;
    }
  }

  .card-glow {
    animation: cardGlow 8s ease-in-out infinite;
  }

  @media (prefers-reduced-motion: reduce) {
    .login-card,
    .stagger-item,
    .orb-one,
    .orb-two,
    .orb-three,
    .card-glow {
      animation: none !important;
      opacity: 1 !important;
      transform: none !important;
    }
  }
`

export default function Login() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  // Validate the entire form
  const handleSubmit = (e) => {
    e.preventDefault()

    const validationErrors = validateLoginForm(username, password)

    const filteredErrors = Object.fromEntries(
      Object.entries(validationErrors).filter(([, value]) => value)
    )

    setErrors(filteredErrors)

    if (Object.keys(filteredErrors).length > 0) return

    setLoading(true)

    setTimeout(() => {
      setLoading(false)
      navigate("/dashboard")
    }, 1500)
  }

  // Validate username when user leaves the field
  const handleUsernameBlur = () => {
    const error = validateUsername(username)

    setErrors((prev) => ({
      ...prev,
      username: error,
    }))
  }

  // Validate password when user leaves the field
  const handlePasswordBlur = () => {
    const error = validatePassword(password)

    setErrors((prev) => ({
      ...prev,
      password: error,
    }))
  }

  return (
    <>

      <style>{fadeUpStyle}</style>


      <div className="relative isolate overflow-hidden min-h-screen w-full bg-white flex items-center justify-center px-4 py-10">

        {/* Animated background circles */}
        <div className="orb-one absolute top-10 left-10 w-64 h-64 bg-green-300/40 rounded-full blur-3xl pointer-events-none"></div>

        <div className="orb-two absolute bottom-10 right-10 w-72 h-72 bg-emerald-300/40 rounded-full blur-3xl pointer-events-none"></div>

        <div className="orb-three absolute top-1/2 right-1/3 w-48 h-48 bg-green-200/40 rounded-full blur-3xl pointer-events-none"></div>

        {/* Login card */}
        <div
          className="relative isolate overflow-hidden z-10 login-card w-full max-w-md bg-white/90 backdrop-blur-xl border border-gray-100 rounded-3xl shadow-2xl shadow-gray-200/60 px-6 py-8 sm:px-10 sm:py-10"
          style={{
            animation: 'fadeUp 0.45s cubic-bezier(0.16,1,0.3,1) both',
          }}
        >

          {/* Animated glow inside the card */}
          <div className="card-glow absolute -top-16 -right-16 w-48 h-48 bg-green-300/50 rounded-full blur-3xl pointer-events-none"></div>

          <div
            className="card-glow absolute -bottom-16 -left-16 w-48 h-48 bg-emerald-300/50 rounded-full blur-3xl pointer-events-none"
            style={{ animationDelay: '3s' }}
          ></div>

          <div className="relative z-10">

            {/* Logo */}
            <div
              className="stagger-item flex flex-col items-center mb-8"
              style={{ animationDelay: '0.1s' }}
            >
              <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-green-500 shadow-md shadow-green-200 mb-4">
                <TrendingUp
                  size={28}
                  className="text-white"
                  strokeWidth={2.5}
                />
              </div>

              <span className="text-xl font-bold tracking-widest text-green-600 uppercase">
                InvestPro
              </span>
            </div>

            {/* Heading */}
            <div
              className="stagger-item mb-8 text-center"
              style={{ animationDelay: '0.3s' }}
            >
              <h1 className="text-3xl font-bold text-gray-900 tracking-tight mb-1">
                Welcome Back
              </h1>

              <p className="text-gray-500 text-sm leading-relaxed">
                Sign in to manage your investment portfolio.
              </p>
            </div>

            {/* Login form */}
            <form onSubmit={handleSubmit} noValidate className="space-y-5">

              {/* Username field */}
              <div
                className="stagger-item"
                style={{ animationDelay: '0.5s' }}
              >
                <label
                  htmlFor="login-username"
                  className="block text-sm font-medium text-gray-700 mb-1.5"
                >
                  Username
                </label>

                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                    <UserRound
                      size={17}
                      className={`transition-colors duration-200 ${errors.username
                        ? 'text-red-400'
                        : username
                          ? 'text-green-500'
                          : 'text-gray-400'
                        }`}
                    />
                  </span>

                  <input
                    id="login-username"
                    type="text"
                    autoComplete="username"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => {
                      setUsername(e.target.value)

                      if (errors.username) {
                        setErrors((prev) => {
                          const updated = { ...prev }
                          delete updated.username
                          return updated
                        })
                      }
                    }}
                    onBlur={handleUsernameBlur}
                    aria-describedby={
                      errors.username ? 'username-error' : undefined
                    }
                    aria-invalid={!!errors.username}
                    className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm text-gray-800 placeholder:text-gray-400 bg-gray-50 outline-none transition-all duration-200 focus:bg-white focus:shadow-sm ${errors.username
                      ? 'border-red-400 focus:border-red-400 focus:ring-2 focus:ring-red-100'
                      : 'border-gray-200 focus:border-green-400 focus:ring-2 focus:ring-green-100'
                      }`}
                  />
                </div>

                <div
                  id="username-error"
                  role="alert"
                  className={`flex items-center gap-1.5 mt-1.5 text-xs text-red-500 transition-all duration-200 overflow-hidden ${errors.username
                    ? 'max-h-8 opacity-100'
                    : 'max-h-0 opacity-0'
                    }`}
                >
                  <AlertCircle size={13} />
                  <span>{errors.username}</span>
                </div>
              </div>

              {/* Password field */}
              <div
                className="stagger-item"
                style={{ animationDelay: '0.7s' }}
              >
                <label
                  htmlFor="login-password"
                  className="block text-sm font-medium text-gray-700 mb-1.5"
                >
                  Password
                </label>

                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                    <Lock
                      size={17}
                      className={`transition-colors duration-200 ${errors.password
                        ? 'text-red-400'
                        : password
                          ? 'text-green-500'
                          : 'text-gray-400'
                        }`}
                    />
                  </span>

                  <input
                    id="login-password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value)

                      if (errors.password) {
                        setErrors((prev) => {
                          const updated = { ...prev }
                          delete updated.password
                          return updated
                        })
                      }
                    }}
                    onBlur={handlePasswordBlur}
                    aria-describedby={
                      errors.password ? 'password-error' : undefined
                    }
                    aria-invalid={!!errors.password}
                    className={`w-full pl-10 pr-11 py-3 rounded-xl border text-sm text-gray-800 placeholder:text-gray-400 bg-gray-50 outline-none transition-all duration-200 focus:bg-white focus:shadow-sm ${errors.password
                      ? 'border-red-400 focus:border-red-400 focus:ring-2 focus:ring-red-100'
                      : 'border-gray-200 focus:border-green-400 focus:ring-2 focus:ring-green-100'
                      }`}
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    aria-label={
                      showPassword ? 'Hide password' : 'Show password'
                    }
                    className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-gray-400 hover:text-green-500 transition-colors duration-150 focus:outline-none"
                  >
                    {showPassword ? (
                      <EyeOff size={17} />
                    ) : (
                      <Eye size={17} />
                    )}
                  </button>
                </div>

                <div
                  id="password-error"
                  role="alert"
                  className={`flex items-center gap-1.5 mt-1.5 text-xs text-red-500 transition-all duration-200 overflow-hidden ${errors.password
                    ? 'max-h-8 opacity-100'
                    : 'max-h-0 opacity-0'
                    }`}
                >
                  <AlertCircle size={13} />
                  <span>{errors.password}</span>
                </div>
              </div>

              {/* Remember me and forgot password */}
              <div
                className="stagger-item flex items-center justify-between pt-1"
                style={{ animationDelay: '0.9s' }}
              >
                <label className="flex items-center gap-2 cursor-pointer select-none group">
                  <div className="relative flex items-center">
                    <input
                      id="remember-me"
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="sr-only peer"
                    />

                    <div className="w-4 h-4 rounded border border-gray-300 bg-gray-50 flex items-center justify-center peer-checked:bg-green-500 peer-checked:border-green-500 transition-colors duration-200 peer-focus:ring-2 peer-focus:ring-green-100">
                      {rememberMe && (
                        <svg
                          className="w-2.5 h-2.5 text-white"
                          fill="none"
                          viewBox="0 0 10 8"
                        >
                          <path
                            d="M1 4l2.5 2.5L9 1"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </div>
                  </div>

                  <span className="text-sm text-gray-600 group-hover:text-gray-800 transition-colors duration-150">
                    Remember me
                  </span>
                </label>

                <a
                  href="#forgot-password"
                  onClick={(e) => e.preventDefault()}
                  className="text-sm text-green-600 font-medium hover:text-green-700 hover:underline transition-colors duration-150 focus:outline-none focus:underline"
                >
                  Forgot password?
                </a>
              </div>

              {/* Sign in button */}
              <button
                id="login-submit-btn"
                type="submit"
                disabled={loading}
                style={{ animationDelay: '1.1s' }}
                className="stagger-item w-full py-3.5 rounded-xl text-white font-semibold text-sm tracking-wide bg-green-500 hover:bg-green-600 active:scale-[0.98] shadow-md shadow-green-200 hover:shadow-green-300 transition-all duration-200 mt-2 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed disabled:active:scale-100"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg
                      className="animate-spin h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />

                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8H4z"
                      />
                    </svg>

                    Signing in...
                  </span>
                ) : (
                  'Sign In'
                )}
              </button>
            </form>

            {/* Divider */}
            <div
              className="stagger-item flex items-center gap-3 my-7"
              style={{ animationDelay: '1.2s' }}
            >
              <div className="flex-1 h-px bg-gray-100" />

              <span className="text-xs text-gray-400 font-medium">
                OR
              </span>

              <div className="flex-1 h-px bg-gray-100" />
            </div>

            {/* Register link */}
            <p
              className="stagger-item text-center text-sm text-gray-500"
              style={{ animationDelay: '1.3s' }}
            >
              {"Don't have an account? "}

              <a
                href="#register"
                onClick={(e) => e.preventDefault()}
                className="text-green-600 font-semibold hover:text-green-700 hover:underline transition-colors duration-150 focus:outline-none focus:underline"
              >
                Create one for free
              </a>
            </p>

          </div>
        </div>
      </div>
    </>
  )
}
