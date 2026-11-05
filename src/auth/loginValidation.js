// loginValidation.js

export const validateUsername = (username) => {
    if (!username.trim()) {
        return 'Username is required.'
    }

    if (username.trim().length < 3) {
        return 'Username must be at least 3 characters.'
    }

    return ''
}

export const validatePassword = (password) => {
    if (!password) {
        return 'Password is required.'
    }

    if (password.length < 6) {
        return 'Password must be at least 6 characters.'
    }

    return ''
}

export const validateLoginForm = (username, password) => {
    return {
        username: validateUsername(username),
        password: validatePassword(password),
    }
}