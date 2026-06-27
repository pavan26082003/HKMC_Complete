import { lazy, Suspense, memo } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ScrollToTop from './components/ScrollToTop'

// Lazy load non-critical components with prefetch hints
const NewYearOfferBanner = lazy(() => import('./components/NewYearOfferBanner'))
const About = lazy(() => import('./components/About'))
const Projects = lazy(() => import('./components/Projects'))
const GallerySlider = lazy(() => import('./components/GallerySlider'))
const WhyChooseUs = lazy(() => import('./components/WhyChooseUs'))
const MDMessage = lazy(() => import('./components/MDMessage'))
const Testimonials = lazy(() => import('./components/Testimonials'))
const LeadCapture = lazy(() => import('./components/LeadCapture'))
const Footer = lazy(() => import('./components/Footer'))
const FloatingButtons = lazy(() => import('./components/FloatingButtons'))
const ProjectDetails = lazy(() => import('./pages/ProjectDetails'))

// Minimal loading fallback — null to avoid layout shift
const LoadingFallback = memo(() => null)
LoadingFallback.displayName = 'LoadingFallback'

// Memoized HomePage to prevent unnecessary re-renders
const HomePage = memo(() => {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Navbar />

      <main className="w-full overflow-x-hidden">
        {/* 1. First Impression - Load immediately */}
        <Hero />
        
        {/* Lazy load remaining sections with minimal fallback */}
        <Suspense fallback={<LoadingFallback />}>
          <NewYearOfferBanner />
          <About />
          <WhyChooseUs />
          <Projects />
          <GallerySlider />
          <Testimonials />
          <MDMessage />
          <LeadCapture />
          <Footer />
          <FloatingButtons />
        </Suspense>
      </main>
    </div>
  )
})

HomePage.displayName = 'HomePage'

// ── App with router ───────────────────────────────────────────────────────────
export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/project/:id" element={<ProjectDetails />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}




