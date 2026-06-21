import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiImage } from 'react-icons/fi'
import { projects } from '../data/content'

// Collect all gallery images from all projects
const allImages = projects.flatMap((p) =>
  p.gallery.map((src) => ({ src, project: p.name, id: p.id }))
)

// Triple for seamless infinite loop
const loopImages = [...allImages, ...allImages, ...allImages]

export default function GallerySlider() {
  const [isPaused, setIsPaused] = useState(false)
  const [hoveredIdx, setHoveredIdx] = useState(null)

  return (
    <section className="py-10 sm:py-16 bg-[#F5F5F5] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
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
          <p className="text-gray-500 text-base mt-4 max-w-xl mx-auto">
            Explore our premium land projects across Telangana's fastest-growing corridors.
          </p>
        </motion.div>
      </div>

      {/* Slider track — full viewport width */}
      <div
        className="relative w-full overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => { setIsPaused(false); setHoveredIdx(null) }}
      >
        {/* Edge fade masks */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-20 sm:w-32 z-10 bg-gradient-to-r from-[#F5F5F5] to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-20 sm:w-32 z-10 bg-gradient-to-l from-[#F5F5F5] to-transparent" />

        <div
          className="gallery-track flex gap-4 sm:gap-5"
          style={{ animationPlayState: isPaused ? 'paused' : 'running' }}
        >
          {loopImages.map((img, i) => (
            <div
              key={i}
              className="gallery-item relative shrink-0 rounded-2xl overflow-hidden cursor-pointer"
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
            >
              <img
                src={img.src}
                alt={`${img.project} - HKMC Builders project gallery`}
                loading="lazy"
                className="gallery-img w-full h-full object-cover"
                style={{ transform: hoveredIdx === i ? 'scale(1.13)' : 'scale(1)' }}
              />
              {/* Dark overlay on hover */}
              <div
                className="absolute inset-0 bg-gradient-to-t from-primary/75 via-primary/10 to-transparent transition-opacity duration-300"
                style={{ opacity: hoveredIdx === i ? 1 : 0 }}
              />
              {/* Project label slides up on hover */}
              <div
                className="absolute bottom-0 left-0 right-0 p-3 transition-all duration-300"
                style={{
                  transform: hoveredIdx === i ? 'translateY(0)' : 'translateY(10px)',
                  opacity: hoveredIdx === i ? 1 : 0,
                }}
              >
                <p className="text-white text-xs font-bold">{img.project}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Gallery Button */}
      <div className="flex justify-center mt-8 sm:mt-10">
        <motion.a
          href="#projects"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="inline-flex items-center gap-2.5 bg-primary hover:bg-blue-900 text-white font-semibold px-7 py-3 rounded-xl shadow-md hover:shadow-xl transition-all duration-200 text-sm sm:text-base"
        >
          <FiImage className="w-4 h-4" />
          View All Projects &amp; Gallery
        </motion.a>
      </div>

      <style>{`
        .gallery-track {
          width: max-content;
          animation: gallery-scroll 45s linear infinite;
        }
        .gallery-item {
          width: 280px;
          height: 200px;
        }
        .gallery-img {
          transition: transform 0.45s ease;
        }
        @keyframes gallery-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(calc(-280px * ${allImages.length} - 20px * ${allImages.length})); }
        }
        @media (min-width: 640px) {
          .gallery-item {
            width: 300px;
            height: 210px;
          }
          @keyframes gallery-scroll {
            0%   { transform: translateX(0); }
            100% { transform: translateX(calc(-300px * ${allImages.length} - 20px * ${allImages.length})); }
          }
        }
      `}</style>
    </section>
  )
}
