import { Link } from 'react-router-dom'

function TermsAndCondition() {
    return (
        <div className="min-h-screen bg-gray-50 px-6 py-10">

            <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow">

                <h1 className="text-3xl font-bold mb-6">
                    Terms and Conditions
                </h1>

                <p className="text-gray-600 mb-6">
                    Please read these terms and conditions carefully before using our platform.
                </p>

                <h2 className="text-xl font-semibold mb-2">
                    1. Acceptance of Terms
                </h2>

                <p className="text-gray-600 mb-6">
                    By creating an account, you agree to follow the terms and conditions
                    of this platform.
                </p>

                <Link
                    to="/register"
                    className="text-blue-600 hover:underline"
                >
                    Back to Register
                </Link>

            </div>
        </div>
    )
}

export default TermsAndCondition