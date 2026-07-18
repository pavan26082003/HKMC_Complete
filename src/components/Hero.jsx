import { motion } from 'framer-motion'
import { FiPhone, FiFileText, FiCalendar } from 'react-icons/fi'
import { PHONE_CALL } from '../data/content'

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-[100svh] sm:min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background — responsive hero image */}
      <div className="absolute inset-0">
        <picture>
          {/* Mobile — use PNG image for mobile view */}
          <source media="(max-width: 639px)" srcSet="/mobile-hero.png" type="image/png" />
          {/* Tablet and Desktop — use hero.webp for larger screens */}
          <source srcSet="/hero.webp" type="image/webp" />
          <img
            src="/hero.webp"
            alt="Premium open plots in Hyderabad by HKMC Builders and Developers - Government approved investment land"
            className="w-full h-full object-cover object-center"
            loading="eager"
            fetchPriority="high"
            decoding="async"
            width="1920"
            height="1080"
          />
        </picture>
        <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary/75 to-blue-900/80" />
      </div>

      {/* Animated background shapes - reduced complexity */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          className="absolute -top-20 -right-20 sm:-top-40 sm:-right-40 w-64 h-64 sm:w-96 sm:h-96 border border-accent/20 rounded-full"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
          className="absolute -bottom-20 -left-20 sm:-bottom-40 sm:-left-40 w-80 h-80 sm:w-[500px] sm:h-[500px] border border-white/10 rounded-full"
        />
      </div>
      

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-16 sm:pt-20">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-4 sm:mb-6"
        >
          <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
          {/* <span className="text-white/90 text-sm font-medium">Govt. Approved Projects — Telangan</span> */}
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-serif text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-3 sm:mb-6 px-2"
        >
          Premium Open Plots
          <br />
          <span className="text-accent">for Smart Investment</span>
        </motion.h1>

        {/* Subtext — hidden on mobile to save space */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="hidden sm:block text-white/85 text-sm sm:text-base md:text-lg max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed px-4"
        >
          HKMC Builders & Developers — Trusted by 600+ investors across Telangana.
          Secure your future with farm Plots, residential plots, investment land, and gated community developments in Hyderabad's fastest-growing corridors including Shadnagar, Kodangal, near ORR and NH-163.
        </motion.p>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="grid grid-cols-4 sm:flex sm:flex-wrap justify-center gap-3 sm:gap-6 md:gap-10 mb-6 sm:mb-10 max-w-lg sm:max-w-none mx-auto"
        >
          {[
            { value: '15+', label: 'Years' },
            { value: '600+', label: 'Investors' },
            { value: '3', label: 'Projects' },
            { value: '100%', label: 'Legal' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-accent font-bold text-base sm:text-xl md:text-2xl font-serif">{stat.value}</div>
              <div className="text-white/70 text-xs sm:text-sm">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center px-4 max-w-2xl mx-auto"
        >
          <a href="#contact" className="btn-accent text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-4 w-full sm:w-auto flex items-center justify-center gap-2">
            <FiCalendar className="w-4 sm:w-5 h-4 sm:h-5" />
            Book Site Visit
          </a>
          <a href="#projects" className="btn-outline text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-4 w-full sm:w-auto flex items-center justify-center gap-2">
            <FiFileText className="w-4 sm:w-5 h-4 sm:h-5" />
            View Projects
          </a>
          <a
            href={`tel:${PHONE_CALL}`}
            className="flex items-center gap-2 text-white border border-white/30 rounded-lg px-6 sm:px-8 py-3 sm:py-4 hover:bg-white/10 transition-all w-full sm:w-auto justify-center text-sm sm:text-base"
          >
            <FiPhone className="w-4 sm:w-5 h-4 sm:h-5" />
            Call Now
          </a>
        </motion.div>
        

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >

          
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center pt-2"
          >
            <div className="w-1 h-2 bg-white/60 rounded-full" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
