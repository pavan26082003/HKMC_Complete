import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import { TrendingUp, Shield, CheckCircle, Users, Award, Phone } from 'lucide-react'

const projectOptions = [
  { name: 'Eden Farms (Konadal)', pricePerSqYd: 2000, annualGrowth: 0.20, investors: '500+' },
  { name: 'Deccan Heights (Shadnagar)', pricePerSqYd: 8500, annualGrowth: 0.28, investors: '300+' },
]

const plotSizeOptions = {
  'Eden Farms (Konadal)': [100, 200, 400, 800],
  'Deccan Heights (Shadnagar)': [121, 242],
}

function formatINR(val) {
  if (val >= 10000000) return `₹${(val / 10000000).toFixed(2)} Cr`
  if (val >= 100000) return `₹${(val / 100000).toFixed(2)} L`
  return `₹${val.toLocaleString('en-IN')}`
}

export default function Calculator() {
  const [ref, inView] = useInView()
  const [selectedProject, setSelectedProject] = useState(projectOptions[0])
  const [plotSize, setPlotSize] = useState(200)
  const [years, setYears] = useState(3)

  const result = useMemo(() => {
    const investedAmount = plotSize * selectedProject.pricePerSqYd
    const futureValue = investedAmount * Math.pow(1 + selectedProject.annualGrowth, years)
    const profit = futureValue - investedAmount
    const roi = ((profit / investedAmount) * 100).toFixed(0)
    return { investedAmount, futureValue, profit, roi }
  }, [selectedProject, plotSize, years])

  const yearlyBreakdown = useMemo(() => {
    return Array.from({ length: years }, (_, i) => {
      const y = i + 1
      const val = result.investedAmount * Math.pow(1 + selectedProject.annualGrowth, y)
      return { year: y, value: val }
    })
  }, [result.investedAmount, selectedProject.annualGrowth, years])

  return (
    <section id="calculator" className="py-20 bg-gradient-to-br from-primary via-blue-900 to-primary relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-accent/20 text-accent text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            <TrendingUp className="w-4 h-4" />
            Investment ROI Calculator
          </div>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-white gold-underline">
            See Your Wealth Grow with Real Numbers
          </h2>
          <p className="text-white/80 mt-4 max-w-2xl mx-auto text-lg">
            Based on actual market trends and historical data. Calculate your potential returns with complete transparency.
          </p>
          
          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center gap-6 mt-8 text-white/90">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-accent" />
              <span className="text-sm">RERA Approved</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-accent" />
              <span className="text-sm">800+ Happy Investors</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-accent" />
              <span className="text-sm">15+ Years Experience</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="bg-white rounded-3xl p-4 sm:p-6 md:p-10 shadow-2xl"
        >
          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8">
            {/* Inputs */}
            <div className="space-y-4 sm:space-y-6">
              <div className="flex items-start justify-between flex-wrap gap-2">
                <h3 className="font-semibold text-dark text-lg sm:text-xl">Configure Your Investment</h3>
                <div className="flex items-center gap-1 text-green-600 text-xs bg-green-50 px-2 py-1 rounded-full">
                  <CheckCircle className="w-3 h-3" />
                  <span>Live Data</span>
                </div>
              </div>

              {/* Project Select */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Select Your Project</label>
                <div className="grid grid-cols-1 gap-3">
                  {projectOptions.map((p) => (
                    <button
                      key={p.name}
                      onClick={() => {
                        setSelectedProject(p)
                        setPlotSize(plotSizeOptions[p.name][0])
                      }}
                      className={`p-4 rounded-xl border-2 text-left transition-all ${
                        selectedProject.name === p.name
                          ? 'border-primary bg-primary/5 shadow-md'
                          : 'border-gray-200 hover:border-primary/40 hover:shadow-sm'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="font-semibold text-dark">{p.name}</div>
                        {selectedProject.name === p.name && (
                          <CheckCircle className="w-5 h-5 text-primary" />
                        )}
                      </div>
                      <div className="flex items-center gap-3 text-xs">
                        <span className="text-gray-600">₹{p.pricePerSqYd.toLocaleString('en-IN')}/sq.yd</span>
                        <span className="text-green-600 font-semibold">~{(p.annualGrowth * 100).toFixed(0)}% growth/year</span>
                      </div>
                      <div className="flex items-center gap-1 mt-2 text-xs text-gray-500">
                        <Users className="w-3 h-3" />
                        <span>{p.investors} investors</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Plot Size */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Choose Plot Size</label>
                <div className="grid grid-cols-2 gap-2 sm:gap-3">
                  {plotSizeOptions[selectedProject.name].map((size) => (
                    <button
                      key={size}
                      onClick={() => setPlotSize(size)}
                      className={`py-2.5 sm:py-3 px-3 sm:px-4 rounded-xl border-2 text-xs sm:text-sm font-semibold transition-all ${
                        plotSize === size
                          ? 'border-accent bg-accent text-dark shadow-md'
                          : 'border-gray-200 text-gray-600 hover:border-accent/40 hover:shadow-sm'
                      }`}
                    >
                      {size} sq.yd
                    </button>
                  ))}
                </div>
              </div>

              {/* Years Slider */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Investment Horizon: <span className="text-primary font-bold text-lg">{years} Year{years > 1 ? 's' : ''}</span>
                </label>
                <input
                  type="range"
                  min={1}
                  max={10}
                  value={years}
                  onChange={(e) => setYears(Number(e.target.value))}
                  className="w-full h-2 accent-primary cursor-pointer"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span>1 Year</span>
                  <span>5 Years</span>
                  <span>10 Years</span>
                </div>
              </div>

              {/* Trust Message */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div className="text-xs text-gray-700">
                    <p className="font-semibold text-blue-900 mb-1">100% Transparent Calculations</p>
                    <p>Growth rates based on historical market data and location appreciation trends. Actual returns may vary.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="space-y-4 sm:space-y-5">
              <div className="flex items-start justify-between flex-wrap gap-2">
                <h3 className="font-semibold text-dark text-lg sm:text-xl">Your Potential Returns</h3>
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <TrendingUp className="w-3 h-3" />
                  <span>Projected</span>
                </div>
              </div>

              {/* Main Result Card */}
              <div className="bg-gradient-to-br from-primary via-blue-800 to-primary rounded-2xl p-4 sm:p-6 text-white shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 sm:w-32 h-24 sm:h-32 bg-white/5 rounded-full -mr-12 sm:-mr-16 -mt-12 sm:-mt-16"></div>
                <div className="absolute bottom-0 left-0 w-20 sm:w-24 h-20 sm:h-24 bg-white/5 rounded-full -ml-10 sm:-ml-12 -mb-10 sm:-mb-12"></div>
                
                <div className="relative z-10">
                  <div className="text-center mb-3 sm:mb-4">
                    <div className="text-white/80 text-xs sm:text-sm mb-2">Your Investment Today</div>
                    <div className="text-2xl sm:text-3xl md:text-4xl font-bold font-serif">{formatINR(result.investedAmount)}</div>
                  </div>
                  
                  <div className="flex items-center justify-center my-3 sm:my-4">
                    <div className="h-px w-8 sm:w-12 bg-accent"></div>
                    <TrendingUp className="w-5 sm:w-6 h-5 sm:h-6 text-accent mx-2" />
                    <div className="h-px w-8 sm:w-12 bg-accent"></div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-white/80 text-xs sm:text-sm mb-2">Estimated Value in {years} Year{years > 1 ? 's' : ''}</div>
                    <div className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif text-accent mb-2">{formatINR(result.futureValue)}</div>
                    <div className="inline-flex items-center gap-2 bg-green-500/20 text-green-300 px-3 py-1 rounded-full text-xs sm:text-sm font-semibold">
                      <TrendingUp className="w-3 sm:w-4 h-3 sm:h-4" />
                      <span>+{result.roi}% Total ROI</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-3 sm:p-4 border border-green-200">
                  <div className="text-green-700 font-bold text-xl sm:text-2xl mb-1">{formatINR(result.profit)}</div>
                  <div className="text-gray-600 text-xs font-medium">Potential Profit</div>
                  <div className="text-green-600 text-xs mt-1">Tax benefits applicable*</div>
                </div>
                <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl p-3 sm:p-4 border border-amber-200">
                  <div className="text-amber-700 font-bold text-xl sm:text-2xl mb-1">{((selectedProject.annualGrowth) * 100).toFixed(1)}%</div>
                  <div className="text-gray-600 text-xs font-medium">Annual Growth Rate</div>
                  <div className="text-amber-600 text-xs mt-1">Based on market trends</div>
                </div>
              </div>

              {/* Year-by-year Growth */}
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-5 border border-gray-200">
                <h4 className="text-sm font-semibold text-dark mb-4 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-primary" />
                  Year-by-Year Wealth Growth
                </h4>
                <div className="space-y-3">
                  {yearlyBreakdown.map((y) => {
                    const pct = ((y.value - result.investedAmount) / result.investedAmount) * 100
                    const barWidth = Math.min((pct / (result.roi * 1)) * 100, 100)
                    return (
                      <div key={y.year}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-medium text-gray-600">Year {y.year}</span>
                          <span className="text-xs font-bold text-primary">{formatINR(y.value)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-gray-200 rounded-full h-2.5 overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={inView ? { width: `${barWidth}%` } : {}}
                              transition={{ duration: 0.8, delay: y.year * 0.1 }}
                              className="h-2.5 bg-gradient-to-r from-primary via-blue-600 to-accent rounded-full"
                            />
                          </div>
                          <span className="text-xs font-semibold text-green-600">+{pct.toFixed(0)}%</span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="space-y-3 pt-2">
                <a 
                  href="tel:7801052288" 
                  className="btn-primary w-full text-center flex items-center justify-center gap-2 text-base font-semibold py-4 shadow-lg hover:shadow-xl transition-all"
                >
                  <Phone className="w-5 h-5" />
                  Book Free Site Visit — Call Now
                </a>
                
                {/* <div className="grid grid-cols-2 gap-3">
                  <a 
                    href="#projects" 
                    className="flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 rounded-xl transition-all text-sm border border-gray-300"
                  >
                    View Projects
                  </a>
                  <a 
                    href="tel:7801052288" 
                    className="flex items-center justify-center gap-2 bg-primary/10 hover:bg-primary hover:text-white text-primary font-semibold py-3 rounded-xl transition-all text-sm border border-primary/20"
                  >
                    <Phone className="w-4 h-4" />
                    Call Expert
                  </a>
                </div> */}
              </div>

              {/* Trust Footer */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-center">
                <p className="text-xs text-gray-600">
                  <span className="font-semibold text-blue-900">Join 800+ smart investors</span> who've already secured their financial future with HKMC
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
