export default function Notification({ message, onClose }) {
  if (!message) return null

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-none">
      <div className="rounded-xl bg-emerald-600 px-6 py-2 text-xl font-semibold text-white shadow-xl animate-in fade-in zoom-in duration-200">
        {message}
      </div>
    </div>
  )
}