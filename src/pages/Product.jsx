
import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ChevronLeft,
  BatteryCharging,
  BatteryFull,
  Sun,
  Lightbulb,
  Plug,
} from 'lucide-react'

import BottomNavbar from '../components/BottomNavbar'
import Notification from '../components/notificationCom'
import { SAMPLE_PRODUCTS } from '../data/sampleData'

const PRODUCT_IMAGES = {
  'power-tank-1':
    'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=500',
  'power-bank-2':
    'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=500',
  'solar-panel-3':
    'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=500',
  'rechargeable-light-4':
    'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500',
  'power-accessories-5':
    'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=500',
}

const getProductIcon = (id) => {
  if (id.includes('power-tank')) return BatteryCharging
  if (id.includes('power-bank')) return BatteryFull
  if (id.includes('solar-panel')) return Sun
  if (id.includes('rechargeable-light')) return Lightbulb
  return Plug
}

export default function Product() {
  const [toastMessage, setToastMessage] = useState('')

  const handleInvest = (product) => {
    setToastMessage('Purchased Successfully!')

    setTimeout(() => {
      setToastMessage('')
    }, 2500)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50/50 via-white to-emerald-50/40 text-gray-900 pb-28">

      <Notification
        message={toastMessage}
        onClose={() => setToastMessage('')}
      />

      <main className="max-w-2xl mx-auto px-3 space-y-3">

        {/* Product Title and Back Icon */}
        <div className="flex items-center gap-2 mb-1">
          <Link
            to="/"
            className="w-9 h-9 rounded-xl border border-emerald-100 bg-emerald-50 text-emerald-800 flex items-center justify-center shrink-0"
          >
            <ChevronLeft size={21} />
          </Link>

          <h1 className="text-lg text-center font-bold text-gray-700">
            Product Center
          </h1>
        </div>

        {/* Product Cards */}
        {SAMPLE_PRODUCTS.map((product) => {
          const ProductIcon = getProductIcon(product.id)

          return (
            <article
              key={product.id}
              className="bg-white rounded-2xl border border-emerald-100 shadow-sm p-3 sm:p-4 hover:shadow-md transition-all"
            >

              <div className="flex items-start gap-3 sm:gap-4">

                {/* Product Image */}
                <div className="w-24 h-28 sm:w-32 sm:h-32 shrink-0 rounded-2xl overflow-hidden bg-emerald-50">
                  <img
                    src={PRODUCT_IMAGES[product.id]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>

                {/* Product Information */}
                <div className="flex-1 min-w-0">

                  {/* Product Name and Tag */}
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-sm sm:text-base font-extrabold text-gray-900">
                      {product.name}
                    </h3>

                    <span className="text-[9px] sm:text-[10px] font-bold px-2 py-1 rounded-full bg-lime-100 text-green-800">
                      {product.tag}
                    </span>
                  </div>

                  {/* Product Capacity */}
                  <div className="flex items-center gap-1 mt-1 text-xs text-gray-500">
                    <ProductIcon size={13} className="text-emerald-600" />
                    <span>{product.capacity}</span>
                  </div>

                  {/* Investment Details */}
                  <div className="grid grid-cols-3 gap-1 mt-4">

                    <div>
                      <p className="text-[9px] sm:text-[10px] text-gray-500">
                        Investment
                      </p>
                      <p className="text-xs sm:text-sm font-extrabold text-emerald-800 mt-1">
                        ₦{product.price.toLocaleString()}
                      </p>
                    </div>

                    <div className="border-x border-gray-200 px-2">
                      <p className="text-[9px] sm:text-[10px] text-gray-500">
                        Daily Income
                      </p>
                      <p className="text-xs sm:text-sm font-extrabold text-green-600 mt-1">
                        ₦{product.dailyIncome.toLocaleString()}
                      </p>
                    </div>

                    <div className="pl-1">
                      <p className="text-[9px] sm:text-[10px] text-gray-500">
                        Total (60 Days)
                      </p>
                      <p className="text-xs sm:text-sm font-extrabold text-emerald-800 mt-1">
                        ₦{product.totalRevenue.toLocaleString()}
                      </p>
                    </div>

                  </div>

                  {/* Buy Button */}
                  <div className="flex justify-end mt-4">
                    <button
                      type="button"
                      onClick={() => handleInvest(product)}
                      className="px-8 py-2.5 rounded-full bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 text-white text-xs font-bold shadow-md active:scale-95 transition-all"
                    >
                      Buy
                    </button>
                  </div>

                </div>
              </div>
            </article>
          )
        })}

      </main>

      <BottomNavbar />

    </div>
  )
}
