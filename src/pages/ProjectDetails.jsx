import { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate, Link, Navigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FiPhone, FiMapPin, FiArrowLeft, FiChevronRight, FiAlertCircle,
} from 'react-icons/fi'
import {
  HiOutlineAcademicCap, HiOutlineHeart, HiOutlineShoppingCart,
  HiOutlineChip, HiOutlineOfficeBuilding, HiOutlineLightningBolt,
  HiOutlineShieldCheck, HiOutlineHome, HiCheckCircle,
  HiOutlineDocumentText, HiOutlineUserGroup, HiOutlineTrendingUp,
} from 'react-icons/hi'
import { MdOutlineTrain, MdOutlineFlight, MdOutlineFactory, MdOutlineConstruction } from 'react-icons/md'
import { RiWhatsappLine, RiPlantLine, RiDropLine, RiBuilding2Line } from 'react-icons/ri'
import { projects, PHONE_CALL, PHONE_WHATSAPP } from '../data/content'

// ── Icon resolver ─────────────────────────────────────────────────────────────
const ICON_MAP = {
  highway:   HiOutlineLightningBolt,
  school:    HiOutlineAcademicCap,
  hospital:  HiOutlineHeart,
  shopping:  HiOutlineShoppingCart,
  train:     MdOutlineTrain,
  industry:  MdOutlineFactory,
  orr:       HiOutlineLightningBolt,
  it:        HiOutlineChip,
  airport:   MdOutlineFlight,
  city:      HiOutlineOfficeBuilding,
  construct: MdOutlineConstruction,
  road:      HiOutlineLightningBolt,
  homes:     HiOutlineHome,
  retail:    HiOutlineShoppingCart,
  power:     HiOutlineLightningBolt,
  water:     RiDropLine,
  tree:      RiPlantLine,
  shield:    HiOutlineShieldCheck,
  drain:     RiDropLine,
  club:      RiBuilding2Line,
}

function resolveIcon(iconKey) {
  return ICON_MAP[iconKey] || FiMapPin
}

// ── Reusable pieces ───────────────────────────────────────────────────────────
function SectionHeading({ label, title }) {
  return (
    <div className="mb-8">
      <span className="inline-block bg-primary/10 text-primary text-xs font-semibold px-3 py-1 rounded-full mb-3">
        {label}
      </span>
      <h3 className="font-serif text-2xl md:text-3xl font-bold text-primary">{title}</h3>
      <div className="w-12 h-0.5 bg-accent mt-3 rounded-full" />
    </div>
  )
}

