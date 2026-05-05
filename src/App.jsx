import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import NewYearOfferBanner from './components/NewYearOfferBanner'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import WhyChooseUs from './components/WhyChooseUs'
import MDMessage from './components/MDMessage'
import Calculator from './components/Calculator'
import Testimonials from './components/Testimonials'
import LeadCapture from './components/LeadCapture'
import Footer from './components/Footer'
import FloatingButtons from './components/FloatingButtons'
import ProjectDetails from './pages/ProjectDetails'
import ScrollToTop from './components/ScrollToTop'



// ── Home page (all sections) ───────────────────────────────────────
// function HomePage() {
//   return (
//     <div className="min-h-screen">
//       <Navbar />
//       <main>
//         <Hero />
//         <NewYearOfferBanner />
//         <About />
//         <Projects />
//         <WhyChooseUs />


//         {/* reviews */}
//         <Testimonials />


//         <MDMessage /> 

//         <Calculator />


//         {/* location advantage ,,  */}
//         {/* replace this section with video and images.  */}


//         {/* "Virtual Site Tour Booking" (Video + Calendar Integration) Embedded video walkthrough of each project with a "Book Live Virtual Tour" button. Visitors pick a date/time slot, enter phone/email. Perfect for NRI and out-of-city buyers. High intent leads. */}
//         {/* <LocationAdvantages /> */}



//         {/* get in touch section */}
//         {/* <LeadCapture />    */}

//       </main>


//       {/* <Footer /> */}
//       {/* <FloatingButtons /> */}
//     </div>
//   )
// }


function HomePage() {
  return (
    <div className="min-h-screen">
      <Navbar />

      <main>
        {/* 1. First Impression */}
        <Hero />
        <NewYearOfferBanner />

        {/* 2. Trust + Info */}
        <About />
        <WhyChooseUs />

        {/* 3. Core Offering */}
        <Projects />

        {/* 4. Location Advantage (IMPORTANT for real estate) */}
        {/* <LocationAdvantages /> */}

        {/* 5. Social Proof */}
        <Testimonials />

        {/* 6. Authority */}
        <MDMessage />

        {/* 7. Engagement Tool */}
        <Calculator />

        {/* 8. Lead Capture (VERY IMPORTANT) */}
        <LeadCapture />
      </main>

      {/* 9. Footer */}
      <Footer />

      {/* 10. Floating CTA */}
      <FloatingButtons />
    </div>
  )
}

// ── App with router ───────────────────────────────────────────────────────────
export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/project/:id" element={<ProjectDetails />} />
      </Routes>
    </BrowserRouter>
  )

}




