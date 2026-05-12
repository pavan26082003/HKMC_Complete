import { useRef } from 'react'
import { motion } from 'framer-motion'
import { FiMessageSquare } from 'react-icons/fi'
import { useInView } from '../hooks/useInView'

const MESSAGE_PARAGRAPHS = [
  "From the very beginning, we have been committed to delivering excellence in every project — ensuring quality, transparency, and customer satisfaction remain at the core of our values. Each brick we lay represents trust, and each project we complete reflects our dedication to turning dreams into reality.",
  "We understand that owning a home or investing in real estate is one of the most important decisions in life. That is why our team works tirelessly to provide sustainable, innovative, and reliable solutions that exceed expectations.",
  "Our journey is fueled by the trust of our customers and the passion of our team. We are proud to have earned the confidence of our clients, and we pledge to continue building with integrity, innovation, and excellence.",
]

const CLOSING = "I warmly welcome you to explore our projects and join us in creating spaces where dreams truly come alive."




const STATS = [
  { value: '500+', label: 'Happy Families' },
  { value: '15+',  label: 'Years of Trust' },
  { value: '100%', label: 'Legal Clarity' },
  { value: '2',    label: 'Premium Projects' },
]


    export default function MDMessage() {
  const [ref, inView] = useInView()
  const containerRef = useRef(null)

  return (
    <section ref={containerRef} className="relative py-10 sm:py-12 md:py-16 lg:py-20 xl:py-24 overflow-hidden bg-white">

      {/* Decorative floating dots — right side only */}
      <div className="absolute top-0 right-0 w-1/2 h-full pointer-events-none overflow-hidden hidden lg:block">
        <svg className="absolute top-10 right-10 opacity-5" width="200" height="200" viewBox="0 0 200 200">
          <circle cx="100" cy="100" r="80" fill="none" stroke="#D4AF37" strokeWidth="20" />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className="grid lg:grid-cols-2 gap-0 items-stretch">

          {/* ── Left: MD large portrait ── */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="relative flex flex-col min-h-[350px] sm:min-h-[400px] md:min-h-[480px] lg:min-h-[520px] overflow-hidden rounded-t-2xl lg:rounded-l-2xl lg:rounded-tr-none"
          >
            {/* Full portrait image — fills the entire left panel */}
            <img
              src="/hkmc.Md.png"
              alt="Mirza Afzal Yaseen - Managing Director HKMC Builders and Developers Pvt Ltd Hyderabad"
              className="absolute inset-0 w-full h-full object-contain object-center lg:object-cover lg:object-top"
            />

            {/* Dark overlay so text is readable */}
            <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/60 to-primary/10" />

            {/* Decorative gold arc overlay */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden hidden sm:block">
              <svg className="absolute -bottom-10 -left-10 opacity-10" width="300" height="300" viewBox="0 0 400 400">
                <circle cx="200" cy="200" r="180" fill="none" stroke="#D4AF37" strokeWidth="40" />
              </svg>
            </div>

            {/* Floating dots */}
            {/* {[...Array(10)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1.5 h-1.5 rounded-full bg-accent/40"
                style={{ top: `${10 + i * 10}%`, left: `${8 + (i % 3) * 28}%` }}
                animate={{ y: [0, -10, 0], opacity: [0.3, 0.9, 0.3] }}
                transition={{ duration: 3 + i * 0.4, repeat: Infinity, delay: i * 0.3 }}
              />
            ))} */}



            {/* Name + title pinned to bottom */}
            <div className="relative mt-auto p-3 sm:p-4 md:p-6 lg:p-8 xl:p-10 text-white">
              {/* Verified badge row */}
              <div className="flex items-center gap-1.5 sm:gap-2 mb-2 sm:mb-3">
                <div className="w-4 h-4 sm:w-5 sm:h-5 bg-green-500 rounded-full flex items-center justify-center">
                  <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-green-400 text-xs font-semibold tracking-wide">Verified Director</span>
              </div>

              <h3 className="font-serif text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight mb-1">
                Mirza Afzal Yaseen
              </h3>
              <p className="text-accent font-semibold text-xs sm:text-sm tracking-widest uppercase mb-1">
                Managing Director
              </p>
              <p className="text-white/60 text-xs sm:text-sm mb-3 sm:mb-4 md:mb-6">
                HKMC Builders & Developers Pvt. Ltd.
              </p>

              {/* Stats row */}
              <div className="grid grid-cols-4 gap-1.5 sm:gap-2 lg:grid-cols-2 lg:gap-3">
                {STATS.map((s, i) => (
                  <motion.div
                    key={s.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.4 + i * 0.1, duration: 0.5 }}
                    className="bg-white/10 backdrop-blur-sm rounded-lg p-1.5 sm:p-2 lg:p-3 text-center border border-white/10 hover:border-accent/40 transition-colors"
                  >
                    <div className="font-serif text-sm sm:text-base lg:text-xl font-black text-accent leading-none">{s.value}</div>
                    <div className="text-white/70 text-[9px] sm:text-[10px] lg:text-xs mt-0.5 leading-tight">{s.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>



          {/* ── Right: Message ── */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.15 }}
            className="bg-white py-6 px-4 sm:py-8 sm:px-5 md:py-12 md:px-8 lg:py-16 lg:px-10 xl:px-14 flex flex-col justify-center relative rounded-b-2xl lg:rounded-r-2xl lg:rounded-bl-none"
          >
            {/* Section label */}
            <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4 md:mb-6">
              <div className="w-5 sm:w-6 md:w-8 h-0.5 bg-accent rounded-full" />
              <span className="text-accent text-[10px] sm:text-xs font-bold tracking-widest uppercase">
                Message from the MD
              </span>
            </div>

            {/* Headline */}
            <h2 className="font-serif text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-primary leading-tight mb-4 sm:mb-6 md:mb-8">
              Building Trust,<br />
              <span className="text-accent">One Dream at a Time</span>
            </h2>

            {/* Opening quote */}
            <div className="relative mb-4 sm:mb-6 md:mb-8">
              <FiMessageSquare className="absolute -top-2 sm:-top-3 -left-1 sm:-left-2 w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 text-accent/20 rotate-180" />
              <p className="font-serif text-sm sm:text-base md:text-lg lg:text-xl text-primary font-semibold italic leading-relaxed pl-4 sm:pl-6 border-l-2 sm:border-l-4 border-accent">
                "Our vision is to create not just structures, but lasting landmarks that enrich lives and stand the test of time."
              </p>
            </div>

            {/* Body paragraphs */}
            <div className="space-y-2.5 sm:space-y-3 md:space-y-4 mb-4 sm:mb-6 md:mb-8">
              {MESSAGE_PARAGRAPHS.map((para, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.15, duration: 0.6 }}
                  className="text-gray-600 leading-relaxed text-xs sm:text-sm md:text-base"
                >
                  {para}
                </motion.p>
              ))}
            </div>

            {/* Closing line */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.8 }}
              className="text-primary font-semibold text-xs sm:text-sm md:text-base italic mb-4 sm:mb-6 md:mb-8"
            >
              {CLOSING}
            </motion.p>

            {/* Signature */}
            <div className="flex items-center gap-2 sm:gap-3 md:gap-4 pt-3 sm:pt-4 md:pt-6 border-t border-gray-100">
              <div className="flex-1 min-w-0">
                {/* Stylised signature text */}
                <p
                  className="text-primary font-bold text-base sm:text-lg md:text-xl leading-none mb-1 truncate"
                  style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic' }}
                >
                  Mirza Afzal Yaseen
                </p>
                <p className="text-gray-400 text-[10px] sm:text-xs tracking-wide">Managing Director, HKMC Builders</p>
              </div>
              {/* Gold seal */}
              <div className="ml-auto w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full border-2 border-accent flex items-center justify-center shrink-0">
                <span className="font-serif text-accent font-black text-sm sm:text-base md:text-lg">MD</span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
