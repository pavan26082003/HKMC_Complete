import { useState, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'
import { FiImage } from 'react-icons/fi'

// Optimized site photos — all compressed to <130 KB each
const sliderImages = [
  { src: '/slider-images/DSC07972.webp', label: 'Kodangal Grand City' },
  { src: '/slider-images/DSC07977.webp', label: 'Kodangal Grand City' },
  { src: '/slider-images/DSC07979.webp', label: 'Kodangal Grand City' },
  { src: '/slider-images/DSC07984.webp', label: 'Kodangal Grand City' },
  { src: '/slider-images/DSC07988.webp', label: 'Kodangal Grand City' },
  { src: '/slider-images/DSC07997.webp', label: 'Kodangal Grand City' },
  { src: '/slider-images/DSC08007.webp', label: 'Kodangal Grand City' },
  { src: '/slider-images/DSC08008.webp', label: 'Kodangal Grand City' },
  { src: '/slider-images/DSC08013.webp', label: 'Kodangal Grand City' },
  { src: '/slider-images/DSC08015.webp', label: 'Kodangal Grand City' },
  { src: '/slider-images/DSC08019.webp', label: 'Kodangal Grand City' },
  { src: '/slider-images/DSC08023.webp', label: 'Kodangal Grand City' },
  { src: '/slider-images/DSC08029.webp', label: 'Kodangal Grand City' },
  { src: '/slider-images/DSC08038.webp', label: 'Kodangal Grand City' },
  { src: '/slider-images/DSC08039.webp', label: 'Kodangal Grand City' },
  { src: '/slider-images/DSC08045.webp', label: 'Kodangal Grand City' },
  { src: '/slider-images/DSC08050.webp', label: 'Kodangal Grand City' },
  { src: '/slider-images/DSC08057.webp', label: 'Kodangal Grand City' },
  // Shadnagar Grand City images
  { src: '/shad-grandcity/img1.webp', label: 'Shadnagar Grand City' },
  { src: '/shad-grandcity/img2.webp', label: 'Shadnagar Grand City' },
  { src: '/shad-grandcity/image3.webp', label: 'Shadnagar Grand City' },
]

// Triple for seamless infinite loop
const loopImages = [...sliderImages, ...sliderImages, ...sliderImages]

const COUNT    = sliderImages.length
const W_SM     = 260   // mobile card width px
const W_MD     = 310   // sm+ card width px
const W_LG     = 340   // lg+ card width px
const GAP_SM   = 14
const GAP_MD   = 18

export default function GallerySlider() {
  const [isPaused, setIsPaused] = useState(false)
  const [hoveredIdx, setHoveredIdx] = useState(null)
  const sectionRef = useRef(null)

  const handleMouseEnter = useCallback(() => setIsPaused(true), [])
  const handleMouseLeave = useCallback(() => { setIsPaused(false); setHoveredIdx(null) }, [])

  return (
    <section ref={sectionRef} className="py-10 sm:py-16 bg-[#F5F5F5] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12"
        >
          <span className="inline-block bg-primary/10 text-primary text-sm font-semibold px-4 py-1.5 rounded-full mb-3">
            Project Gallery
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary gold-underline">
            A Glimpse of Our Projects
          </h2>
          <p className="text-gray-500 text-sm sm:text-base mt-4 max-w-xl mx-auto">
            Real site photos from Kodangal Grand City, Shadnagar Grand City and our premium projects across Telangana.
          </p>
        </motion.div>
      </div>

      {/* Full-width slider */}
      <div
        className="relative w-full overflow-hidden"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Edge fade masks */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-10 sm:w-20 z-10 bg-gradient-to-r from-[#F5F5F5] to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-10 sm:w-20 z-10 bg-gradient-to-l from-[#F5F5F5] to-transparent" />

        <div
          className="gs-track"
          style={{ animationPlayState: isPaused ? 'paused' : 'running' }}
        >
          {loopImages.map((img, i) => {
            const isHovered = hoveredIdx === i
            return (
              <div
                key={i}
                className="gs-item"
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => setHoveredIdx(null)}
              >
                <img
                  src={img.src}
                  alt={`${img.label} - HKMC Builders project site photo`}
                  loading="lazy"
                  decoding="async"
                  width="340"
                  height="230"
                  className="gs-img"
                  style={{ transform: isHovered ? 'scale(1.1)' : 'scale(1)' }}
                />
                {/* Hover overlay */}
                <div
                  className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent pointer-events-none"
                  style={{ opacity: isHovered ? 1 : 0, transition: 'opacity 0.3s' }}
                />
                <div
                  className="absolute bottom-0 left-0 right-0 px-3 py-2 pointer-events-none"
                  style={{
                    opacity: isHovered ? 1 : 0,
                    transform: isHovered ? 'translateY(0)' : 'translateY(6px)',
                    transition: 'opacity 0.3s, transform 0.3s',
                  }}
                >
                  <p className="text-white text-xs font-bold truncate">{img.label}</p>
                  <p className="text-white/70 text-xs">HKMC Builders</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Gallery button */}
      <div className="flex justify-center mt-8 sm:mt-10 px-4">
        <motion.a
          href="#projects"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="inline-flex items-center gap-2 bg-primary hover:bg-blue-900 text-white font-semibold px-6 sm:px-8 py-3 rounded-xl shadow-md hover:shadow-xl transition-all duration-200 text-sm sm:text-base"
        >
          <FiImage className="w-4 h-4 shrink-0" />
          View All Projects &amp; Gallery
        </motion.a>
      </div>

      <style>{`
        /* Base (mobile) */
        .gs-track {
          display: flex;
          gap: ${GAP_SM}px;
          width: max-content;
          /* GPU layer — prevents paint during scroll animation */
          will-change: transform;
          animation: gs-scroll-sm ${COUNT * 2.5}s linear infinite;
        }
        .gs-item {
          position: relative;
          flex-shrink: 0;
          overflow: hidden;
          border-radius: 12px;
          width: ${W_SM}px;
          height: 178px;
          cursor: pointer;
          /* own compositing layer per item */
          will-change: transform;
        }
        .gs-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          /* smooth zoom on GPU */
          will-change: transform;
          transition: transform 0.4s ease;
        }
        @keyframes gs-scroll-sm {
          from { transform: translateX(0); }
          to   { transform: translateX(-${COUNT * (W_SM + GAP_SM)}px); }
        }

        /* Small screens and up */
        @media (min-width: 640px) {
          .gs-track {
            gap: ${GAP_MD}px;
            animation: gs-scroll-md ${COUNT * 2.8}s linear infinite;
          }
          .gs-item  { width: ${W_MD}px; height: 205px; border-radius: 14px; }
          @keyframes gs-scroll-md {
            from { transform: translateX(0); }
            to   { transform: translateX(-${COUNT * (W_MD + GAP_MD)}px); }
          }
        }

        /* Large screens */
        @media (min-width: 1024px) {
          .gs-track { animation: gs-scroll-lg ${COUNT * 3}s linear infinite; }
          .gs-item  { width: ${W_LG}px; height: 224px; }
          @keyframes gs-scroll-lg {
            from { transform: translateX(0); }
            to   { transform: translateX(-${COUNT * (W_LG + GAP_MD)}px); }
          }
        }
      `}</style>
    </section>
  )
}
