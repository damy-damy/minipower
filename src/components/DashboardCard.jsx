import { Link } from 'react-router-dom'

export default function DashboardCard({
  icon: Icon,
  title,
  subtitle,
  onClick,
  to,
  badge,
  iconColor = 'text-emerald-700',
  bgColor = 'bg-emerald-500/10',
}) {
  const content = (
    <div className="w-full h-full flex flex-col items-center justify-center text-center p-3 sm:p-4 rounded-2xl bg-white border border-emerald-100/90 shadow-xs hover:shadow-md hover:border-emerald-300/80 hover:-translate-y-0.5 active:scale-95 transition-all duration-200 group select-none relative overflow-hidden">
      {/* Decorative subtle ambient hover gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-50/0 via-emerald-50/0 to-emerald-50/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none" />

      {/* Badge if present */}
      {badge && (
        <span className="absolute top-2 right-2 text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 leading-none">
          {badge}
        </span>
      )}

      {/* Icon squircle */}
      <div
        className={`w-12 h-12 rounded-xl flex items-center justify-center mb-2 transition-transform duration-200 group-hover:scale-110 shadow-xs ${bgColor} ${iconColor}`}
      >
        <Icon size={22} strokeWidth={2.2} />
      </div>

      {/* Title */}
      <span className="text-xs sm:text-sm font-semibold text-gray-800 tracking-tight leading-tight group-hover:text-emerald-900 transition-colors">
        {title}
      </span>

      {/* Subtitle if provided */}
      {subtitle && (
        <span className="text-[10px] text-gray-400 mt-0.5 leading-tight">
          {subtitle}
        </span>
      )}
    </div>
  )

  if (to) {
    return (
      <Link to={to} className="block w-full focus:outline-none focus:ring-2 focus:ring-emerald-400 rounded-2xl">
        {content}
      </Link>
    )
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full text-left focus:outline-none focus:ring-2 focus:ring-emerald-400 rounded-2xl"
    >
      {content}
    </button>
  )
}

