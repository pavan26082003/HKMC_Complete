import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { HiStar } from 'react-icons/hi'
import {
  HiOutlineOfficeBuilding,
  HiOutlineDocumentText,
  HiOutlineShieldCheck,
  HiOutlineUserGroup,
} from 'react-icons/hi'
import { useInView } from '../hooks/useInView'

const trustBadges = [
  { Icon: HiOutlineOfficeBuilding, label: 'Govt. Approved' },
  { Icon: HiOutlineDocumentText,   label: 'Clear Title' },
  { Icon: HiStar,                  label: '4.9/5 Rating' },
  { Icon: HiOutlineShieldCheck,    label: 'Secure Transactions' },
  { Icon: HiOutlineUserGroup,      label: '600+ Investors' },
]

export default function Testimonials() {
  const [ref, inView] = useInView()
  const [scriptLoaded, setScriptLoaded] = useState(false)
  const [scriptError, setScriptError] = useState(false)

  // Load Elfsight platform script once
  useEffect(() => {
    if (document.querySelector('script[src="https://elfsightcdn.com/platform.js"]')) {
      setScriptLoaded(true)
      return
    }
    
    const script = document.createElement('script')
    script.src = 'https://elfsightcdn.com/platform.js'
    script.async = true
    script.onload = () => setScriptLoaded(true)
    script.onerror = () => setScriptError(true)
    document.body.appendChild(script)
  }, [])

  return (
    <section id="testimonials" className="py-10 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-14"
        >
          <div className="inline-block bg-primary/10 text-primary text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            Testimonials
          </div>
          <h2 className="section-title gold-underline">What Our Investors Say</h2>
          <p className="section-subtitle">
            Real stories from real investors who trusted HKMC with their future.
          </p>
        </motion.div>

        {/* Google Reviews via Elfsight with fallback */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
          className="min-h-[200px] sm:min-h-[300px]"
        >
          {scriptError ? (
            <div className="bg-gray-50 rounded-2xl p-8 text-center border border-gray-200">
              <div className="text-gray-400 mb-4">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Testimonials Loading</h3>
              <p className="text-gray-500 mb-4">Our customer reviews are currently loading. Please check back shortly or <a href="#contact" className="text-primary hover:underline">contact us directly</a> to hear from our happy investors.</p>
              <a href="#contact" className="btn-primary inline-flex items-center gap-2">
                Contact Us
              </a>
            </div>
          ) : !scriptLoaded ? (
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
                <p className="text-gray-600">Loading testimonials...</p>
              </div>
            </div>
          ) : (
            <div
              className="elfsight-app-781e03b8-c535-4394-9181-e6f82b135e5f"
              data-elfsight-app-lazy
            />
          )}
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="mt-12 flex flex-wrap justify-center gap-4"
        >
          {trustBadges.map((badge) => (
            <div key={badge.label} className="flex items-center gap-2 bg-light px-4 py-2 rounded-full text-sm text-gray-600">
              <badge.Icon className="w-4 h-4 text-primary" />
              <span className="font-medium">{badge.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
