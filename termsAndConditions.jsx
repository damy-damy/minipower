function TermsAndConditions({ acceptedTerms, setAcceptedTerms, error }) {
    return (
        <div className="mt-4">
            <label className="flex items-start gap-3 cursor-pointer">
                <input
                    type="checkbox"
                    checked={acceptedTerms}
                    onChange={(e) => setAcceptedTerms(e.target.checked)}
                    className="mt-1 h-4 w-4 accent-green-600 cursor-pointer"
                />

                <span className="text-sm text-gray-600">
                    I agree to the{' '}
                    <a
                        href="/terms"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-600 font-semibold hover:underline"
                    >
                        Terms and Conditions
                    </a>
                    {' '}and Privacy Policy.
                </span>
            </label>

            {error && (
                <p className="text-red-500 text-xs mt-2">
                    {error}
                </p>
            )}
        </div>
    )
}

export default TermsAndConditions