function ImageLightbox({ title, images, startIndex = 0, onClose }) {
  const [index, setIndex] = useState(startIndex)
  const [zoom, setZoom] = useState(1)
  const [natural, setNatural] = useState({ w: 0, h: 0 })
  const [stageSize, setStageSize] = useState({ w: 0, h: 0 })
  const stageRef = useRef(null)
  const dragRef = useRef(null)
  const swipeRef = useRef(null)
  const pinchRef = useRef(null)
  const onCloseRef = useRef(onClose)
  onCloseRef.current = onClose

  const MIN_ZOOM = 1
  const MAX_ZOOM = 4

  const goTo = (next) => {
    setIndex((next + images.length) % images.length)
  }

  useEffect(() => {
    setZoom(1)
    stageRef.current?.scrollTo(0, 0)
  }, [index])

  const setZoomClamped = (value) => {
    setZoom(Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, Math.round(value * 100) / 100)))
  }

  useEffect(() => {
    const el = stageRef.current
    if (!el) return
    const measure = () => setStageSize({ w: el.clientWidth, h: el.clientHeight })
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const el = stageRef.current
    if (!el) return
    const onWheel = (e) => {
      e.preventDefault()
      setZoomClamped(zoom + (e.deltaY < 0 ? 0.25 : -0.25))
    }
    el.addEventListener('wheel', onWheel, { passive: false })
    return () => el.removeEventListener('wheel', onWheel)
  }, [zoom])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onCloseRef.current()
      if (e.key === 'ArrowRight') setIndex((i) => (i + 1) % images.length)
      if (e.key === 'ArrowLeft') setIndex((i) => (i - 1 + images.length) % images.length)
      if (e.key === '+' || e.key === '=') setZoomClamped(zoom + 0.5)
      if (e.key === '-' || e.key === '_') setZoomClamped(zoom - 0.5)
    }
    const prevOverflow = document.body.style.overflow
    const prevPosition = document.body.style.position
    const prevTop = document.body.style.top
    const prevWidth = document.body.style.width
    const scrollY = window.scrollY
    document.body.style.overflow = 'hidden'
    document.body.style.position = 'fixed'
    document.body.style.top = `-${scrollY}px`
    document.body.style.width = '100%'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prevOverflow
      document.body.style.position = prevPosition
      document.body.style.top = prevTop
      document.body.style.width = prevWidth
      window.scrollTo(0, scrollY)
      window.removeEventListener('keydown', onKey)
    }
  }, [images.length, zoom])

  const fit = natural.w && stageSize.w
    ? Math.min((stageSize.w - 24) / natural.w, (stageSize.h - 24) / natural.h)
    : 0
  const imgW = fit ? Math.round(natural.w * fit * zoom) : 0
  const imgH = fit ? Math.round(natural.h * fit * zoom) : 0

  const onMouseDown = (e) => {
    if (zoom <= 1 || !stageRef.current) return
    dragRef.current = {
      x: e.clientX,
      y: e.clientY,
      left: stageRef.current.scrollLeft,
      top: stageRef.current.scrollTop,
    }
  }
  const onMouseMove = (e) => {
    if (!dragRef.current || !stageRef.current) return
    stageRef.current.scrollLeft = dragRef.current.left - (e.clientX - dragRef.current.x)
    stageRef.current.scrollTop = dragRef.current.top - (e.clientY - dragRef.current.y)
  }
  const endDrag = () => { dragRef.current = null }

  const onTouchStart = (e) => {
    if (e.touches.length === 2) {
      pinchRef.current = {
        dist: Math.hypot(e.touches[0].clientX - e.touches[1].clientX, e.touches[0].clientY - e.touches[1].clientY),
        zoom,
      }
      swipeRef.current = null
    } else if (e.touches.length === 1) {
      swipeRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }
      if (zoom > 1 && stageRef.current) {
        dragRef.current = {
          x: e.touches[0].clientX,
          y: e.touches[0].clientY,
          left: stageRef.current.scrollLeft,
          top: stageRef.current.scrollTop,
        }
      }
    }
  }
  const onTouchMove = (e) => {
    if (e.touches.length === 2 && pinchRef.current) {
      const dist = Math.hypot(e.touches[0].clientX - e.touches[1].clientX, e.touches[0].clientY - e.touches[1].clientY)
      setZoomClamped(pinchRef.current.zoom * (dist / pinchRef.current.dist))
    } else if (e.touches.length === 1 && dragRef.current && stageRef.current) {
      stageRef.current.scrollLeft = dragRef.current.left - (e.touches[0].clientX - dragRef.current.x)
      stageRef.current.scrollTop = dragRef.current.top - (e.touches[0].clientY - dragRef.current.y)
    }
  }
  const onTouchEnd = (e) => {
    const start = swipeRef.current
    const point = e.changedTouches?.[0]
    pinchRef.current = null
    dragRef.current = null
    swipeRef.current = null
    if (!start || !point || zoom > 1 || images.length < 2) return
    const dx = point.clientX - start.x
    const dy = point.clientY - start.y
    if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy) * 1.2) {
      goTo(index + (dx < 0 ? 1 : -1))
    }
  }

  return (
    <div
      className="fixed inset-0 z-[80] bg-primary/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onClick={() => onCloseRef.current()}
    >
      <div
        className="bg-white w-full sm:max-w-5xl h-[100dvh] sm:h-auto sm:max-h-[92vh] sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-gradient-to-r from-primary to-blue-900 px-4 sm:px-6 py-3.5 flex items-center justify-between gap-3 shrink-0">
          <div className="min-w-0">
            <p className="text-white font-semibold text-sm sm:text-base truncate">{title}</p>
            <p className="text-white/60 text-xs mt-0.5">Page {index + 1} of {images.length}</p>
          </div>
          <button
            type="button"
            onClick={() => onCloseRef.current()}
            className="w-10 h-10 rounded-xl bg-white text-primary text-xl leading-none font-bold shrink-0 cursor-pointer shadow-sm transition-all duration-200 hover:bg-accent hover:text-dark hover:-translate-y-0.5 hover:shadow-md active:translate-y-0"
            aria-label="Close"
          >
            ×
          </button>
        </div>

        <div className="bg-white border-b border-gray-100 px-3 sm:px-5 py-2.5 flex items-center justify-between gap-2 shrink-0">
          <span className="text-xs text-gray-400 hidden sm:block">Scroll to move · Scroll wheel or pinch to zoom</span>
          <span className="text-xs text-gray-400 sm:hidden">Swipe for next page · Pinch to zoom</span>
          <div className="flex items-center gap-2">
            <button type="button" onClick={() => setZoomClamped(zoom - 0.5)} disabled={zoom <= MIN_ZOOM}
              className="w-10 h-10 rounded-lg border border-gray-200 bg-white text-primary text-lg font-bold shadow-sm cursor-pointer transition-all duration-200 hover:bg-primary hover:text-white hover:border-primary hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-primary disabled:hover:border-gray-200 disabled:hover:shadow-sm disabled:hover:translate-y-0" aria-label="Zoom out">−</button>
            <span className="text-xs font-semibold text-primary w-12 text-center">{Math.round(zoom * 100)}%</span>
            <button type="button" onClick={() => setZoomClamped(zoom + 0.5)} disabled={zoom >= MAX_ZOOM}
              className="w-10 h-10 rounded-lg border border-gray-200 bg-white text-primary text-lg font-bold shadow-sm cursor-pointer transition-all duration-200 hover:bg-primary hover:text-white hover:border-primary hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-primary disabled:hover:border-gray-200 disabled:hover:shadow-sm disabled:hover:translate-y-0" aria-label="Zoom in">+</button>
            <button type="button" onClick={() => { setZoom(1); stageRef.current?.scrollTo(0, 0) }} disabled={zoom === 1}
              className="h-10 px-3 rounded-lg border border-gray-200 bg-white text-xs font-semibold text-primary shadow-sm cursor-pointer transition-all duration-200 hover:bg-primary hover:text-white hover:border-primary hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-primary disabled:hover:border-gray-200 disabled:hover:shadow-sm disabled:hover:translate-y-0">
              Reset
            </button>
          </div>
        </div>

        <div
          ref={stageRef}
          className="relative min-h-0 flex-1 bg-[#f4f6f8] overflow-auto overscroll-contain sm:h-[68vh] sm:flex-none"
          style={{ cursor: zoom > 1 ? (dragRef.current ? 'grabbing' : 'grab') : 'default', touchAction: zoom > 1 ? 'none' : 'pan-y' }}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={endDrag}
          onMouseLeave={endDrag}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          onDoubleClick={() => setZoomClamped(zoom === 1 ? 2 : 1)}
        >
          <div
            className="flex items-center justify-center"
            style={{ minWidth: '100%', minHeight: '100%', width: imgW ? Math.max(stageSize.w, imgW) : '100%', height: imgH ? Math.max(stageSize.h, imgH) : '100%' }}
          >
            <img
              key={images[index]}
              src={images[index]}
              alt={`${title}, page ${index + 1}`}
              draggable={false}
              onLoad={(e) => setNatural({ w: e.target.naturalWidth, h: e.target.naturalHeight })}
              className={imgW ? '' : 'max-w-full max-h-[60vh] object-contain'}
              style={imgW ? { width: imgW, height: imgH, maxWidth: 'none', contentVisibility: 'visible' } : { contentVisibility: 'visible' }}
            />
          </div>
        </div>

        {images.length > 1 && (
          <div className="flex items-center justify-between gap-2 px-3 sm:px-5 py-3 border-t border-gray-100 bg-white shrink-0">
            <button type="button" onClick={() => goTo(index - 1)}
              className="h-10 px-3 sm:px-4 rounded-xl border border-gray-200 bg-white text-primary text-sm font-semibold shadow-sm cursor-pointer transition-all duration-200 hover:bg-primary hover:text-white hover:border-primary hover:shadow-md hover:-translate-y-0.5 active:translate-y-0">
              Previous
            </button>
            <div className="flex items-center gap-1.5">
              {images.map((_, i) => (
                <button key={i} type="button" onClick={() => goTo(i)} aria-label={`Page ${i + 1}`}
                  className={`h-2.5 rounded-full transition-all ${i === index ? 'w-6 bg-primary' : 'w-2.5 bg-gray-300'}`} />
              ))}
            </div>
            <button type="button" onClick={() => goTo(index + 1)}
              className="h-10 px-3 sm:px-4 rounded-xl bg-primary text-white text-sm font-semibold shadow-md cursor-pointer transition-all duration-200 hover:bg-blue-900 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0">
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

function InfoCard({ iconKey, title, desc }) {
  const Icon = resolveIcon(iconKey)
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow border border-gray-100 flex gap-4"
    >
      <div className="w-11 h-11 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
        <Icon className="w-5 h-5 text-primary" />
      </div>
      <div>
        <h4 className="font-semibold text-dark text-sm mb-1">{title}</h4>
        <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
      </div>
    </motion.div>
  )
}

function useMinWidth(px) {
  const [match, setMatch] = useState(() => typeof window !== 'undefined' && window.matchMedia(`(min-width: ${px}px)`).matches)
  useEffect(() => {
    const mq = window.matchMedia(`(min-width: ${px}px)`)
    const onChange = () => setMatch(mq.matches)
    onChange()
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [px])
  return match
}

// Portrait pages fill the width on their side on a laptop, and stay upright on a phone or tablet.
function FittingPlan({ src, alt }) {
  const wide = useMinWidth(1280)
  const frameRef = useRef(null)
  const [natural, setNatural] = useState({ w: 0, h: 0 })
  const [box, setBox] = useState({ w: 0, h: 0 })
  const portrait = natural.w > 0 && natural.h > natural.w
  const turn = portrait && wide

  useEffect(() => {
    const el = frameRef.current
    if (!el) return
    const measure = () => setBox({ w: el.clientWidth, h: el.clientHeight })
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(el)
    return () => observer.disconnect()
  }, [turn, natural.w, natural.h])

  return (
    <div
      ref={frameRef}
      className={`relative w-full overflow-hidden bg-[#f0f2f5] ${portrait ? '' : 'h-[42vh] min-h-[220px] sm:h-[460px]'}`}
      style={portrait ? { aspectRatio: turn ? `${natural.h} / ${natural.w}` : `${natural.w} / ${natural.h}` } : undefined}
    >
      <img
        src={src}
        alt={alt}
        draggable={false}
        onLoad={(e) => setNatural({ w: e.target.naturalWidth, h: e.target.naturalHeight })}
        style={{
          contentVisibility: 'visible',
          objectFit: 'contain',
          position: 'absolute',
          ...(turn && box.w && box.h
            ? {
                width: box.h,
                height: box.w,
                maxWidth: 'none',
                maxHeight: 'none',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%) rotate(-90deg)',
              }
            : { inset: 0, width: '100%', height: '100%' }),
        }}
      />
    </div>
  )
}

// ── Layout Zoom/Pan Viewer ────────────────────────────────────────────────────
function LayoutViewer({ project, PHONE_CALL }) {
  const [scale, setScale] = useState(1)
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [dragging, setDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [natural, setNatural] = useState({ w: 0, h: 0 })
  const [box, setBox] = useState({ w: 0, h: 0 })
  const containerRef = useRef(null)
  const wide = useMinWidth(1280)
  const portrait = natural.w > 0 && natural.h > natural.w
  const turn = portrait && wide

  const MIN_SCALE = 1
  const MAX_SCALE = 5
  const STEP = 0.5

  const zoomIn  = () => setScale(s => Math.min(s + STEP, MAX_SCALE))
  const zoomOut = () => setScale(s => { const next = Math.max(s - STEP, MIN_SCALE); if (next === 1) setPos({ x: 0, y: 0 }); return next })
  const reset   = () => { setScale(1); setPos({ x: 0, y: 0 }) }

  const onWheel = (e) => {
    e.preventDefault()
    const delta = e.deltaY < 0 ? STEP : -STEP
    setScale(s => {
      const next = Math.min(MAX_SCALE, Math.max(MIN_SCALE, s + delta))
      if (next === 1) setPos({ x: 0, y: 0 })
      return next
    })
  }

  const onMouseDown = (e) => {
    if (scale === 1) return
    setDragging(true)
    setDragStart({ x: e.clientX - pos.x, y: e.clientY - pos.y })
  }
  const onMouseMove = (e) => {
    if (!dragging) return
    setPos({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y })
  }
  const onMouseUp = () => setDragging(false)

  // Touch support
  const lastTouchDist = useRef(null)
  const onTouchStart = (e) => {
    if (e.touches.length === 2) {
      lastTouchDist.current = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      )
    } else if (e.touches.length === 1 && scale > 1) {
      setDragging(true)
      setDragStart({ x: e.touches[0].clientX - pos.x, y: e.touches[0].clientY - pos.y })
    }
  }
  const onTouchMove = (e) => {
    if (e.touches.length === 2) {
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      )
      if (lastTouchDist.current) {
        const ratio = dist / lastTouchDist.current
        setScale(s => Math.min(MAX_SCALE, Math.max(MIN_SCALE, s * ratio)))
      }
      lastTouchDist.current = dist
    } else if (e.touches.length === 1 && dragging) {
      setPos({ x: e.touches[0].clientX - dragStart.x, y: e.touches[0].clientY - dragStart.y })
    }
  }
  const onTouchEnd = () => { setDragging(false); lastTouchDist.current = null }

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    el.addEventListener('wheel', onWheel, { passive: false })
    return () => el.removeEventListener('wheel', onWheel)
  }, [scale])

  useEffect(() => {
    setScale(1)
    setPos({ x: 0, y: 0 })
  }, [turn])

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const measure = () => setBox({ w: el.clientWidth, h: el.clientHeight })
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(el)
    return () => observer.disconnect()
  }, [turn, portrait])

  return (
    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
      <SectionHeading label="Layout" title="Project Layout Plan" />
      <div className="rounded-3xl overflow-hidden border border-gray-100 shadow-xl">

        {/* Header */}
        <div className="bg-gradient-to-r from-primary to-blue-900 px-4 sm:px-6 py-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center shrink-0">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
            </div>
            <div className="min-w-0">
              <p className="text-white font-semibold text-sm truncate">{project.name} — Layout Plan</p>
              <p className="text-white/60 text-xs">{project.location}</p>
            </div>
          </div>
          <span className={`${project.badgeColor} text-white text-xs font-bold px-3 py-1 rounded-full shrink-0`}>
            {project.layoutBadge || (project.badge === 'Premium' ? 'PREMIUM FARM Project' : project.badge === 'New Launch' ? 'NEW LAUNCH' : 'FARM Project')}
          </span>
        </div>

        {project.layoutImage ? (
          <>
            {/* Zoom controls */}
            <div className="bg-white border-b border-gray-100 px-3 sm:px-5 py-2.5 flex items-center justify-between gap-3">
              <span className="text-xs text-gray-400 hidden sm:flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l5 5m-5-5a7 7 0 10-14 0 7 7 0 0014 0z" />
                </svg>
                Scroll or pinch to zoom · Drag to pan
              </span>
              <span className="text-xs text-gray-400 sm:hidden">Pinch or use + to zoom</span>
              <div className="flex items-center gap-2">
                {/* Zoom out */}
                <button onClick={zoomOut} disabled={scale <= MIN_SCALE}
                  className="w-10 h-10 rounded-lg border border-gray-200 bg-white shadow-sm flex items-center justify-center text-primary cursor-pointer transition-all duration-200 hover:bg-primary hover:text-white hover:border-primary hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-primary disabled:hover:border-gray-200 disabled:hover:shadow-sm disabled:hover:translate-y-0"
                  aria-label="Zoom out">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                  </svg>
                </button>
                {/* Scale indicator */}
                <span className="text-xs font-semibold text-primary w-10 text-center">{Math.round(scale * 100)}%</span>
                {/* Zoom in */}
                <button onClick={zoomIn} disabled={scale >= MAX_SCALE}
                  className="w-10 h-10 rounded-lg border border-gray-200 bg-white shadow-sm flex items-center justify-center text-primary cursor-pointer transition-all duration-200 hover:bg-primary hover:text-white hover:border-primary hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-primary disabled:hover:border-gray-200 disabled:hover:shadow-sm disabled:hover:translate-y-0"
                  aria-label="Zoom in">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </button>
                {/* Reset */}
                <button onClick={reset} disabled={scale === 1}
                  className="h-10 px-3 rounded-lg border border-gray-200 bg-white text-xs font-semibold text-primary shadow-sm cursor-pointer transition-all duration-200 hover:bg-primary hover:text-white hover:border-primary hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-primary disabled:hover:border-gray-200 disabled:hover:shadow-sm disabled:hover:translate-y-0">
                  Reset
                </button>
              </div>
            </div>

            {/* Portrait plans fill the card. Landscape plans keep the shared frame. */}
            <div
              ref={containerRef}
              className={`relative bg-[#f0f2f5] overflow-hidden select-none ${portrait ? 'w-full' : 'h-[48vh] min-h-[240px] sm:h-[520px]'}`}
              style={{
                cursor: scale > 1 ? (dragging ? 'grabbing' : 'grab') : 'default',
                touchAction: scale > 1 ? 'none' : 'pan-y',
                ...(portrait ? { aspectRatio: turn ? `${natural.h} / ${natural.w}` : `${natural.w} / ${natural.h}` } : null),
              }}
              onMouseDown={onMouseDown}
              onMouseMove={onMouseMove}
              onMouseUp={onMouseUp}
              onMouseLeave={onMouseUp}
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
            >
              {/* Checkerboard hint when zoomed */}
              <div className="absolute inset-0 opacity-[0.03]"
                style={{ backgroundImage: 'repeating-conic-gradient(#888 0% 25%, transparent 0% 50%)', backgroundSize: '20px 20px' }} />

              <img
                src={project.layoutImage}
                alt={`${project.name} layout plan - ${project.location} open plots by HKMC Builders`}
                draggable={false}
                onLoad={(e) => setNatural({ w: e.target.naturalWidth, h: e.target.naturalHeight })}
                style={{
                  contentVisibility: 'visible',
                  objectFit: 'contain',
                  position: 'absolute',
                  transformOrigin: 'center center',
                  transition: dragging ? 'none' : 'transform 0.2s ease',
                  ...(turn && box.w && box.h
                    ? {
                        width: box.h,
                        height: box.w,
                        maxWidth: 'none',
                        maxHeight: 'none',
                        top: '50%',
                        left: '50%',
                        transform: `translate(calc(-50% + ${pos.x}px), calc(-50% + ${pos.y}px)) rotate(-90deg) scale(${scale})`,
                      }
                    : {
                        inset: 0,
                        width: '100%',
                        height: '100%',
                        maxWidth: '100%',
                        maxHeight: '100%',
                        transform: `translate(${pos.x}px, ${pos.y}px) scale(${scale})`,
                      }),
                }}
              />

              {/* Zoom level badge */}
              {scale > 1 && (
                <div className="absolute top-3 right-3 bg-primary/90 text-white text-xs font-bold px-2.5 py-1 rounded-full pointer-events-none">
                  {Math.round(scale * 100)}%
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="bg-gradient-to-br from-primary/5 to-accent/10 flex flex-col items-center justify-center gap-4 py-20">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center">
              <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
            </div>
            <p className="font-semibold text-primary text-base">Layout Coming Soon</p>
            <p className="text-gray-400 text-sm">Contact us to get the detailed layout plan</p>
            <a href={`tel:${PHONE_CALL}`}
              className="flex items-center gap-2 bg-primary hover:bg-blue-900 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors">
              <FiPhone className="w-4 h-4" /> Call for Layout
            </a>
          </div>
        )}
      </div>
    </motion.div>
  )
}

// ── Main page ─────────────────────────────────────────────────────────────────
export default function ProjectDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const project = projects.find((p) => p.id === id)

  const [activeImg, setActiveImg] = useState(0)
  const [viewer, setViewer] = useState(null)
  const [loadedImgs, setLoadedImgs] = useState({ 0: true })
  const [formData, setFormData] = useState({ name: '', phone: '', plotSize: '' })
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState({ name: '', phone: '' })
  const [loading, setLoading] = useState(false)
  const heroPausedRef = useRef(false)
  const heroSwipeRef = useRef(null)

  // Preload all gallery images up front
  useEffect(() => {
    if (!project) return
    project.gallery.forEach((src, i) => {
      if (i === 0) return
      const img = new Image()
      img.src = src
      img.onload = () => setLoadedImgs(prev => ({ ...prev, [i]: true }))
    })
  }, [project])

  // Auto-rotate hero banner every 5s — only when next image is loaded
  useEffect(() => {
    if (!project || project.gallery.length <= 1) return
    const timer = setInterval(() => {
      if (heroPausedRef.current) return
      setActiveImg(prev => {
        const next = (prev + 1) % project.gallery.length
        return loadedImgs[next] ? next : prev
      })
    }, 5000)
    return () => clearInterval(timer)
  }, [project, loadedImgs])

  // Dynamic meta tags per project page
  useEffect(() => {
    if (!project) return
    const prevTitle = document.title
    const prevDesc = document.querySelector('meta[name="description"]')?.getAttribute('content')

    document.title = `${project.name} – ${project.location} | HKMC Builders`

    const desc = document.querySelector('meta[name="description"]')
    const priceBit = `starting ₹${project.pricePerSqYard.toLocaleString('en-IN')}/sq.yd`
    const extraBit = project.roi ? ` Expected ROI: ${project.roi}.` : ' View the brochure, layout plan, and rate card on this page.'
    if (desc) desc.setAttribute('content',
      `${project.name} in ${project.location}. ${project.badge} open plots ${priceBit}.${extraBit} Book a free site visit today!`
    )

    const ogTitle = document.querySelector('meta[property="og:title"]')
    if (ogTitle) ogTitle.setAttribute('content', `${project.name} – ${project.location} | HKMC Builders`)

    const ogDesc = document.querySelector('meta[property="og:description"]')
    if (ogDesc) ogDesc.setAttribute('content',
      `${project.name} in ${project.location}. Starting ₹${project.pricePerSqYard.toLocaleString('en-IN')}/sq.yd.${project.roi ? ` ROI: ${project.roi}.` : ''} Book free site visit!`
    )

    const canonical = document.querySelector('link[rel="canonical"]')
    if (canonical) canonical.setAttribute('href', `https://hkmcbuilders.com/project/${project.id}`)

    return () => {
      document.title = prevTitle
      if (desc && prevDesc) desc.setAttribute('content', prevDesc)
      if (canonical) canonical.setAttribute('href', 'https://hkmcbuilders.com')
    }
  }, [project])

  if (id === 'shadnagar-grand-city') {
    return <Navigate to="/project/shadnagar-premium-avenue" replace />
  }

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-2xl font-semibold text-gray-500">Project not found.</p>
        <Link to="/" className="btn-primary">← Back to Projects</Link>
      </div>
    )
  }

  const validateForm = () => {
    const newErrors = { name: '', phone: '' }
    let isValid = true

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
      isValid = false
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters'
      isValid = false
    } else if (!/^[a-zA-Z\s]+$/.test(formData.name)) {
      newErrors.name = 'Name should only contain letters'
      isValid = false
    }

    // Phone validation
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required'
      isValid = false
    } else if (!/^[6-9]\d{9}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Enter a valid 10-digit Indian mobile number'
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Validate form
    if (!validateForm()) {
      return
    }
    
    setLoading(true)
    
    // Submit form to FormSubmit.co
    const form = e.target
    const formData = new FormData(form)
    
    try {
      await fetch('https://formsubmit.co/hkmc.developer@gmail.com', {
        method: 'POST',
        body: formData,
      })
      setLoading(false)
      setSubmitted(true)
    } catch (error) {
      console.error('Form submission error:', error)
      setLoading(false)
      setErrors({ ...errors, submit: 'Failed to submit. Please try calling us directly.' })
    }
  }

  return (
    <div className="min-h-screen bg-white">

      {/* ── Sticky top bar ── */}
      <div className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          <button onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-primary font-semibold text-sm bg-white border border-gray-200 shadow-sm rounded-lg px-3 py-2 cursor-pointer transition-all duration-200 hover:bg-primary hover:text-white hover:border-primary hover:shadow-md hover:-translate-y-0.5 active:translate-y-0">
            <FiArrowLeft className="w-4 h-4" /> Back to Projects
          </button>
          <div className="hidden sm:flex items-center gap-2 text-sm">
            <span 
              className="text-gray-400 hover:text-primary cursor-pointer transition-colors" 
              onClick={() => {
                navigate('/')
                setTimeout(() => {
                  const projectsSection = document.getElementById('projects')
                  if (projectsSection) {
                    projectsSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
                  }
                }, 100)
              }}
            >
              HKMC Builders
            </span>
            <FiChevronRight className="w-3 h-3 text-gray-300" />
            <span className="text-primary font-semibold">{project.name}</span>
          </div>
          <div className="flex items-center gap-2">
            {project.brochureImages?.length > 0 && (
              <button
                type="button"
                onClick={() => setViewer({ title: `${project.name} Brochure`, images: project.brochureImages })}
                className="btn-accent text-xs py-2 px-3 sm:px-4"
              >
                Brochure
              </button>
            )}
            <a href={`tel:${PHONE_CALL}`} className="btn-accent text-xs py-2 px-3 sm:px-4 flex items-center gap-1.5">
              <FiPhone className="w-3.5 h-3.5" /> Call Now
            </a>
          </div>
        </div>
      </div>

      {/* ── Hero banner ── */}
      <div
        className="relative h-[50vh] sm:h-[55vh] min-h-[300px] sm:min-h-[340px] overflow-hidden touch-pan-y"
        onMouseEnter={() => { heroPausedRef.current = true }}
        onMouseLeave={() => { heroPausedRef.current = false }}
        onTouchStart={(e) => {
          if (e.touches.length !== 1) return
          heroSwipeRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }
        }}
        onTouchEnd={(e) => {
          const start = heroSwipeRef.current
          heroSwipeRef.current = null
          const point = e.changedTouches?.[0]
          if (!start || !point || project.gallery.length < 2) return
          const dx = point.clientX - start.x
          const dy = point.clientY - start.y
          if (Math.abs(dx) < 48 || Math.abs(dx) < Math.abs(dy) * 1.2) return
          setActiveImg((i) => (i + (dx < 0 ? 1 : -1) + project.gallery.length) % project.gallery.length)
          heroPausedRef.current = true
          setTimeout(() => { heroPausedRef.current = false }, 6000)
        }}
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={activeImg}
            src={project.gallery[activeImg]}
            alt={`${project.name} - ${project.location} open plots by HKMC Builders Hyderabad`}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className={`w-full h-full absolute inset-0 ${project.galleryFit === 'contain' ? 'object-contain bg-[#10284f]' : 'object-cover'}`}
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/30 to-transparent" />

        <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6 md:p-10">
          <div className="max-w-7xl mx-auto flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="min-w-0">
              <span className={`inline-block ${project.badgeColor} text-white text-xs font-bold px-2.5 sm:px-3 py-1 rounded-full mb-2 sm:mb-3`}>
                {project.badge}
              </span>
              <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-1 sm:mb-2">{project.name}</h1>
              <p className="text-accent font-semibold text-base sm:text-lg mb-2 sm:mb-3">{project.tagline}</p>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-white/80 text-xs sm:text-sm">
                <span className="flex items-center gap-1 sm:gap-1.5"><FiMapPin className="w-3.5 sm:w-4 h-3.5 sm:h-4 shrink-0" />{project.location}</span>
                <span className="flex items-center gap-1 sm:gap-1.5"><HiOutlineHome className="w-3.5 sm:w-4 h-3.5 sm:h-4 shrink-0" />₹{project.pricePerSqYard.toLocaleString('en-IN')}/sq.yd</span>
                {project.roi && (
                  <span className="flex items-center gap-1 sm:gap-1.5"><HiOutlineTrendingUp className="w-3.5 sm:w-4 h-3.5 sm:h-4 shrink-0" />ROI: {project.roi}</span>
                )}
              </div>
            </motion.div>

            <div className="flex gap-1.5 sm:gap-2 shrink-0">
              {project.gallery.map((img, i) => (
                <button key={i} onClick={() => { setActiveImg(i); heroPausedRef.current = true; setTimeout(() => { heroPausedRef.current = false }, 6000) }}
                  className={`w-10 sm:w-12 md:w-14 h-7 sm:h-8 md:h-10 rounded-lg overflow-hidden border-2 cursor-pointer transition-all duration-200 hover:opacity-100 hover:-translate-y-0.5 ${
                    i === activeImg ? 'border-accent shadow-md' : 'border-white/50 opacity-70 hover:border-white'
                  }`}>
                  <img src={img} alt={`${project.name} open plot - ${project.location} by HKMC Builders`} className={`w-full h-full ${project.galleryFit === 'contain' ? 'object-contain bg-white' : 'object-cover'}`} loading="lazy" decoding="async" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">

        {/* ── Top section: Overview + Pricing alongside sticky sidebar ── */}
        <div className="grid lg:grid-cols-3 gap-10">

          {/* ── Left: Overview & Pricing ── */}
          <div className="lg:col-span-2 space-y-16">

            {/* Overview */}
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <SectionHeading label="Overview" title="About This Project" />
              <p className="text-gray-600 leading-relaxed text-base">{project.description}</p>
              {project.brochureImages?.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-6">
                  <button type="button" onClick={() => setViewer({ title: `${project.name} Brochure`, images: project.brochureImages })}
                    className="h-11 px-4 rounded-xl bg-primary text-white text-sm font-semibold shadow-md cursor-pointer transition-all duration-200 hover:bg-blue-900 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0">
                    View Brochure
                  </button>
                  {project.rateCardImage && (
                    <button type="button" onClick={() => setViewer({ title: `${project.name} Rate Card`, images: [project.rateCardImage] })}
                      className="h-11 px-4 rounded-xl border border-primary bg-white text-primary text-sm font-semibold shadow-sm cursor-pointer transition-all duration-200 hover:bg-primary hover:text-white hover:shadow-md hover:-translate-y-0.5 active:translate-y-0">
                      Rate Card
                    </button>
                  )}
                </div>
              )}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
                {project.investmentBenefits.map((b) => (
                  <div key={b.label} className="bg-[#F5F5F5] rounded-2xl p-4 text-center">
                    <div className="font-serif text-2xl font-bold text-primary">{b.stat}</div>
                    <div className="text-dark text-xs font-semibold mt-1">{b.label}</div>
                    <div className="text-gray-400 text-xs mt-0.5">{b.sub}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Pricing */}
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <SectionHeading label="Pricing" title="Plot Sizes & Pricing" />
              <div className="grid sm:grid-cols-2 gap-4">
                {project.plotSizes.map((size) => {
                  const total = project.customPrices?.[size] ?? size * project.pricePerSqYard
                  return (
                    <div key={size} className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:border-primary/30 hover:shadow-md transition-all">
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-serif text-2xl font-bold text-primary">{size} sq.yd</span>
                        <span className={`${project.badgeColor} text-white text-xs font-bold px-2.5 py-1 rounded-full`}>{project.badge}</span>
                      </div>
                      <div className="text-gray-500 text-sm mb-1">{project.paymentSchemes ? 'Outright total' : 'Total Investment'}</div>
                      <div className="text-2xl font-bold text-dark">₹{total.toLocaleString('en-IN')}</div>
                      <div className="text-gray-400 text-xs mt-1">@ ₹{project.pricePerSqYard.toLocaleString('en-IN')}/sq.yd</div>
                    </div>
                  )
                })}
                {/* Custom plot size card */}
                {project.customPlotAvailable && (
                  <div className="bg-amber-50 border border-amber-300 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-center items-center text-center gap-2">
                    <span className="font-serif text-2xl font-bold text-amber-600">Custom Size</span>
                    <div className="text-gray-500 text-sm">Need a different plot size?</div>
                    <div className="text-amber-700 text-sm font-medium">Custom plot sizes are available on request. Contact us to discuss your requirement.</div>
                  </div>
                )}
              </div>

              {project.paymentSchemes?.length > 0 && (
                <div className="mt-6 bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-200 rounded-2xl p-5">
                  <h4 className="font-semibold text-dark text-sm mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 bg-orange-500 rounded-full inline-block" />
                    Payment Plan Options · 121 sq.yd
                  </h4>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    {project.paymentSchemes.map((scheme) => (
                      <div key={scheme.name} className="bg-white rounded-xl p-3 text-center shadow-sm">
                        <div className="font-bold text-primary text-sm sm:text-base">₹{scheme.total.toLocaleString('en-IN')}</div>
                        <div className="text-gray-500 text-xs mt-0.5">{scheme.name}</div>
                      </div>
                    ))}
                  </div>
                  {project.rateCardNotes?.length > 0 && (
                    <ul className="mt-4 space-y-1.5">
                      {project.rateCardNotes.map((note) => (
                        <li key={note} className="text-xs text-gray-600 leading-relaxed">• {note}</li>
                      ))}
                    </ul>
                  )}
                  {project.rateCardImage && (
                    <button type="button" onClick={() => setViewer({ title: `${project.name} Rate Card`, images: [project.rateCardImage] })}
                      className="mt-4 w-full bg-primary text-white text-sm font-semibold py-2.5 rounded-xl shadow-md cursor-pointer transition-all duration-200 hover:bg-blue-900 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0">
                      View Rate Card
                    </button>
                  )}
                </div>
              )}

              {/* EMI / Payment Plan block — only shown if project has pricingDetails */}
              {project.pricingDetails && (
                <div className="mt-6 bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-200 rounded-2xl p-5">
                  <h4 className="font-semibold text-dark text-sm mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 bg-orange-500 rounded-full inline-block" />
                    Payment Plan Options
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm">
                    <div className="bg-white rounded-xl p-3 text-center shadow-sm">
                      <div className="font-bold text-primary text-base">₹{project.pricingDetails.outright.toLocaleString('en-IN')}</div>
                      <div className="text-gray-500 text-xs mt-0.5">per sq.yd (Outright)</div>
                    </div>
                    <div className="bg-white rounded-xl p-3 text-center shadow-sm">
                      <div className="font-bold text-primary text-base">₹{project.pricingDetails.emi.toLocaleString('en-IN')}</div>
                      <div className="text-gray-500 text-xs mt-0.5">per sq.yd (EMI Plan)</div>
                    </div>
                    <div className="bg-white rounded-xl p-3 text-center shadow-sm">
                      <div className="font-bold text-primary text-base">₹{project.pricingDetails.bookingAmount.toLocaleString('en-IN')}</div>
                      <div className="text-gray-500 text-xs mt-0.5">Booking Amount</div>
                    </div>
                    <div className="bg-white rounded-xl p-3 text-center shadow-sm">
                      <div className="font-bold text-primary text-base">₹{project.pricingDetails.downPayment.toLocaleString('en-IN')}</div>
                      <div className="text-gray-500 text-xs mt-0.5">Down Payment</div>
                    </div>
                    <div className="bg-white rounded-xl p-3 text-center shadow-sm col-span-2 sm:col-span-1">
                      <div className="font-bold text-primary text-base">{project.pricingDetails.emiDuration}</div>
                      <div className="text-gray-500 text-xs mt-0.5">EMI Duration</div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>

          </div>

          {/* ── Right: sticky sidebar ── */}
          <div className="lg:col-span-1">
            <div className="sticky top-20 space-y-4">

              {/* Enquiry form */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-5">
                <h4 className="font-semibold text-dark text-base mb-4">Enquire About This Project</h4>

                {submitted ? (
                  <div className="text-center py-6">
                    <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <HiCheckCircle className="w-7 h-7 text-green-500" />
                    </div>
                    <p className="font-semibold text-primary mb-1">Thank you!</p>
                    <p className="text-gray-500 text-sm">We'll call you within 2 hours.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-3">
                    <input type="hidden" name="_subject" value={`New Site Visit Request - ${project.name}`} />
                    <input type="hidden" name="_template" value="table" />
                    <input type="hidden" name="_captcha" value="false" />
                    <input type="hidden" name="Project" value={project.name} />
                    <input type="hidden" name="Location" value={project.location} />
                    
                    <div>
                      <input 
                        type="text" 
                        name="name" 
                        required 
                        placeholder="Your Name"
                        value={formData.name} 
                        onChange={handleInputChange}
                        className={`w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 transition-all ${
                          errors.name 
                            ? 'border-red-500 focus:border-red-500 focus:ring-red-200' 
                            : 'border-gray-200 focus:border-primary focus:ring-primary/20'
                        }`} 
                      />
                      {errors.name && (
                        <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                          <FiAlertCircle className="w-3 h-3" /> {errors.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <input 
                        type="tel" 
                        name="phone" 
                        required 
                        placeholder="Phone Number (10 digits)"
                        value={formData.phone} 
                        onChange={handleInputChange}
                        maxLength="10"
                        className={`w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 transition-all ${
                          errors.phone 
                            ? 'border-red-500 focus:border-red-500 focus:ring-red-200' 
                            : 'border-gray-200 focus:border-primary focus:ring-primary/20'
                        }`} 
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                          <FiAlertCircle className="w-3 h-3" /> {errors.phone}
                        </p>
                      )}
                    </div>

                    <select 
                      name="plotSize" 
                      value={formData.plotSize} 
                      onChange={(e) => setFormData({ ...formData, plotSize: e.target.value })}
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all bg-white text-gray-600"
                    >
                      <option value="">Select Plot Size</option>
                      {project.plotSizes.map((s) => (
                        <option key={s} value={s}>{s} sq.yd — ₹{(project.customPrices?.[s] ?? s * project.pricePerSqYard).toLocaleString('en-IN')}</option>
                      ))}
                    </select>

                    {errors.submit && (
                      <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 flex items-start gap-2">
                        <FiAlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                        <p className="text-red-700 text-sm">{errors.submit}</p>
                      </div>
                    )}

                    <button 
                      type="submit"
                      disabled={loading}
                      className="w-full bg-primary text-white font-semibold py-3 rounded-xl shadow-md cursor-pointer transition-all duration-200 text-sm flex items-center justify-center gap-2 hover:bg-blue-900 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-md"
                    >
                      {loading ? (
                        <>
                          <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                          </svg>
                          Submitting...
                        </>
                      ) : (
                        <>
                          <HiOutlineHome className="w-4 h-4" /> Book Free Site Visit
                        </>
                      )}
                    </button>
                  </form>
                )}

                <div className="mt-4 pt-4 border-t border-gray-100 flex flex-col gap-2">
                  <a href={`tel:${PHONE_CALL}`}
                    className="flex items-center justify-center gap-2 bg-primary/10 hover:bg-primary hover:text-white text-primary font-semibold py-2.5 rounded-xl transition-all text-sm">
                    <FiPhone className="w-4 h-4" /> Call: {PHONE_CALL}
                  </a>
                  <a href={`https://wa.me/91${PHONE_WHATSAPP}?text=Hi, I'm viewing the ${project.name} project details page. I'm interested in booking a site visit and learning more about plot availability and pricing.`}
                    target="_blank" rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold py-2.5 rounded-xl transition-colors text-sm">
                    <RiWhatsappLine className="w-4 h-4" /> WhatsApp Us
                  </a>
                </div>
              </div> 

              {/* Snapshot */}
              <div className="bg-[#F5F5F5] rounded-2xl p-5">
                <h4 className="font-semibold text-dark text-sm mb-3 uppercase tracking-wide">Project Snapshot</h4>
                <div className="space-y-2.5 text-sm">
                  {[
                    { label: 'Location',     value: project.location },
                    { label: 'Price',        value: `₹${project.pricePerSqYard.toLocaleString('en-IN')}/sq.yd` },
                    { label: 'Plot Sizes',   value: project.plotSizes.map(s => `${s} sq.yd`).join(', ') },
                    ...(project.roi ? [{ label: 'Expected ROI', value: project.roi }] : []),
                    { label: 'Approval',     value: 'Clear Title & Govt. Approved' },
                  ].map((row) => (
                    <div key={row.label} className="flex justify-between gap-2">
                      <span className="text-gray-500">{row.label}</span>
                      <span className="font-medium text-dark text-right">{row.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Cross-sell */}
              {projects.filter(p => p.id !== project.id).map(other => (
                <div key={other.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                  <img src={other.image} alt={`${other.name} - ${other.location} open plots by HKMC Builders`} className="w-full h-28 object-cover" />
                  <div className="p-4">
                    <p className="text-xs text-gray-400 mb-1">Also explore</p>
                    <h5 className="font-serif font-bold text-primary">{other.name}</h5>
                    <p className="text-gray-500 text-xs mb-3">{other.location}</p>
                    <Link to={`/project/${other.id}`}
                      className="block text-center bg-primary/10 hover:bg-primary hover:text-white text-primary text-xs font-semibold py-2 rounded-lg transition-all">
                      View Project →
                    </Link>
                  </div>
                </div>
              ))}

            </div>     
          </div>
        </div>

        {/* ── Full-width sections below the sidebar grid ── */}
        <div className="space-y-16 mt-16">

          <LayoutViewer project={project} PHONE_CALL={PHONE_CALL} />

          {project.amenities?.length > 0 && (
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <SectionHeading label="Amenities" title="Key Features" />
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {project.amenities.map((item) => (
                  <InfoCard key={item.title} iconKey={item.iconKey} title={item.title} desc={item.desc} />
                ))}
              </div>
            </motion.div>
          )}

          {/* Location Advantages */}
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <SectionHeading label="Location" title="Location Advantages" />
            {project.locationNote && (
              <p className="text-gray-600 text-sm leading-relaxed mb-6 max-w-3xl">{project.locationNote}</p>
            )}
            {project.locationMapImage && (
              <div className="rounded-3xl overflow-hidden border border-gray-100 shadow-xl mb-8">
                <div className="bg-gradient-to-r from-primary to-blue-900 px-4 sm:px-6 py-4 flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-white font-semibold text-sm truncate">{project.name} — Location Plan</p>
                    <p className="text-white/60 text-xs">{project.location}</p>
                  </div>
                  <button type="button" onClick={() => setViewer({ title: `${project.name} Location Plan`, images: [project.locationMapImage] })}
                    className="shrink-0 bg-white text-primary text-xs font-bold px-4 py-2 rounded-lg shadow-sm cursor-pointer transition-all duration-200 hover:bg-accent hover:text-dark hover:shadow-md hover:-translate-y-0.5 active:translate-y-0">
                    View
                  </button>
                </div>
                <button type="button" onClick={() => setViewer({ title: `${project.name} Location Plan`, images: [project.locationMapImage] })}
                  className="group relative block w-full bg-[#f0f2f5] cursor-pointer">
                  <FittingPlan src={project.locationMapImage} alt={`${project.name} location plan`} />
                  <span className="pointer-events-none absolute inset-0 bg-primary/0 transition-colors duration-200 group-hover:bg-primary/10" />
                </button>
              </div>
            )}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {project.locationAdvantages.map((item) => (
                <InfoCard key={item.title} iconKey={item.iconKey} title={item.title} desc={item.desc} />
              ))}
            </div>
            {project.nearbyLandmarks?.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-2">
                {project.nearbyLandmarks.map((place) => (
                  <span key={place} className="bg-[#F5F5F5] text-gray-600 text-xs sm:text-sm px-3 py-1.5 rounded-full">{place}</span>
                ))}
              </div>
            )}
          </motion.div>

          {/* Closing line */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-accent/10 border border-accent/30 rounded-2xl p-6 text-center"
          >
            <p className="font-serif text-lg md:text-xl font-semibold text-dark italic leading-relaxed">
              "{project.closingLine}"
            </p>
          </motion.div>

        </div>
      </div>
      {viewer && (
        <ImageLightbox
          key={`${viewer.title}-${viewer.startIndex || 0}`}
          title={viewer.title}
          images={viewer.images}
          startIndex={viewer.startIndex || 0}
          onClose={() => setViewer(null)}
        />
      )}
    </div>
  )
}
