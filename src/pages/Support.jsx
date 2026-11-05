import { Link } from 'react-router-dom'
import {
  ChevronLeft,
  Headphones,
  MessageCircle,
  Mail,
  Send,
  HelpCircle,
  ExternalLink,
} from 'lucide-react'

export default function Support() {
  const supportChannels = [
    {
      title: '24/7 Live Online Chat',
      desc: 'Connect with an official Nova Power service agent',
      icon: Headphones,
      action: 'Start Live Chat',
      color: 'bg-emerald-600',
    },
    {
      title: 'Official Telegram Channel',
      desc: 'Join announcements, daily code giveaways & community',
      icon: Send,
      action: 'Join Telegram',
      color: 'bg-sky-600',
    },
    {
      title: 'WhatsApp VIP Desk',
      desc: 'Direct VIP assistance for deposit & recharge guidance',
      icon: MessageCircle,
      action: 'Open WhatsApp',
      color: 'bg-green-600',
    },
    {
      title: 'Email Support',
      desc: 'support@novapower.invest (Replies within 2 hours)',
      icon: Mail,
      action: 'Send Email',
      color: 'bg-indigo-600',
    },
  ]

  const faqs = [
    { q: 'How does daily energy yield work?', a: 'Yields are calculated based on your active energy unit capacity and credited daily at 08:00 AM.' },
    { q: 'What is the minimum withdrawal amount?', a: 'The minimum withdrawal limit is ₦1,000. Withdrawals process during platform banking hours.' },
    { q: 'How do referral commissions work?', a: 'You earn 10% on Tier 1 direct member recharges, 3% on Tier 2, and 1% on Tier 3.' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50/40 via-white to-emerald-50/30 text-gray-900 pb-16">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-emerald-100/80 px-4 py-3">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <Link
            to="/"
            className="w-9 h-9 rounded-xl border border-emerald-100 bg-emerald-50/60 text-emerald-800 flex items-center justify-center active:scale-95 transition-all"
          >
            <ChevronLeft size={20} />
          </Link>
          <h1 className="text-base font-bold text-emerald-950">Customer Service</h1>
          <div className="w-9" />
        </div>
      </header>

      {/* Main Support Options */}
      <main className="max-w-md mx-auto px-4 pt-4 space-y-4">
        <div className="p-4 rounded-3xl bg-gradient-to-br from-emerald-900 via-emerald-800 to-green-900 text-white">
          <h2 className="text-lg font-bold mb-1">We&apos;re Here to Help</h2>
          <p className="text-xs text-emerald-100/80 leading-relaxed">
            Have questions about your investment, coupons, or account? Reach our dedicated support team 24/7.
          </p>
        </div>

        {/* Channels */}
        <div className="space-y-2.5">
          {supportChannels.map((ch, idx) => {
            const Icon = ch.icon
            return (
              <div
                key={idx}
                className="p-3.5 rounded-2xl bg-white border border-emerald-100 shadow-xs flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl ${ch.color} text-white flex items-center justify-center shrink-0 shadow-xs`}>
                    <Icon size={20} />
                  </div>
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold text-gray-900">{ch.title}</h3>
                    <p className="text-[11px] text-gray-500">{ch.desc}</p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => alert(`${ch.title} (Demo Channel)`)}
                  className="px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 hover:bg-emerald-100 text-xs font-semibold shrink-0 active:scale-95 transition-all flex items-center gap-1"
                >
                  <span>Connect</span>
                  <ExternalLink size={12} />
                </button>
              </div>
            )
          })}
        </div>

        {/* FAQs */}
        <div className="rounded-2xl bg-white border border-emerald-100 p-4 shadow-xs space-y-2.5">
          <h2 className="text-xs sm:text-sm font-bold text-emerald-950 flex items-center gap-1.5">
            <HelpCircle size={15} className="text-emerald-600" />
            Frequently Asked Questions
          </h2>

          <div className="space-y-2 text-xs">
            {faqs.map((f, i) => (
              <div key={i} className="p-2.5 rounded-xl bg-emerald-50/40 border border-emerald-100/60">
                <span className="font-bold text-emerald-950 block mb-1">{f.q}</span>
                <p className="text-gray-600 leading-relaxed text-[11px]">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}

