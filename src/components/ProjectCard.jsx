import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { FiMapPin } from 'react-icons/fi'
import { RiWhatsappLine } from 'react-icons/ri'
import { HiCheckCircle } from 'react-icons/hi'
import { PHONE_WHATSAPP } from '../data/content'


export default function ProjectCard({ project, index = 0 }) {
  const [activeImg, setActiveImg] = useState(0)
  const [loadedImgs, setLoadedImgs] = useState({ 0: true }) // first image considered loaded
  const isHoveredRef = useRef(false)
  const swipeStart = useRef(null)
  const swiped = useRef(false)
  const navigate = useNavigate()

  // Preload ALL gallery images up front so switching is instant
  useEffect(() => {
    project.gallery.forEach((src, i) => {
      if (i === 0) return // first already shown
      const img = new Image()
      img.src = src
      img.onload = () => setLoadedImgs(prev => ({ ...prev, [i]: true }))
    })
  }, [project.gallery])

  // Auto-rotate every 5s — only switch when next image is already loaded
  useEffect(() => {
    if (project.gallery.length <= 1) return
    const timer = setInterval(() => {
      if (isHoveredRef.current) return
      setActiveImg(prev => {
        const next = (prev + 1) % project.gallery.length
        // Only advance if next image is loaded
        return loadedImgs[next] ? next : prev
      })
    }, 5000)
    return () => clearInterval(timer)
  }, [project.gallery.length, loadedImgs])

  // Use customPrices if available for specific sizes, otherwise calculate
  const totalPrice = (size) => {
    if (project.customPrices?.[size]) {
      return project.customPrices[size].toLocaleString('en-IN')
    }
    return (size * project.pricePerSqYard).toLocaleString('en-IN')
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      whileHover={{ y: -6, transition: { duration: 0.25 } }}
      onMouseEnter={() => { isHoveredRef.current = true }}
      onMouseLeave={() => { isHoveredRef.current = false }}
      className="relative rounded-2xl overflow-hidden flex flex-col transition-shadow duration-300 bg-white shadow-lg hover:shadow-2xl"
    >
      {/* ── Image gallery ── */}
      <div
        className="relative overflow-hidden cursor-pointer group h-44 sm:h-60 touch-pan-y"
        onClick={() => {
          if (swiped.current) { swiped.current = false; return }
          navigate(`/project/${project.id}`)
        }}
        onTouchStart={(e) => {
          if (e.touches.length !== 1) return
          swipeStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }
        }}
        onTouchEnd={(e) => {
          const start = swipeStart.current
          swipeStart.current = null
          const point = e.changedTouches?.[0]
          if (!start || !point || project.gallery.length < 2) return
          const dx = point.clientX - start.x
          const dy = point.clientY - start.y
          if (Math.abs(dx) < 48 || Math.abs(dx) < Math.abs(dy) * 1.2) return
          swiped.current = true
          isHoveredRef.current = true
          setActiveImg((i) => (i + (dx < 0 ? 1 : -1) + project.gallery.length) % project.gallery.length)
          setTimeout(() => { isHoveredRef.current = false }, 6000)
        }}
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={activeImg}
            src={project.gallery[activeImg]}
            alt={`${project.name} - ${project.location} open plots by HKMC Builders`}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            loading="lazy"
            decoding="async"
            width="800"
            height="600"
            className={`w-full h-full ${project.galleryFit === 'contain' ? 'object-contain bg-[#f4f6f8]' : 'object-cover group-hover:scale-105'} transition-transform duration-700`}
          />
        </AnimatePresence>

        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

        {/* Badge */}
        <span className={`absolute top-3 left-3 ${project.badgeColor} text-white text-xs font-bold px-3 py-1 rounded-full shadow`}>
          {project.badge}
        </span>
        {project.roi && (
          <span className="absolute top-3 right-3 max-w-[calc(100%-7.5rem)] bg-accent text-dark text-[11px] sm:text-xs font-bold px-2.5 py-1 rounded-full shadow leading-tight">
            ROI: {project.roi}
          </span>
        )}

        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
          {project.gallery.map((_, i) => (
            <button
              key={i}
              onClick={(e) => { e.stopPropagation(); setActiveImg(i) }}
              aria-label={`View image ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === activeImg ? 'bg-white w-5' : 'bg-white/50 w-1.5'
              }`}
            />
          ))}
        </div>
      </div>

      {/* ── Content ── */}
      <div className="p-4 sm:p-5 flex flex-col flex-1">
        <div className="flex items-start justify-between mb-2 gap-2">
          <div className="min-w-0">
            <h3 className="font-serif text-lg sm:text-xl font-bold leading-tight text-primary">
              {project.name}
            </h3>
            <p className="text-accent text-xs font-semibold mt-0.5 line-clamp-1">{project.tagline}</p>
          </div>
          <div className="text-right shrink-0 ml-3">
            <div className="text-xl font-bold text-primary">
              ₹{project.pricePerSqYard.toLocaleString('en-IN')}
            </div>
            <div className="text-gray-400 text-xs">per sq. yard</div>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-gray-500 text-sm mb-3">
          <FiMapPin className="w-3.5 h-3.5 shrink-0 text-primary" />
          <span>{project.location}</span>
        </div>

        <p className="text-gray-500 text-sm leading-relaxed mb-3 line-clamp-2">{project.description}</p>

        {/* Plot sizes — two per row so the card stays short on a phone */}
        <div className="mb-3">
          <p className="text-xs font-semibold text-dark mb-2 uppercase tracking-wide">Available Sizes</p>
          <div className="grid grid-cols-2 gap-2">
            {project.plotSizes.map((size) => (
              <div
                key={size}
                className={`rounded-lg px-2 py-1.5 text-center bg-[#F5F5F5] min-w-0 ${project.plotSizes.length === 1 && !project.customPlotAvailable ? 'col-span-2' : ''}`}
              >
                <div className="font-bold text-xs text-primary leading-tight">{size} sq.yd</div>
                <div className="text-gray-500 text-[11px] leading-tight mt-0.5">₹{totalPrice(size)}</div>
              </div>
            ))}
            {project.customPlotAvailable && (
              <div className="rounded-lg px-2 py-1.5 text-center bg-amber-50 border border-amber-300 min-w-0">
                <div className="font-bold text-xs text-amber-600 leading-tight">Custom Size</div>
                <div className="text-gray-500 text-[11px] leading-tight mt-0.5">Available</div>
              </div>
            )}
          </div>
        </div>

        {/* Highlights — top 4 */}
        <div className="grid grid-cols-2 gap-x-2 gap-y-1 mb-4">
          {project.highlights.slice(0, 4).map((h) => (
            <div key={h} className="flex items-start gap-1.5 text-xs text-gray-600 min-w-0">
              <HiCheckCircle className="w-3.5 h-3.5 shrink-0 text-green-500 mt-0.5" />
              <span className="min-w-0 leading-snug">{h}</span>
            </div>
          ))}
        </div>

        <div className="flex-1" />

        {/* CTA row */}
        <div className="flex gap-2 mt-auto">
          <button
            onClick={() => navigate(`/project/${project.id}`)}
            className="flex-1 text-white text-sm font-semibold py-2.5 rounded-xl transition-colors duration-200 flex items-center justify-center gap-1.5 bg-primary hover:bg-blue-900"
          >
            Know More →
          </button>
          <a
            href={`https://wa.me/91${PHONE_WHATSAPP}?text=Hi, I'm interested in ${project.name} project at ${project.location}. Please share complete details about plot sizes, pricing, and availability.`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex-1 bg-green-500 hover:bg-green-600 text-white text-sm font-semibold py-2.5 rounded-xl transition-colors duration-200 flex items-center justify-center gap-1.5"
          >
            <RiWhatsappLine className="w-4 h-4" />
            WhatsApp
          </a>
        </div>
      </div>
    </motion.div>
  )
}
