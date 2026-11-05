
// registerValidation.js

export const validateFullName = (fullName) => {
  if (!fullName || !fullName.trim()) {
    return 'Full name is required.'
  }

  const trimmed = fullName.trim()

  if (trimmed.length < 2) {
    return 'Full name must be at least 2 characters.'
  }

  const nameRegex = /^[a-zA-Z\s'-]+$/

  if (!nameRegex.test(trimmed)) {
    return 'Full name can only contain letters, spaces, and hyphens.'
  }

  return ''
}

export const validateUsername = (username) => {
  if (!username || !username.trim()) {
    return 'Username is required.'
  }

  const trimmed = username.trim()

  if (trimmed.length < 3) {
    return 'Username must be at least 3 characters.'
  }

  if (trimmed.length > 20) {
    return 'Username must not exceed 20 characters.'
  }

  const usernameRegex = /^[a-zA-Z0-9_]+$/

  if (!usernameRegex.test(trimmed)) {
    return 'Username can only contain letters, numbers, and underscores.'
  }

  return ''
}

export const validatePhoneNumber = (phone) => {
  if (!phone || !phone.trim()) {
    return 'Phone number is required.'
  }

  const trimmed = phone.trim()
  const digitsOnly = trimmed.replace(/[\s\-()+]/g, '')

  if (!/^\d+$/.test(digitsOnly)) {
    return 'Phone number must contain only numbers.'
  }

  if (digitsOnly.length < 7 || digitsOnly.length > 15) {
    return 'Please enter a valid phone number (7 to 15 digits).'
  }

  return ''
}

export const validatePassword = (password) => {
  if (!password) {
    return 'Password is required.'
  }

  if (password.length < 8) {
    return 'Password must be at least 8 characters long.'
  }

  const hasLetter = /[a-zA-Z]/.test(password)
  const hasNumber = /[0-9]/.test(password)

  if (!hasLetter || !hasNumber) {
    return 'Password must contain both letters and numbers.'
  }

  return ''
}

export const validateConfirmPassword = (password, confirmPassword) => {
  if (!confirmPassword) {
    return 'Please confirm your password.'
  }

  if (password !== confirmPassword) {
    return 'Passwords do not match.'
  }

  return ''
}

// Invitation Code Validation
export const validateInvitationCode = (invitationCode) => {
  if (!invitationCode || !invitationCode.trim()) {
    return 'Please enter your invitation code.'
  }

  return ''
}

export const validateCaptcha = (enteredCode, actualCode) => {
  if (!enteredCode || !enteredCode.trim()) {
    return 'CAPTCHA code is required.'
  }

  if (
    enteredCode.trim().toUpperCase() !==
    (actualCode || '').trim().toUpperCase()
  ) {
    return 'CAPTCHA code is incorrect. Please try again.'
  }

  return ''
}

/**
 * Calculates password strength score (0 to 4).
 */
export const getPasswordStrength = (password) => {
  if (!password) {
    return {
      score: 0,
      label: '',
      color: 'bg-gray-200',
      text: 'text-gray-400',
    }
  }

  let score = 0

  if (password.length >= 8) score += 1
  if (password.length >= 12) score += 1
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score += 1
  if (/\d/.test(password)) score += 1
  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score += 1

  const normalizedScore = Math.min(4, Math.max(1, score))

  switch (normalizedScore) {
    case 1:
      return {
        score: 1,
        label: 'Weak',
        color: 'bg-red-500',
        text: 'text-red-500',
      }

    case 2:
      return {
        score: 2,
        label: 'Fair',
        color: 'bg-amber-500',
        text: 'text-amber-500',
      }

    case 3:
      return {
        score: 3,
        label: 'Good',
        color: 'bg-emerald-500',
        text: 'text-emerald-500',
      }

    case 4:
      return {
        score: 4,
        label: 'Strong',
        color: 'bg-green-600',
        text: 'text-green-600',
      }

    default:
      return {
        score: 0,
        label: '',
        color: 'bg-gray-200',
        text: 'text-gray-400',
      }
  }
}

/**
 * Generates a random alphanumeric CAPTCHA string.
 */
export const generateCaptchaCode = (length = 6) => {
  const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ'
  let result = ''

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length)
    result += chars[randomIndex]
  }

  return result
}

// Complete Registration Form Validation
export const validateRegisterForm = ({
  username,
  phoneNumber,
  password,
  confirmPassword,
  invitationCode,
  captchaCode,
  actualCaptcha,
}) => {
  return {
    username: validateUsername(username),
    phoneNumber: validatePhoneNumber(phoneNumber),
    password: validatePassword(password),
    confirmPassword: validateConfirmPassword(password, confirmPassword),
    invitationCode: validateInvitationCode(invitationCode),
    captchaCode: validateCaptcha(captchaCode, actualCaptcha),
  }
}
