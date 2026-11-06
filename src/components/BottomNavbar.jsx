
import { Link, useLocation } from 'react-router-dom'
import { Home, Users, Package, User, TrendingUp } from 'lucide-react'

export default function BottomNavbar() {
  const location = useLocation()
  const currentPath = location.pathname

  const navItems = [
    {
      id: 'home',
      label: 'Home',
      icon: Home,
      path: '/',
      activePaths: ['/', '/home', '/dashboard'],
    },
    {
      id: 'team',
      label: 'Team',
      icon: Users,
      path: '/team',
      activePaths: ['/team'],
    },
    {
      id: 'product',
      label: 'Product',
      icon: Package,
      path: '/product',
      activePaths: ['/product', '/product-details'],
    },
    {
      id: 'vip',
      label: 'VIP',
      icon: TrendingUp,
      path: '/income',
      activePaths: ['/income'],
    },
    {
      id: 'mine',
      label: 'Mine',
      icon: User,
      path: '/mine',
      activePaths: ['/mine', '/settings'],
    },
  ]

  const isItemActive = (item) => {
    return item.activePaths.includes(currentPath)
  }

  return (
    <nav
      aria-label="Bottom Navigation"
      className="fixed bottom-0 left-0 right-0 z-50 w-full bg-white/95 backdrop-blur-md border-t border-emerald-100 shadow-[0_-4px_25px_rgba(15,81,50,0.06)] pb-[env(safe-area-inset-bottom)]"
    >
      <div className="max-w-md mx-auto px-3 sm:px-6 h-16 flex items-center justify-between">
        {navItems.map((item) => {
          const active = isItemActive(item)
          const Icon = item.icon

          return (
            <Link
              key={item.id}
              to={item.path}
              className={`flex-1 flex flex-col items-center justify-center py-1 transition-all duration-200 select-none group relative ${active
                  ? 'text-emerald-700 font-bold'
                  : 'text-gray-400 hover:text-emerald-600 font-medium'
                }`}
            >
              <div
                className={`w-9 h-7 flex items-center justify-center rounded-xl transition-all duration-200 ${active
                    ? 'bg-emerald-50 text-emerald-700 scale-105'
                    : 'group-hover:scale-105'
                  }`}
              >
                <Icon size={20} strokeWidth={active ? 2.4 : 1.8} />
              </div>

              <span className="text-[11px] leading-tight tracking-tight mt-0.5">
                {item.label}
              </span>

              {active && (
                <span className="absolute -top-1 w-1.5 h-1.5 rounded-full bg-emerald-600" />
              )}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
