import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { HiStar } from 'react-icons/hi'
import {
  HiOutlineOfficeBuilding,
  HiOutlineDocumentText,
  HiOutlineShieldCheck,
  HiOutlineUserGroup,
} from 'react-icons/hi'
import { testimonials } from '../data/content'
import { useInView } from '../hooks/useInView'

const trustBadges = [
  { Icon: HiOutlineOfficeBuilding, label: 'HMDA Approved' },
  { Icon: HiOutlineDocumentText,   label: 'DTCP Certified' },
  { Icon: HiStar,                  label: '4.9/5 Rating' },
  { Icon: HiOutlineShieldCheck,    label: 'Secure Transactions' },
  { Icon: HiOutlineUserGroup,      label: '600+ Investors' },
]

function StarRating({ rating }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <HiStar key={i} className={`w-4 h-4 ${i < rating ? 'text-accent' : 'text-gray-300'}`} />
      ))}
    </div>
  )
}

function TestimonialCard({ testimonial }) {
  return (
    <div className="bg-light rounded-2xl p-6 hover:shadow-lg transition-shadow flex-shrink-0 w-[280px] sm:w-[320px]">
      <StarRating rating={testimonial.rating} />
      <p className="text-gray-600 text-sm leading-relaxed mt-3 mb-4">"{testimonial.text}"</p>
      <div className="flex items-center gap-3 mt-auto">
        <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm">
          {testimonial.avatar}
        </div>
        <div>
          <div className="font-semibold text-dark text-sm">{testimonial.name}</div>
          <div className="text-gray-400 text-xs">{testimonial.location} · {testimonial.project}</div>
        </div>
      </div>
    </div>
  )
}

export default function Testimonials() {
  const [ref, inView] = useInView()
  const [isPaused, setIsPaused] = useState(false)

  // Duplicate testimonials for seamless loop
  const duplicatedTestimonials = [...testimonials, ...testimonials, ...testimonials]

  return (
    <section id="testimonials" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="inline-block bg-primary/10 text-primary text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            Testimonials
          </div>
          <h2 className="section-title gold-underline">What Our Investors Say</h2>
          <p className="section-subtitle">
            Real stories from real investors who trusted HKMC with their future.
          </p>
        </motion.div>

        {/* Continuous Scrolling Carousel */}
        <div className="relative overflow-hidden">
          <div 
            className="flex gap-6"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <motion.div
              className="flex gap-6"
              animate={{
                x: isPaused ? undefined : [0, -((280 + 24) * testimonials.length)],
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: testimonials.length * 5,
                  ease: "linear",
                },
              }}
            >
              {duplicatedTestimonials.map((testimonial, index) => (
                <TestimonialCard key={`${testimonial.name}-${index}`} testimonial={testimonial} />
              ))}
            </motion.div>
          </div>
        </div>

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
