import TermsAndConditions from '../components/termsAndConditions'
import { notifications } from '../components/notification'
import Notification from '../components/notificationCom'
import { useState, useCallback } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  User,
  UserRound,
  Lock,
  Eye,
  EyeOff,
  TrendingUp,
  RefreshCw,
  ShieldCheck,
  Check,
} from 'lucide-react'

import PhoneInput from '../components/PhoneInput'
import { DEFAULT_COUNTRY } from '../data/countries'

import {
  validateUsername,
  validatePhoneNumber,
  validatePassword,
  validateConfirmPassword,
  validateCaptcha,
  getPasswordStrength,
  generateCaptchaCode,
  validateRegisterForm,
} from '../auth/registerValidation'

const fadeUpStyle = `
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(24px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes staggerIn {
    from { opacity: 0; transform: translateY(30px) scale(0.97); }
    to { opacity: 1; transform: translateY(0) scale(1); }
  }

  .stagger-item {
    opacity: 0;
    animation: staggerIn 0.6s ease-out both;
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

  .captcha-box {
    background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 50%, #a7f3d0 100%);
    background-image:
      radial-gradient(#10b981 0.75px, transparent 0.75px),
      radial-gradient(#059669 0.75px, #d1fae5 0.75px);
    background-size: 12px 12px;
    background-position: 0 0, 6px 6px;
  }

  @media (prefers-reduced-motion: reduce) {
    .register-card,
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

export default function Register() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    username: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
    captchaCode: '',
    referralCode: '',
  })

  // Nigeria is the default selected country
  const [selectedCountry, setSelectedCountry] = useState(DEFAULT_COUNTRY)

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  // Generate CAPTCHA automatically when the page loads
  const [captchaCodeActual, setCaptchaCodeActual] = useState(
    () => generateCaptchaCode(6)
  )

  const [isCaptchaRefreshing, setIsCaptchaRefreshing] = useState(false)
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [acceptedTerms, setAcceptedTerms] = useState(false)
  const [notification, setNotification] = useState('')
  const [notificationType, setNotificationType] = useState('error')

  // Refresh CAPTCHA
  const handleRefreshCaptcha = useCallback(() => {
    setIsCaptchaRefreshing(true)

    const newCode = generateCaptchaCode(6)
    setCaptchaCodeActual(newCode)

    setFormData((prev) => ({
      ...prev,
      captchaCode: '',
    }))

    setErrors((prev) => {
      const updated = { ...prev }
      delete updated.captchaCode
      return updated
    })

    setTimeout(() => {
      setIsCaptchaRefreshing(false)
    }, 450)
  }, [])

  // Country selection
  const handleCountryChange = (country) => {
    setSelectedCountry(country)

    if (errors.phoneNumber) {
      setErrors((prev) => {
        const updated = { ...prev }
        delete updated.phoneNumber
        return updated
      })
    }
  }

  // Handle input changes
  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))

    if (errors[field]) {
      setErrors((prev) => {
        const updated = { ...prev }
        delete updated[field]
        return updated
      })
    }

    // Revalidate confirmation when the original password changes
    if (field === 'password' && formData.confirmPassword) {
      setErrors((prev) => ({
        ...prev,
        confirmPassword: validateConfirmPassword(
          value,
          formData.confirmPassword
        ),
      }))
    }
  }

  const handleBlur = (field) => {
    let error = ''

    switch (field) {
      case 'username':
        error = validateUsername(formData.username)
        break

      case 'phoneNumber':
        error = validatePhoneNumber(formData.phoneNumber)
        break

      case 'password':
        error = validatePassword(formData.password)
        break

      case 'confirmPassword':
        error = validateConfirmPassword(
          formData.password,
          formData.confirmPassword
        )
        break

      case 'captchaCode':
        error = validateCaptcha(
          formData.captchaCode,
          captchaCodeActual
        )
        break

      default:
        break
    }

    setErrors((prev) => ({
      ...prev,
      [field]: error,
    }))
  }

  // Form submission
  const handleSubmit = (e) => {
    e.preventDefault()
    setNotification('')



    const validationErrors = validateRegisterForm({
      username: formData.username,
      phoneNumber: formData.phoneNumber,
      password: formData.password,
      confirmPassword: formData.confirmPassword,
      invitationCode: formData.referralCode,
      captchaCode: formData.captchaCode,
      actualCaptcha: captchaCodeActual,
    })

    const activeErrors = Object.fromEntries(
      Object.entries(validationErrors).filter(([, value]) => Boolean(value))
    )

    setErrors(activeErrors)

    if (Object.keys(activeErrors).length > 0) {
      if (activeErrors.username) {
        setNotification(notifications.username)
      } else if (activeErrors.phoneNumber) {
        setNotification(notifications.phone)
      } else if (activeErrors.password) {
        setNotification(notifications.password)
      } else if (activeErrors.confirmPassword) {
        setNotification(notifications.confirmPassword)
      } else if (activeErrors.invitationCode) {
        setNotification(notifications.invitationCode)
      } else if (activeErrors.captchaCode) {
        setNotification(notifications.captcha)
        handleRefreshCaptcha()
      }

      setNotificationType('error')
      return
    }
    if (!acceptedTerms) {
      setNotification(notifications.terms)
      setNotificationType('error')
      return
    }

    navigate('/login')
  }

  // Password strength calculations
  const strengthInfo = getPasswordStrength(formData.password) || {
    text: 'text-gray-500',
    label: 'Enter password',
    score: 0,
    color: 'bg-gray-200',
  }

  const confirmStrengthInfo =
    getPasswordStrength(formData.confirmPassword) || {
      text: 'text-gray-500',
      label: 'Enter password',
      score: 0,
      color: 'bg-gray-200',
    }

  // CAPTCHA character rotations
  const getCharStyle = (index) => {
    const rotations = [-4, 5, -2, 4, -3, 3]
    const rot = rotations[index % rotations.length]

    return {
      transform: `rotate(${rot}deg)`,
      display: 'inline-block',
      letterSpacing: '0.18em',
    }
  }

  return (
    <>
      <style>{fadeUpStyle}</style>

      <div className="relative isolate overflow-hidden min-h-screen w-full bg-white flex items-center justify-center px-4 py-8 sm:py-12">

        {/* Animated background */}
        <div className="orb-one absolute top-10 left-10 w-64 h-64 bg-green-300/40 rounded-full blur-3xl pointer-events-none" />
        <div className="orb-two absolute bottom-10 right-10 w-72 h-72 bg-emerald-300/40 rounded-full blur-3xl pointer-events-none" />
        <div className="orb-three absolute top-1/2 right-1/3 w-48 h-48 bg-green-200/40 rounded-full blur-3xl pointer-events-none" />

        {/* Register Card */}
        <div
          className="relative isolate z-10 register-card w-full max-w-[480px] bg-white/90 backdrop-blur-xl border border-gray-100 rounded-3xl shadow-2xl shadow-gray-200/60 px-6 py-8 sm:px-9 sm:py-9"
          style={{
            animation: 'fadeUp 0.45s cubic-bezier(0.16,1,0.3,1) both',
          }}
        >

          {/* Card glow */}
          <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
            <div className="card-glow absolute -top-16 -right-16 w-48 h-48 bg-green-300/50 rounded-full blur-3xl pointer-events-none" />

            <div
              className="card-glow absolute -bottom-16 -left-16 w-48 h-48 bg-emerald-300/50 rounded-full blur-3xl pointer-events-none"
              style={{ animationDelay: '3s' }}
            />
          </div>

          <div className="relative z-10">

            {/* Logo */}
            <div
              className="stagger-item flex flex-col items-center mb-6"
              style={{ animationDelay: '0.05s' }}
            >
              <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-green-500 shadow-md shadow-green-200 mb-3">
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
              className="stagger-item mb-6 text-center"
              style={{ animationDelay: '0.15s' }}
            >
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight mb-1">
                Create Account
              </h1>

              <p className="text-gray-500 text-sm leading-relaxed">
                Join InvestPro to manage your investment portfolio.
              </p>
            </div>

            {/* Registration Form */}
            <form onSubmit={handleSubmit} noValidate className="space-y-4">

              {/* 2. Username */}
              <div
                className="stagger-item"
                style={{ animationDelay: '0.35s' }}
              >
                <label
                  htmlFor="register-username"
                  className="block text-sm font-medium text-gray-700 mb-1.5"
                >
                  Username
                </label>

                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                    <UserRound
                      size={17}
                      className={`transition-colors duration-200 ${errors.username
                        ? 'text-green-400'
                        : formData.username
                          ? 'text-green-500'
                          : 'text-gray-400'
                        }`}
                    />
                  </span>

                  <input
                    id="register-username"
                    type="text"
                    autoComplete="username"
                    placeholder="Choose a username"
                    value={formData.username}
                    onChange={(e) =>
                      handleChange('username', e.target.value)
                    }
                    onBlur={() => handleBlur('username')}
                    aria-invalid={!!errors.username}
                    className={`w-full pl-10 pr-4 py-2.5 sm:py-3 rounded-xl border text-sm text-gray-800 placeholder:text-gray-400 bg-gray-50 outline-none transition-all duration-200 focus:bg-white focus:shadow-sm ${errors.username
                      ? 'border-green-400 focus:border-green-400 focus:ring-2 focus:ring-green-100'
                      : 'border-gray-200 focus:border-green-400 focus:ring-2 focus:ring-green-100'
                      }`}
                  />
                </div>
              </div>

              {/* 3. Phone Number */}
              <div
                className="stagger-item"
                style={{ animationDelay: '0.45s' }}
              >
                <label
                  htmlFor="register-phone"
                  className="block text-sm font-medium text-gray-700 mb-1.5"
                >
                  Phone Number
                </label>

                <PhoneInput
                  id="register-phone"
                  value={formData.phoneNumber}
                  onChange={(val) =>
                    handleChange('phoneNumber', val)
                  }
                  onBlur={() => handleBlur('phoneNumber')}
                  error={errors.phoneNumber}
                  selectedCountry={selectedCountry}
                  onCountryChange={handleCountryChange}
                  disabled={loading}
                />
              </div>

              {/* 4. Password */}
              <div
                className="stagger-item"
                style={{ animationDelay: '0.55s' }}
              >
                <label
                  htmlFor="register-password"
                  className="block text-sm font-medium text-gray-700 mb-1.5"
                >
                  Password
                </label>

                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                    <Lock
                      size={17}
                      className={`transition-colors duration-200 ${errors.password
                        ? 'text-green-400'
                        : formData.password
                          ? 'text-green-500'
                          : 'text-gray-400'
                        }`}
                    />
                  </span>

                  <input
                    id="register-password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="new-password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => {
                      const value = e.target.value
                      setFormData({ ...formData, password: value, confirmPassword: value })
                      setErrors({ ...errors, password: '', confirmPassword: '' })
                    }}
                    onBlur={() => handleBlur('password')}
                    aria-invalid={!!errors.password}
                    className={`w-full pl-10 pr-11 py-2.5 sm:py-3 rounded-xl border text-sm text-gray-800 placeholder:text-gray-400 bg-gray-50 outline-none transition-all duration-200 focus:bg-white focus:shadow-sm ${errors.password
                      ? 'border-green-400 focus:border-green-400 focus:ring-2 focus:ring-red-100'
                      : 'border-gray-200 focus:border-green-400 focus:ring-2 focus:ring-green-100'
                      }`}
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword((v) => !v)
                    }
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

                {/* Password Strength Indicator */}
                {formData.password && (
                  <div className="mt-2 space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-500">Strength:</span>

                      <span className={`font-semibold ${strengthInfo.text}`}>
                        {strengthInfo.label}
                      </span>
                    </div>

                    <div className="grid grid-cols-4 gap-1.5 h-1 w-full">
                      {[1, 2, 3, 4].map((step) => (
                        <div
                          key={step}
                          className={`h-full rounded-full transition-all duration-300 ${strengthInfo.score >= step
                            ? strengthInfo.color
                            : 'bg-gray-200'
                            }`}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Central notification: all form messages appear here */}
              <Notification
                message={notification}
                type={notificationType}
              />

              {/* 5. Confirm Password */}
              <div
                className="stagger-item"
                style={{ animationDelay: '0.65s' }}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <label
                    htmlFor="register-confirm-password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Confirm Password
                  </label>

                  {formData.confirmPassword &&
                    formData.password === formData.confirmPassword && (
                      <span className="flex items-center gap-1 text-[11px] font-medium text-green-600">
                        <Check size={13} strokeWidth={2.5} />
                        Matches
                      </span>
                    )}
                </div>

                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                    <Lock
                      size={17}
                      className={`transition-colors duration-200 ${errors.confirmPassword
                        ? 'text-green-400'
                        : formData.confirmPassword &&
                          formData.password === formData.confirmPassword
                          ? 'text-green-500'
                          : 'text-gray-400'
                        }`}
                    />
                  </span>

                  <input
                    id="register-confirm-password"
                    type={showConfirmPassword ? 'text' : 'password'}
                    autoComplete="new-password"
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={(e) =>
                      handleChange('confirmPassword', e.target.value)
                    }
                    onBlur={() => handleBlur('confirmPassword')}
                    aria-invalid={!!errors.confirmPassword}
                    className={`w-full pl-10 pr-11 py-2.5 sm:py-3 rounded-xl border text-sm text-gray-800 placeholder:text-gray-400 bg-gray-50 outline-none transition-all duration-200 focus:bg-white focus:shadow-sm ${errors.confirmPassword
                      ? 'border-green-400 focus:border-green-400 focus:ring-2 focus:ring-green-100'
                      : 'border-gray-200 focus:border-green-400 focus:ring-2 focus:ring-green-100'
                      }`}
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword((v) => !v)
                    }
                    aria-label={
                      showConfirmPassword
                        ? 'Hide confirm password'
                        : 'Show confirm password'
                    }
                    className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-gray-400 hover:text-green-500 transition-colors duration-150 focus:outline-none"
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={17} />
                    ) : (
                      <Eye size={17} />
                    )}
                  </button>
                </div>

                {/* Confirm Password Strength Indicator */}
                {formData.confirmPassword && (
                  <div className="mt-2 space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-500">Strength:</span>

                      <span className={`font-semibold ${confirmStrengthInfo.text}`}>
                        {confirmStrengthInfo.label}
                      </span>
                    </div>

                    <div className="grid grid-cols-4 gap-1.5 h-1 w-full">
                      {[1, 2, 3, 4].map((step) => (
                        <div
                          key={step}
                          className={`h-full rounded-full transition-all duration-300 ${confirmStrengthInfo.score >= step
                            ? confirmStrengthInfo.color
                            : 'bg-gray-200'
                            }`}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* 6. Referral Code */}
              <div
                className="stagger-item"
                style={{ animationDelay: '0.72s' }}
              >
                <label
                  htmlFor="register-referral"
                  className="block text-sm font-medium text-gray-700 mb-1.5"
                >
                  Referral Code <span className="text-gray-400">(Optional)</span>
                </label>

                <input
                  id="register-referral"
                  type="text"
                  placeholder="Enter referral code"
                  value={formData.referralCode}
                  onChange={(e) =>
                    handleChange(
                      'referralCode',
                      e.target.value.toUpperCase()
                    )
                  }
                  className="w-full px-4 py-2.5 sm:py-3 rounded-xl border border-gray-200 text-sm text-gray-800 placeholder:text-gray-400 bg-gray-50 outline-none transition-all duration-200 focus:bg-white focus:border-green-400 focus:ring-2 focus:ring-green-100"
                />
              </div>

              {/* CAPTCHA Code */}
              <div
                className="stagger-item"
                style={{ animationDelay: '0.75s' }}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <label
                    htmlFor="register-captcha"
                    className="block text-sm font-medium text-gray-700"
                  >
                    CAPTCHA Code
                  </label>

                  <span className="text-[11px] text-gray-400">
                    Type characters shown beside
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-12 gap-2.5 items-center">

                  {/* CAPTCHA Input */}
                  <div className="sm:col-span-6 relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                      <ShieldCheck
                        size={17}
                        className={`transition-colors duration-200 ${errors.captchaCode
                          ? 'text-green-400'
                          : formData.captchaCode
                            ? 'text-green-500'
                            : 'text-gray-400'
                          }`}
                      />
                    </span>

                    <input
                      id="register-captcha"
                      type="text"
                      autoComplete="off"
                      maxLength={6}
                      placeholder="Enter code"
                      value={formData.captchaCode}
                      onChange={(e) =>
                        handleChange(
                          'captchaCode',
                          e.target.value.toUpperCase()
                        )
                      }
                      onBlur={() => handleBlur('captchaCode')}
                      aria-invalid={!!errors.captchaCode}
                      className={`w-full pl-10 pr-3 py-2.5 sm:py-3 rounded-xl border text-sm font-mono uppercase tracking-widest text-gray-800 placeholder:text-gray-400 placeholder:normal-case placeholder:font-sans placeholder:tracking-normal bg-gray-50 outline-none transition-all duration-200 focus:bg-white focus:shadow-sm ${errors.captchaCode
                        ? 'border-green-400 focus:border-green-400 focus:ring-2 focus:ring-green-100'
                        : 'border-gray-200 focus:border-green-400 focus:ring-2 focus:ring-green-100'
                        }`}
                    />
                  </div>

                  {/* CAPTCHA Display and Refresh */}
                  <div className="sm:col-span-6 flex items-center gap-2">
                    <div
                      className="captcha-box flex-1 h-[44px] sm:h-[46px] rounded-xl border border-emerald-300/80 shadow-inner flex items-center justify-center px-3 relative overflow-hidden select-none"
                      title="CAPTCHA Code"
                    >
                      <svg
                        className="absolute inset-0 w-full h-full pointer-events-none opacity-30 text-emerald-700"
                        preserveAspectRatio="none"
                        viewBox="0 0 100 30"
                      >
                        <path
                          d="M0,15 Q25,0 50,15 T100,15"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        />

                        <path
                          d="M0,20 Q35,30 70,10 T100,20"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeDasharray="2 2"
                        />
                      </svg>

                      <span className="relative z-10 font-mono font-extrabold text-lg sm:text-xl text-emerald-950 tracking-wider">
                        {captchaCodeActual.split('').map((char, index) => (
                          <span
                            key={index}
                            style={getCharStyle(index)}
                            className="inline-block hover:scale-105 transition-transform"
                          >
                            {char}
                          </span>
                        ))}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={handleRefreshCaptcha}
                      disabled={isCaptchaRefreshing}
                      title="Generate new CAPTCHA code"
                      aria-label="Refresh CAPTCHA code"
                      className="h-[44px] w-[44px] sm:h-[46px] sm:w-[46px] shrink-0 rounded-xl border border-gray-200 bg-gray-50 hover:bg-green-50 hover:border-green-300 text-gray-500 hover:text-green-600 active:scale-95 transition-all duration-150 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-green-300 disabled:opacity-50"
                    >
                      <RefreshCw
                        size={18}
                        className={`transition-transform duration-500 ${isCaptchaRefreshing
                          ? 'animate-spin text-green-600'
                          : ''
                          }`}
                      />
                    </button>
                  </div>
                </div>
              </div>

              {/* Register Account Button */}
              <button
                id="register-submit-btn"
                type="submit"
                disabled={loading}
                style={{ animationDelay: '0.85s' }}
                className="stagger-item w-full py-3.5 rounded-xl text-white font-semibold text-sm tracking-wide bg-green-500 hover:bg-green-600 active:scale-[0.98] shadow-md shadow-green-200 hover:shadow-green-300 transition-all duration-200 mt-3 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed disabled:active:scale-100"
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

                    Creating account...
                  </span>
                ) : (
                  'Register Account'
                )}
              </button>
            </form>

            {/* Login Navigation */}
            <p
              className="stagger-item text-center text-sm text-gray-500"
              style={{
                animationDelay: '1.05s',
                marginTop: '30px',
              }}
            >
              Already have an account?{' '}

              <Link
                to="/login"
                className="text-green-600 font-semibold hover:text-green-700 hover:underline transition-colors duration-150 focus:outline-none focus:underline"
              >
                Login
              </Link>
            </p>
          </div>

          <TermsAndConditions
            acceptedTerms={acceptedTerms}
            setAcceptedTerms={setAcceptedTerms}

          />
        </div>
      </div>
    </>
  )
}