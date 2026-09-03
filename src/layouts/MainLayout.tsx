import type { ReactNode } from 'react'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'

type MainLayoutProps = {
  children: ReactNode
}

function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex flex-col min-h-svh bg-[var(--bg)] text-[var(--text)]">
      <Navigation />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}

export default MainLayout
