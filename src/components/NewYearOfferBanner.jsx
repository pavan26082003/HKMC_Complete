import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiOutlineGift, HiX, HiSparkles } from 'react-icons/hi'
import { FiPhone } from 'react-icons/fi'
import { RiWhatsappLine } from 'react-icons/ri'
import { PHONE_CALL, PHONE_WHATSAPP } from '../data/content'

export default function NewYearOfferBanner() {
  const [dismissed, setDismissed] = useState(false)

  return (
    <AnimatePresence>
      {!dismissed && (
        <motion.div
          initial={{ opacity: 0, y: -80 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -80, transition: { duration: 0.3 } }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="relative z-40 overflow-hidden"
          style={{
            background:
              'linear-gradient(135deg, #0f172a 0%, #1e293b 25%, #1E3A8A 50%, #1e293b 75%, #0f172a 100%)',
          }}
        >
          {/* Shimmer overlay */}
          <div className="absolute inset-0 opacity-30 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/20 to-transparent" />
          </div>

          {/* Floating sparkles — desktop only to keep mobile clean */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden hidden sm:block">
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  top: `${10 + (i * 7) % 80}%`,
                  left: `${10 + (i * 13) % 80}%`,
                }}
                animate={{ y: [0, -18, 0], opacity: [0, 1, 0], scale: [0.5, 1.2, 0.5] }}
                transition={{ duration: 3 + (i % 3), repeat: Infinity, delay: i * 0.25, ease: 'easeInOut' }}
              >
                <HiSparkles className="text-accent w-3 h-3" />
              </motion.div>
            ))}
          </div>

          {/* Glow orbs */}
          <div className="absolute top-0 left-1/4 w-24 h-24 bg-accent/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-1/4 w-32 h-32 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />

          {/* ── Close button — always top-right ── */}
          <button
            onClick={() => setDismissed(true)}
            className="absolute top-2 right-2 sm:top-3 sm:right-3 z-10 text-white/40 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-white/10"
            aria-label="Dismiss banner"
          >
            <HiX className="w-4 h-4" />
          </button>

          <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-3 sm:py-4 relative">

            {/* ── Mobile layout: stacked ── */}
            <div className="flex flex-col sm:hidden gap-2.5 pr-6">

              {/* Row 1: gift icon + badge */}
              <div className="flex items-center gap-2.5">
                <motion.div
                  animate={{ rotate: [-10, 10, -10], y: [0, -4, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  className="relative shrink-0"
                >
                  <div className="w-9 h-9 bg-gradient-to-br from-accent via-yellow-400 to-accent rounded-xl flex items-center justify-center shadow-lg shadow-accent/50 border-2 border-yellow-300">
                    <HiOutlineGift className="w-5 h-5 text-dark" />
                  </div>
                  <motion.div
                    animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0, 0.6] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inset-0 rounded-xl border-2 border-accent"
                  />
                </motion.div>
                <motion.span
                  animate={{ scale: [1, 1.04, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="bg-gradient-to-r from-accent via-yellow-300 to-accent text-dark text-[10px] font-black px-2.5 py-1 rounded-full tracking-wide uppercase shadow border border-yellow-300"
                >
                  🎊 MEGA CUSTOMER MELA OFFER
                </motion.span>
              </div>

              {/* Row 2: pricing */}
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-white font-semibold text-xs">Book your plot at</span>
                <span className="text-white/50 line-through text-xs">₹3,500</span>
                <motion.span
                  animate={{ scale: [1, 1.08, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="font-serif text-accent font-black text-xl leading-none"
                >
                  ₹2,200/sq.yd
                </motion.span>
                <span className="bg-green-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">SAVE 43%</span>
                <span className="flex items-center gap-1 text-accent font-semibold text-xs">
                  <HiOutlineGift className="w-3.5 h-3.5 shrink-0" /> + Gift ₹10K
                </span>
              </div>

              {/* Row 3: CTAs */}
              <div className="flex gap-2">
                <a
                  href={`tel:${PHONE_CALL}`}
                  className="flex-1 flex items-center justify-center gap-1.5 bg-gradient-to-r from-accent via-yellow-400 to-accent text-dark text-xs font-black py-2.5 rounded-xl shadow-lg border border-yellow-300"
                >
                  <FiPhone className="w-3.5 h-3.5" /> Call Now
                </a>
                <a
                  href={`https://wa.me/91${PHONE_WHATSAPP}?text=Hey, I want this Mega Customer Mela Offer! Please share details about the ₹2,200/sq.yd plots and the surprise gift worth ₹10,000.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-1.5 bg-gradient-to-r from-green-500 to-green-600 text-white text-xs font-black py-2.5 rounded-xl shadow-lg"
                >
                  <RiWhatsappLine className="w-3.5 h-3.5" /> WhatsApp
                </a>
              </div>
            </div>

            {/* ── Desktop layout: single row ── */}
            <div className="hidden sm:flex items-center justify-between gap-4 pr-8">

              {/* Left: icon + content */}
              <div className="flex items-center gap-4 flex-1 min-w-0">
                <motion.div
                  animate={{ rotate: [-10, 10, -10], y: [0, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  className="relative shrink-0"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-accent via-yellow-400 to-accent rounded-2xl flex items-center justify-center shadow-2xl shadow-accent/50 border-2 border-yellow-300">
                    <HiOutlineGift className="w-7 h-7 text-dark" />
                  </div>
                  <motion.div
                    animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0, 0.6] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inset-0 rounded-2xl border-2 border-accent"
                  />
                </motion.div>

                <div className="flex flex-col gap-1.5 min-w-0">
                  <motion.span
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="inline-block bg-gradient-to-r from-accent via-yellow-300 to-accent text-dark text-xs font-black px-3 py-1 rounded-full tracking-wide uppercase shadow-lg border border-yellow-300 w-fit"
                  >
                    🎊 MEGA CUSTOMER MELA OFFER
                  </motion.span>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <span className="text-white font-semibold text-sm">Book your plot at</span>
                    <span className="text-white/50 line-through text-sm">₹3,500</span>
                    <motion.span
                      animate={{ scale: [1, 1.08, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="font-serif text-accent font-black text-2xl leading-none"
                    >
                      ₹2,200/sq.yd
                    </motion.span>
                    <span className="bg-green-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">SAVE 43%</span>
                    <span className="text-white/30">•</span>
                    <motion.span
                      animate={{ x: [0, 3, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="flex items-center gap-1.5 text-accent font-semibold text-sm"
                    >
                      <HiOutlineGift className="w-4 h-4 shrink-0" /> + Surprise Gift Worth ₹10,000
                    </motion.span>
                  </div>
                </div>
              </div>

              {/* Right: CTAs */}
              <div className="flex items-center gap-2 shrink-0">
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href={`tel:${PHONE_CALL}`}
                  className="flex items-center gap-2 bg-gradient-to-r from-accent via-yellow-400 to-accent hover:from-yellow-400 hover:to-accent text-dark text-sm font-black px-4 py-2.5 rounded-xl shadow-lg shadow-accent/30 border border-yellow-300 whitespace-nowrap"
                >
                  <FiPhone className="w-4 h-4" /> Call Now
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href={`https://wa.me/91${PHONE_WHATSAPP}?text=Hey, I want this Mega Customer Mela Offer! Please share details about the ₹2,200/sq.yd plots and the surprise gift worth ₹10,000.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white text-sm font-black px-4 py-2.5 rounded-xl shadow-lg shadow-green-500/30 whitespace-nowrap"
                >
                  <RiWhatsappLine className="w-4 h-4" /> WhatsApp
                </motion.a>
              </div>
            </div>

          </div>

          {/* Bottom accent line */}
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-accent to-transparent" />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
