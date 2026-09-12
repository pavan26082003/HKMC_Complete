import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FiArrowLeft, FiDownload } from 'react-icons/fi'

const POLICY_PDF = '/hkmc_policy_doc/HKMC_Policies_Main.pdf'

export default function Policies() {
  useEffect(() => {
    const prev = document.title
    document.title = 'Legal & Policies | HKMC Builders'
    return () => { document.title = prev }
  }, [])

  return (
    <div
      className="h-screen bg-dark flex flex-col overflow-hidden"
      onContextMenu={(e) => e.preventDefault()}
    >
      <header className="shrink-0 bg-dark border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-white/80 hover:text-accent text-sm font-medium transition-colors"
          >
            <FiArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
          <div className="flex items-center gap-2 sm:gap-3">
            <img
              src="/favicon_io/apple-touch-icon.png"
              alt="HKMC Builders"
              className="w-7 h-7 rounded-full object-cover"
            />
            <span className="text-white font-semibold text-sm hidden sm:inline">All Policies</span>
            <a
              href={POLICY_PDF}
              download="HKMC_Policies_Main.pdf"
              className="inline-flex items-center gap-2 bg-accent hover:bg-accent/90 text-dark text-xs sm:text-sm font-semibold px-3 py-2 rounded-lg transition-colors"
            >
              <FiDownload className="w-4 h-4" />
              Download
            </a>
          </div>
        </div>
      </header>

      <iframe
        title="HKMC Legal & Policies"
        src={`${POLICY_PDF}#toolbar=0&navpanes=0`}
        className="flex-1 w-full bg-white"
      />
    </div>
  )
}
