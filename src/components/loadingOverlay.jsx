
export default function LoadingOverlay() {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-transparent pointer-events-none">

            <div className="relative flex flex-col items-center gap-2 p-4 rounded-2xl bg-gradient-to-br from-white via-green-50 to-emerald-100 border border-green-200 shadow-xl shadow-green-200/60 animate-[popIn_0.35s_ease-out]">

                {/* Animated glow */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-green-200/30 to-emerald-300/30 animate-pulse pointer-events-none" />

                {/* Logo */}
                <img
                    src="/mini.png"
                    alt="MiniPower"
                    className="relative z-10 h-9 w-9 object-contain animate-[logoFloat_1.5s_ease-in-out_infinite]"
                />

                {/* Loading text */}
                <p className="relative z-10 text-xs font-semibold tracking-wide text-green-600">
                    Loading...
                </p>

            </div>

            <style>{`
        @keyframes popIn {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes logoFloat {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-4px);
          }
        }
      `}</style>

        </div>
    )
}
