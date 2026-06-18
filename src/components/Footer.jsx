import { FiPhone, FiMail, FiMapPin } from 'react-icons/fi'
import { RiWhatsappLine, RiInstagramLine, RiLinkedinBoxFill, RiFacebookBoxFill } from 'react-icons/ri'
import { PHONE_CALL, PHONE_WHATSAPP, EMAIL } from '../data/content'

const SOCIAL = [
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/hkmcbuildersanddevelopers/',
    Icon: RiInstagramLine,
    bg: 'bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400',
    shadow: 'hover:shadow-pink-500/40',
  },
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/profile.php?id=61584484567086',
    Icon: RiFacebookBoxFill,
    bg: 'bg-[#1877F2]',
    shadow: 'hover:shadow-blue-500/40',
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/80370214/',
    Icon: RiLinkedinBoxFill,
    bg: 'bg-[#0A66C2]',
    shadow: 'hover:shadow-sky-500/40',
  },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-10">

          {/* Brand — full width on mobile */}
          <div className="col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              <img
                src="/favicon_io/apple-touch-icon.png"
                alt="HKMC Builders Logo"
                className="w-7 sm:w-8 h-7 sm:h-8 rounded-full object-cover"
              />
              <div className="leading-none">
                <div className="font-serif font-bold text-base sm:text-lg leading-tight text-white">HKMC</div>
                <div className="text-white/60 text-xs">Builders &amp; Developers</div>
              </div>
            </div>
            <p className="text-white/60 text-xs sm:text-sm leading-relaxed mb-4">
              Unit No. 220, 2nd Floor, Downtown Mall, Flat No. 6-2-27, 24A &amp; 28, Lakdikapul, Hyderabad, Telangana 500004
            </p>
            {/* Social icons */}
            <div className="flex items-center gap-3 mt-1">
              <span className="text-white/40 text-xs uppercase tracking-wider">Follow us</span>
              <div className="flex gap-2">
                {SOCIAL.map(({ label, href, Icon, bg, shadow }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className={`w-9 h-9 rounded-xl ${bg} flex items-center justify-center text-white shadow-lg ${shadow} hover:shadow-xl hover:scale-110 transition-all duration-200`}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white mb-3 sm:mb-4 text-xs sm:text-sm uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2 sm:space-y-2.5">
              {[
                { label: 'Home', href: '#home' },
                { label: 'About Us', href: '#about' },
                { label: 'Our Projects', href: '#projects' },
                { label: 'Why Choose Us', href: '#why-us' },
                { label: 'Investment Calculator', href: '#calculator' },
                { label: 'Contact Us', href: '#contact' },
              ].map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-white/60 hover:text-accent text-xs sm:text-sm transition-colors">
                    → {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Projects */}
          <div>
            <h4 className="font-semibold text-white mb-3 sm:mb-4 text-xs sm:text-sm uppercase tracking-wider">Our Projects</h4>
            <div className="space-y-2 sm:space-y-4">
              <div>
                <div className="text-accent font-medium text-xs sm:text-sm mb-0.5">Kodangal Grand City</div>
                <div className="text-white/60 text-xs">Kodangal · ₹3,500/sq.yd</div>
              </div>
              <div>
                <div className="text-accent font-medium text-xs sm:text-sm mb-0.5">Eden Farms</div>
                <div className="text-white/60 text-xs">Near Kodangal · ₹2,200/sq.yd</div>
              </div>
              <div>
                <div className="text-accent font-medium text-xs sm:text-sm mb-0.5">Deccan Heights</div>
                <div className="text-white/60 text-xs">Shadnagar · ₹8,500/sq.yd</div>
              </div>
            </div>
            <div className="mt-3 sm:mt-6">
              <h4 className="font-semibold text-white mb-2 text-xs uppercase tracking-wider">Approvals</h4>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {['HMDA', 'DTCP', 'RERA'].map((badge) => (
                  <span key={badge} className="bg-primary/30 text-white/80 text-xs px-2.5 py-1 rounded-full border border-primary/40">
                    {badge}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-white mb-3 sm:mb-4 text-xs sm:text-sm uppercase tracking-wider">Contact</h4>
            <div className="space-y-2 sm:space-y-3">
              <a href={`tel:${PHONE_CALL}`} className="flex items-center gap-2 text-white/60 hover:text-accent text-xs sm:text-sm transition-colors">
                <FiPhone className="w-3.5 sm:w-4 h-3.5 sm:h-4 shrink-0" /> {PHONE_CALL}
              </a>
              <a href={`https://wa.me/91${PHONE_WHATSAPP}`} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 text-white/60 hover:text-green-400 text-xs sm:text-sm transition-colors">
                <RiWhatsappLine className="w-3.5 sm:w-4 h-3.5 sm:h-4 shrink-0" /> WhatsApp
              </a>
              <a href={`mailto:${EMAIL}`} className="flex items-center gap-2 text-white/60 hover:text-accent text-xs sm:text-sm transition-colors break-all">
                <FiMail className="w-3.5 sm:w-4 h-3.5 sm:h-4 shrink-0" /> {EMAIL}
              </a>
              <div className="flex items-start gap-2 text-white/60 text-xs sm:text-sm">
                <FiMapPin className="w-3.5 sm:w-4 h-3.5 sm:h-4 shrink-0 mt-0.5" />
                <span>Hyderabad, Telangana, India</span>
              </div>
            </div>

            <a href={`https://wa.me/91${PHONE_WHATSAPP}?text=Hi, I found your contact details in the footer. I want to know more about your plots and available projects.`}
              target="_blank" rel="noopener noreferrer"
              className="mt-4 sm:mt-5 inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white text-xs sm:text-sm px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg font-medium transition-colors">
              <RiWhatsappLine className="w-3.5 sm:w-4 h-3.5 sm:h-4" /> Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-5 flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-3">
          <p className="text-white/40 text-xs text-center sm:text-left">
            © {year} HKMC Builders and Developers Pvt Ltd. All rights reserved.
          </p>
          {/* Social + legal links */}
          <div className="flex items-center gap-3">
            {SOCIAL.map(({ label, href, Icon, bg, shadow }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className={`w-8 h-8 rounded-lg ${bg} flex items-center justify-center text-white shadow-md ${shadow} hover:shadow-lg hover:scale-110 transition-all duration-200`}
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
            <span className="text-white/20 text-xs">|</span>
            <a href="#" className="text-white/40 hover:text-white/70 text-xs transition-colors">Privacy Policy</a>
            <a href="#" className="text-white/40 hover:text-white/70 text-xs transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
