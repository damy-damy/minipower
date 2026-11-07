
export default function Notification({ message, onClose }) {
  if (!message) return null

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center px-3 pointer-events-none">
      <div className="w-fit max-w-[85%] rounded-xl bg-gradient-to-r from-green-600 via-emerald-500 to-green-400 px-2 py-2 text-sm font-semibold text-white text-center shadow-lg shadow-green-200 animate-in fade-in zoom-in duration-200 break-words">
        {message}
      </div>
    </div>
  )
}
