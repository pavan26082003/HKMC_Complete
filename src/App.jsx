import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ScrollToTop from './components/ScrollToTop'

// Lazy load non-critical components
const NewYearOfferBanner = lazy(() => import('./components/NewYearOfferBanner'))
const About = lazy(() => import('./components/About'))
const Projects = lazy(() => import('./components/Projects'))
const WhyChooseUs = lazy(() => import('./components/WhyChooseUs'))
const MDMessage = lazy(() => import('./components/MDMessage'))
const Calculator = lazy(() => import('./components/Calculator'))
const Testimonials = lazy(() => import('./components/Testimonials'))
const LeadCapture = lazy(() => import('./components/LeadCapture'))
const Footer = lazy(() => import('./components/Footer'))
const FloatingButtons = lazy(() => import('./components/FloatingButtons'))
const ProjectDetails = lazy(() => import('./pages/ProjectDetails'))

// Loading fallback component
const LoadingFallback = () => (
  <div className="flex items-center justify-center py-20">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
  </div>
)

function HomePage() {
  return (
    <div className="min-h-screen">
      <Navbar />

      <main>
        {/* 1. First Impression - Load immediately */}
        <Hero />
        
        {/* Lazy load remaining sections */}
        <Suspense fallback={<LoadingFallback />}>
          <NewYearOfferBanner />

          {/* 2. Trust + Info */}
          <About />
          <WhyChooseUs />

          {/* 3. Core Offering */}
          <Projects />

          {/* 5. Social Proof */}
          <Testimonials />

          {/* 6. Authority */}
          <MDMessage />

          {/* 7. Engagement Tool */}
          <Calculator />

          {/* 8. Lead Capture */}
          <LeadCapture />

          {/* 9. Footer */}
          <Footer />

          {/* 10. Floating CTA */}
          <FloatingButtons />
        </Suspense>
      </main>
    </div>
  )
}

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




