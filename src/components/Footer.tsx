import amberisLogo from '../assets/amberisLogo.png'

const footerLinks = {
  orders: [
    { label: 'Delivery & Shipping', href: '/products' },
    { label: 'Complimentary Samples', href: '/products' },
    { label: 'Returns & Exchanges', href: '/products' },
    { label: 'Order Tracking', href: '/checkout' },
    { label: 'Routine Consultations', href: '/blog' },
  ],
  formulations: [
    { label: 'Skin Care', href: '/products' },
    { label: 'Body & Hand', href: '/body-hand' },
    { label: 'Hair Care', href: '/hair' },
    { label: 'Fragrance', href: '/fragrance' },
    { label: 'Home Formulations', href: '/home' },
  ],
  about: [
    { label: 'Our Philosophy', href: '/blog' },
    { label: 'Botanical Science', href: '/blog' },
    { label: 'Sustainable Packaging', href: '/returning' },
    { label: 'Store Architecture', href: '/blog' },
    { label: 'Careers at Amberis', href: '/blog' },
  ],
}

function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-[#22201d] text-[#dfdbd3] pt-16 pb-12 font-sans">
      <div className="mx-auto max-w-7xl px-[clamp(20px,5vw,72px)]">
        {/* Top Newsletter & Manifesto */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-[rgba(222,215,204,0.14)]">
          <div className="lg:col-span-6">
            <p className="text-[0.68rem] uppercase tracking-[0.24em] font-semibold text-[var(--soft-gold)] mb-3">
              The Amberis Dispatch
            </p>
            <h2 className="font-heading text-2xl lg:text-3xl font-normal text-[#f5f1eb] leading-snug tracking-tight mb-4">
              Subscribe for thoughtful observations on skincare, design, and botany.
            </h2>
            <p className="text-sm leading-[1.8] text-[#a8a39a] font-light max-w-md my-6">
              Receive invitations to private routine sessions, seasonal formulation reveals, and philosophical notes.
            </p>
            
            <form onSubmit={(e) => { e.preventDefault(); alert('Thank you for subscribing to The Amberis Dispatch.') }} className="flex flex-col sm:flex-row gap-3 max-w-md">
              <input
                type="email"
                required
                placeholder="Enter your email address"
                className="flex-1 bg-[rgba(255,255,255,0.08)] border border-[rgba(222,215,204,0.3)] px-4 py-3 text-sm text-[#f5f1eb] placeholder-[#8a857c] rounded-none focus:outline-none focus:border-[var(--soft-gold)] transition-colors"
              />
              <button
                type="submit"
                className="px-8 py-3 bg-[var(--aesop-ochre)] text-[#ffffff] text-xs font-semibold uppercase tracking-widest hover:bg-[#ffffff] hover:text-[#22201d] transition-all cursor-pointer shadow-sm"
              >
                Join
              </button>
            </form>
          </div>

          <div className="lg:col-span-6 grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div>
              <h3 className="text-[0.7rem] uppercase tracking-[0.2em] font-semibold text-[#f5f1eb] mb-5">
                Orders & Care
              </h3>
              <ul className="space-y-3 p-0 m-0 list-none text-xs text-[#a8a39a]">
                {footerLinks.orders.map((item) => (
                  <li key={item.label}>
                    <a href={item.href} className="hover:text-[#f5f1eb] transition-colors">
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-[0.7rem] uppercase tracking-[0.2em] font-semibold text-[#f5f1eb] mb-5">
                Formulations
              </h3>
              <ul className="space-y-3 p-0 m-0 list-none text-xs text-[#a8a39a]">
                {footerLinks.formulations.map((item) => (
                  <li key={item.label}>
                    <a href={item.href} className="hover:text-[#f5f1eb] transition-colors">
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-[0.7rem] uppercase tracking-[0.2em] font-semibold text-[#f5f1eb] mb-5">
                About Amberis
              </h3>
              <ul className="space-y-3 p-0 m-0 list-none text-xs text-[#a8a39a]">
                {footerLinks.about.map((item) => (
                  <li key={item.label}>
                    <a href={item.href} className="hover:text-[#f5f1eb] transition-colors">
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Brand quote & virtues */}
        <div className="py-12 border-b border-[rgba(222,215,204,0.14)] grid grid-cols-1 md:grid-cols-3 gap-8 items-center text-xs text-[#a8a39a]">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[var(--soft-gold)]"></span>
            <span>100% Certified Vegan & Cruelty-Free</span>
          </div>
          <div className="flex items-center gap-3 md:justify-center">
            <span className="w-2 h-2 rounded-full bg-[var(--soft-gold)]"></span>
            <span>Refillable Amber Glassware</span>
          </div>
          <div className="flex items-center gap-3 md:justify-end">
            <span className="w-2 h-2 rounded-full bg-[var(--soft-gold)]"></span>
            <span>Certified Carbon Neutral Delivery</span>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-[0.7rem] text-[#807b72]">
          <div className="flex items-center gap-4">
            <img src={amberisLogo} alt="Amberis" className="h-4 w-auto brightness-200 opacity-60 invert" />
            <span>&copy; {new Date().getFullYear()} Amberis Botanical Labs. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-6">
            <a href="/blog" className="hover:text-[#f5f1eb] transition-colors">Privacy Policy</a>
            <a href="/blog" className="hover:text-[#f5f1eb] transition-colors">Terms of Service</a>
            <a href="/blog" className="hover:text-[#f5f1eb] transition-colors">Cookie Preferences</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
