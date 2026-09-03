import { type FormEvent, useState, useEffect } from 'react'
import amberisLogo from '../assets/amberisLogo.png'
import { useApp } from '../contexts/AppContext'
import { loginUser, registerUser } from '../services/authService'

type AuthFormProps = {
  mode?: 'login' | 'register'
}

function AuthForm({ mode = 'login' }: AuthFormProps) {
  const [currentMode, setCurrentMode] = useState<'login' | 'register'>(mode)
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ text: string; type: 'error' | 'success' } | null>(null)
  
  const isRegister = currentMode === 'register'
  const { login, isAuthenticated } = useApp()

  useEffect(() => {
    if (isAuthenticated) {
      window.location.href = '/products'
    }
  }, [isAuthenticated])

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setMessage(null)
    setLoading(true)
    
    const formData = new FormData(event.currentTarget)
    const email = (formData.get('email') as string)?.trim()
    const password = formData.get('password') as string

    try {
      if (isRegister) {
        const firstName = (formData.get('firstName') as string)?.trim()
        const lastName = (formData.get('lastName') as string)?.trim()
        const phone = (formData.get('phone') as string)?.trim()
        const confirmPassword = formData.get('confirmPassword') as string

        if (password !== confirmPassword) {
          setMessage({ text: 'Passwords do not match. Please re-enter.', type: 'error' })
          setLoading(false)
          return
        }

        const res = await registerUser({ firstName, lastName, email, phone, password })
        login(res.token, {
          _id: res.user?._id,
          email: res.user?.email || email,
          firstName: res.user?.profile?.firstName || res.user?.firstName || firstName,
          lastName: res.user?.profile?.lastName || res.user?.lastName || lastName,
          role: res.user?.role,
        })
        setMessage({ text: 'Account created successfully. Preparing your curated experience...', type: 'success' })
      } else {
        const res = await loginUser({ email, password })
        login(res.token, {
          _id: res.user?._id,
          email: res.user?.email || email,
          firstName: res.user?.profile?.firstName || res.user?.firstName || '',
          lastName: res.user?.profile?.lastName || res.user?.lastName || '',
          role: res.user?.role,
        })
        setMessage({ text: 'Welcome back. Accessing your profile...', type: 'success' })
      }

      setTimeout(() => {
        window.location.href = '/products'
      }, 1100)
    } catch (err: any) {
      console.error(err)
      const errorMsg = err.response?.data?.message || 'Authentication unsuccessful. Please check your credentials.'
      setMessage({ text: errorMsg, type: 'error' })
      setLoading(false)
    }
  }

  return (
    <section className="min-h-svh bg-[var(--aesop-cream)] text-[var(--text)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-0 overflow-hidden border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow-elevated)]">
        
        {/* Left Editorial Philosophy Column */}
        <div className="lg:col-span-6 bg-[#22201d] text-[#f4eee6] p-8 sm:p-12 lg:p-16 flex flex-col justify-between relative overflow-hidden border-b lg:border-b-0 lg:border-r border-[rgba(255,255,255,0.08)]">
          {/* Subtle background ambient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-transparent to-[rgba(184,138,68,0.12)] pointer-events-none"></div>

          <div className="relative z-10">
            <a href="/" className="inline-block mb-12">
              <img src={amberisLogo} alt="Amberis" className="h-10 w-auto brightness-200 invert opacity-90 object-contain" />
            </a>
            
            <p className="text-[0.68rem] uppercase tracking-[0.24em] font-semibold text-[var(--soft-gold)] mb-4">
              Private Skincare Clientèle
            </p>
            
            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-normal leading-[1.15] text-[#faf7f2] tracking-tight mb-6">
              Formulations conceived with scientific rigor and sensory pleasure.
            </h1>
            
            <p className="text-sm sm:text-base leading-[1.8] text-[#c4bcb0] font-light max-w-md my-6">
              An Amberis profile allows you to curate personal routine recommendations, track botanical orders, and manage bespoke consultation notes.
            </p>
          </div>

          {/* Pillars */}
          <div className="relative z-10 mt-12 pt-8 border-t border-[rgba(255,255,255,0.12)] grid grid-cols-3 gap-4 text-center">
            <div className="space-y-1">
              <p className="text-[0.65rem] uppercase tracking-[0.16em] font-semibold text-[#faf7f2]">Pure Botanicals</p>
              <p className="text-[0.68rem] text-[#9c9589] mt-1">Certified vegan</p>
            </div>
            <div className="space-y-1 border-x border-[rgba(255,255,255,0.12)] px-2">
              <p className="text-[0.65rem] uppercase tracking-[0.16em] font-semibold text-[#faf7f2]">Amber Glass</p>
              <p className="text-[0.68rem] text-[#9c9589] mt-1">Refill eligible</p>
            </div>
            <div className="space-y-1">
              <p className="text-[0.65rem] uppercase tracking-[0.16em] font-semibold text-[#faf7f2]">Consultations</p>
              <p className="text-[0.68rem] text-[#9c9589] mt-1">Private guidance</p>
            </div>
          </div>
        </div>

        {/* Right Form Column */}
        <div className="lg:col-span-6 p-8 sm:p-12 lg:p-14 flex flex-col justify-center bg-[var(--surface)]">
          
          {/* Mode Switcher Tabs */}
          <div className="grid grid-cols-2 gap-2 p-1.5 bg-[#f3ede2] border border-[#ded7cc] mb-8">
            <button
              type="button"
              onClick={() => { setCurrentMode('login'); setMessage(null) }}
              className={`py-2.5 text-xs font-semibold uppercase tracking-[0.16em] cursor-pointer transition-all ${
                !isRegister
                  ? 'bg-[#22201d] !text-white shadow-sm'
                  : 'bg-transparent text-[#555048] hover:text-[#22201d]'
              }`}
            >
              <span className={!isRegister ? '!text-white' : ''}>Sign In</span>
            </button>
            <button
              type="button"
              onClick={() => { setCurrentMode('register'); setMessage(null) }}
              className={`py-2.5 text-xs font-semibold uppercase tracking-[0.16em] cursor-pointer transition-all ${
                isRegister
                  ? 'bg-[#22201d] !text-white shadow-sm'
                  : 'bg-transparent text-[#555048] hover:text-[#22201d]'
              }`}
            >
              <span className={isRegister ? '!text-white' : ''}>Create Account</span>
            </button>
          </div>

          <div className="mb-8">
            <h2 className="font-heading text-2xl sm:text-3xl font-normal text-[var(--text-h)] mb-3">
              {isRegister ? 'Begin your routine with Amberis' : 'Welcome back'}
            </h2>
            <p className="text-xs sm:text-sm text-[var(--taupe)] font-light leading-relaxed">
              {isRegister
                ? 'Please complete the details below to establish your profile.'
                : 'Please enter your registered credentials to proceed.'}
            </p>
          </div>

          {/* Feedback banner */}
          {message && (
            <div
              className={`mb-6 p-4 text-xs font-medium border leading-relaxed flex items-start gap-3 ${
                message.type === 'error'
                  ? 'bg-[#fcf3f2] border-[#e8c0bb] text-[#8a241b]'
                  : 'bg-[#f4f7f2] border-[#c0d6ba] text-[#295c24]'
              }`}
            >
              <span className="font-bold text-sm leading-none">
                {message.type === 'error' ? '!' : '✓'}
              </span>
              <span>{message.text}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {isRegister && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[0.68rem] uppercase tracking-[0.16em] font-semibold text-[var(--text-h)] mb-1.5">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    required
                    autoComplete="given-name"
                    placeholder="e.g. Eleanor"
                    className="w-full bg-[#ffffff] border border-[#ded7cc] px-4 py-3 text-sm text-[var(--text-h)] placeholder-[#a39d93] focus:outline-none focus:border-[var(--aesop-dark)] transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[0.68rem] uppercase tracking-[0.16em] font-semibold text-[var(--text-h)] mb-1.5">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    required
                    autoComplete="family-name"
                    placeholder="e.g. Vance"
                    className="w-full bg-[#ffffff] border border-[#ded7cc] px-4 py-3 text-sm text-[var(--text-h)] placeholder-[#a39d93] focus:outline-none focus:border-[var(--aesop-dark)] transition-all"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-[0.68rem] uppercase tracking-[0.16em] font-semibold text-[var(--text-h)] mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                required
                autoComplete="email"
                placeholder="name@domain.com"
                className="w-full bg-[#ffffff] border border-[#ded7cc] px-4 py-3 text-sm text-[var(--text-h)] placeholder-[#a39d93] focus:outline-none focus:border-[var(--aesop-dark)] transition-all"
              />
            </div>

            {isRegister && (
              <div>
                <label className="block text-[0.68rem] uppercase tracking-[0.16em] font-semibold text-[var(--text-h)] mb-1.5">
                  Phone Number <span className="text-[var(--taupe)] font-normal">(Optional)</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  autoComplete="tel"
                  placeholder="+1 (555) 000-0000"
                  className="w-full bg-[#ffffff] border border-[#ded7cc] px-4 py-3 text-sm text-[var(--text-h)] placeholder-[#a39d93] focus:outline-none focus:border-[var(--aesop-dark)] transition-all"
                />
              </div>
            )}

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-[0.68rem] uppercase tracking-[0.16em] font-semibold text-[var(--text-h)]">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-[0.68rem] uppercase tracking-wider font-semibold text-[#22201d] hover:text-[var(--aesop-ochre)] bg-transparent border-none cursor-pointer"
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                required
                minLength={8}
                autoComplete={isRegister ? 'new-password' : 'current-password'}
                placeholder="Minimum 8 characters"
                className="w-full bg-[#ffffff] border border-[#ded7cc] px-4 py-3 text-sm text-[var(--text-h)] placeholder-[#a39d93] focus:outline-none focus:border-[var(--aesop-dark)] transition-all"
              />
            </div>

            {isRegister && (
              <div>
                <label className="block text-[0.68rem] uppercase tracking-[0.16em] font-semibold text-[var(--text-h)] mb-1.5">
                  Confirm Password
                </label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  required
                  minLength={8}
                  autoComplete="new-password"
                  placeholder="Repeat your password"
                  className="w-full bg-[#ffffff] border border-[#ded7cc] px-4 py-3 text-sm text-[var(--text-h)] placeholder-[#a39d93] focus:outline-none focus:border-[var(--aesop-dark)] transition-all"
                />
              </div>
            )}

            {!isRegister ? (
              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 text-xs text-[var(--taupe)] cursor-pointer">
                  <input type="checkbox" name="remember" className="w-3.5 h-3.5 accent-[var(--aesop-dark)]" />
                  <span>Remember my preferences</span>
                </label>
                <a href="/login" className="text-xs text-[var(--aesop-dark)] font-medium underline hover:text-[var(--aesop-ochre)]">
                  Forgot password?
                </a>
              </div>
            ) : (
              <div className="pt-2">
                <label className="flex items-start gap-2.5 text-xs text-[var(--taupe)] cursor-pointer">
                  <input type="checkbox" name="terms" required className="w-3.5 h-3.5 mt-0.5 accent-[var(--aesop-dark)]" />
                  <span>I accept the Amberis client charter and wish to receive seasonal botanical notes.</span>
                </label>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-primary !text-white bg-[#22201d] w-full mt-5 py-4 px-6 text-xs uppercase tracking-[0.18em] font-semibold disabled:opacity-50 shadow-sm flex items-center justify-center gap-2 cursor-pointer"
            >
              {loading ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span className="!text-white">Processing...</span>
                </>
              ) : (
                <span className="!text-white">{isRegister ? 'Complete Registration' : 'Sign In to Profile'}</span>
              )}
            </button>
          </form>

          {/* Quick Helper Switch */}
          <div className="mt-8 pt-6 border-t border-[var(--border)] text-center text-xs text-[var(--taupe)]">
            <p>
              {isRegister ? 'Already registered with Amberis?' : 'New to our botanical formulations?'}{' '}
              <button
                type="button"
                onClick={() => { setCurrentMode(isRegister ? 'login' : 'register'); setMessage(null) }}
                className="font-semibold text-[var(--aesop-dark)] hover:text-[var(--aesop-ochre)] underline cursor-pointer bg-transparent border-none"
              >
                {isRegister ? 'Sign in here' : 'Create an account'}
              </button>
            </p>
          </div>
        </div>

      </div>
    </section>
  )
}

export default AuthForm
