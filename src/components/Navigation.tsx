import { useState } from 'react'
import { useApp } from '../contexts/AppContext'
import amberisLogo from '../assets/amberisLogo.png'

const navItems = [
  { label: 'Skin Care', href: '/products' },
  { label: 'Body & Hand', href: '/body-hand' },
  { label: 'Hair', href: '/hair' },
  { label: 'Fragrance', href: '/fragrance' },
  { label: 'The Journal', href: '/blog' },
]

function Navigation() {
  const { cart, isAuthenticated, logout, user } = useApp()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="bg-[var(--aesop-dark)] text-[#dfdbd3] text-[0.68rem] tracking-[0.16em] uppercase py-2.5 px-4 overflow-hidden border-b border-[rgba(255,255,255,0.08)]">
        <div className="flex justify-center items-center gap-8 text-center font-medium">
          <span className="hidden sm:inline opacity-80">Complimentary carbon-neutral delivery on orders over $50</span>
          <span className="hidden md:inline text-[var(--soft-gold)]">•</span>
          <span>Sample formulations included with every order</span>
          <span className="hidden lg:inline text-[var(--soft-gold)]">•</span>
          <a href="/products" className="hidden lg:inline underline hover:text-[var(--soft-gold)] transition-colors">
            Discover Autumn Rituals
          </a>
        </div>
      </div>

      {/* Main Navigation Header */}
      <header
        className="sticky top-0 z-50 bg-[var(--surface)]/95 backdrop-blur-md border-b border-[var(--border)] transition-all duration-200"
        aria-label="Amberis primary"
      >
        <div className="mx-auto max-w-7xl px-[clamp(16px,4vw,48px)] py-4 flex items-center justify-between gap-6">
          
          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-1.5 -ml-1.5 text-[var(--text-h)] hover:text-[var(--taupe)] cursor-pointer bg-transparent border-none focus-luxury"
            aria-label="Toggle mobile menu"
            type="button"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              )}
            </svg>
          </button>

          {/* Logo */}
          <a
            className="flex items-center no-underline focus-luxury group"
            href="/"
            aria-label="Amberis home"
          >
            <img
              className="h-12 w-auto object-contain transition-opacity duration-300 group-hover:opacity-80"
              src={amberisLogo}
              alt="Amberis"
            />
          </a>

          {/* Desktop Navigation Links */}
          <nav
            className="hidden lg:flex items-center gap-8"
            aria-label="Main navigation"
          >
            {navItems.map((item) => (
              <a
                className="relative py-1 text-[0.72rem] font-medium uppercase tracking-[0.16em] text-[var(--text-h)] no-underline transition-colors duration-200 hover:text-[var(--taupe)] group focus-luxury"
                href={item.href}
                key={item.label}
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[var(--text-h)] transition-all duration-300 ease-out group-hover:w-full"></span>
              </a>
            ))}
          </nav>

          {/* Right Action Icons & User Status */}
          <div className="flex items-center gap-5 sm:gap-7">
            {isAuthenticated ? (
              <div className="flex items-center gap-4">
                <a
                  href="/my-orders"
                  className="text-[0.7rem] uppercase tracking-[0.14em] text-[var(--taupe)] hover:text-[var(--text-h)] font-medium transition-colors no-underline focus-luxury"
                >
                  {user?.firstName ? `Hi, ${user.firstName}` : 'My Orders'}
                </a>
                <span className="text-[var(--border)] hidden sm:inline">|</span>
                <button
                  onClick={logout}
                  className="text-[0.7rem] uppercase tracking-[0.14em] font-medium text-[var(--text-h)] hover:text-[var(--taupe)] transition-colors cursor-pointer bg-transparent border-none focus-luxury"
                  type="button"
                >
                  Log out
                </button>
              </div>
            ) : (
              <a
                className="text-[0.7rem] uppercase tracking-[0.14em] font-medium text-[var(--text-h)] hover:text-[var(--taupe)] transition-colors no-underline focus-luxury"
                href="/login"
              >
                Log in
              </a>
            )}

            {/* Cart Link */}
            <a
              className="relative inline-flex items-center gap-2 text-[0.7rem] uppercase tracking-[0.14em] font-medium text-[var(--text-h)] hover:text-[var(--taupe)] transition-colors no-underline focus-luxury"
              href="/cart"
            >
              <span>Cart</span>
              {cartCount > 0 && (
                <span className="inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full bg-[var(--aesop-dark)] text-[10px] text-[var(--cream)] font-bold shadow-sm transition-transform duration-200 animate-pulse">
                  {cartCount}
                </span>
              )}
            </a>
          </div>
        </div>

        {/* Mobile Slide-down Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-[var(--border)] bg-[var(--surface)] px-6 py-6 space-y-4 [animation:amberisReveal_240ms_ease-out]">
            <p className="text-[0.65rem] uppercase tracking-[0.2em] font-semibold text-[var(--taupe)]">
              Formulations & Reading
            </p>
            <div className="grid gap-3">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-base font-heading font-normal text-[var(--text-h)] hover:text-[var(--taupe)] py-1 border-b border-[rgba(0,0,0,0.04)]"
                >
                  {item.label}
                </a>
              ))}
            </div>

            <div className="pt-4 border-t border-[var(--border)] flex items-center justify-between text-xs uppercase tracking-widest text-[var(--taupe)]">
              <a href="/cart" onClick={() => setMobileMenuOpen(false)}>
                Cart ({cartCount})
              </a>
              {isAuthenticated ? (
                <div className="flex items-center gap-4">
                  <a href="/my-orders" onClick={() => setMobileMenuOpen(false)} className="text-[var(--text-h)]">
                    Orders
                  </a>
                  <button
                    onClick={() => {
                      logout()
                      setMobileMenuOpen(false)
                    }}
                    className="bg-transparent border-none text-[var(--text-h)] cursor-pointer uppercase text-xs"
                  >
                    Log out
                  </button>
                </div>
              ) : (
                <a href="/login" onClick={() => setMobileMenuOpen(false)}>
                  Sign In
                </a>
              )}
            </div>
          </div>
        )}
      </header>
    </>
  )
}

export default Navigation
