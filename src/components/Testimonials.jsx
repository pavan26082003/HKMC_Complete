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
import { testimonials } from '../data/content'

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

        {/* Testimonials - Elfsight widget with local fallback */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
          className="min-h-[200px] sm:min-h-[300px]"
        >
          {scriptError || !scriptLoaded ? (
            // Local testimonials fallback when Elfsight fails
            <div className="bg-white rounded-2xl p-4 sm:p-6">
              <h3 className="text-lg font-semibold text-dark mb-6 text-center">What Our Investors Say</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {testimonials.slice(0, 6).map((testimonial, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.1 * index }}
                    className="bg-light rounded-xl p-4 sm:p-5 border border-gray-100 hover:border-primary/30 transition-all"
                  >
                    {/* Stars */}
                    <div className="flex items-center gap-0.5 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <HiStar key={i} className={`w-4 h-4 ${i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                      ))}
                    </div>
                    
                    {/* Testimonial text */}
                    <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-4">{testimonial.text}</p>
                    
                    {/* Author info */}
                    <div className="flex items-center gap-3 pt-3 border-t border-gray-100">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center font-semibold text-primary text-sm">
                        {testimonial.avatar}
                      </div>
                      <div>
                        <p className="font-semibold text-dark text-sm">{testimonial.name}</p>
                        <p className="text-gray-400 text-xs">{testimonial.location}</p>
                        {testimonial.project && (
                          <p className="text-primary text-xs font-medium mt-0.5">Invested in: {testimonial.project}</p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              {/* View more button */}
              <div className="text-center mt-8">
                <a href="#contact" className="btn-primary inline-flex items-center gap-2">
                  Share Your Experience
                </a>
              </div>
            </div>
          ) : (
            // Elfsight widget when it loads successfully
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
