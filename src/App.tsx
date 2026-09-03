import { useState, useEffect } from 'react'
import type { ComponentType } from 'react'
import MainLayout from './layouts/MainLayout'
import Cart from './components/Cart'
import Blog from './pages/Blog'
import CheckOut from './pages/CheckOut'
import Home from './pages/Home'
import Login from './pages/Login'
import ProductDetail from './pages/ProductDetail'
import Products from './pages/Products'
import Register from './pages/Register'
import ComingSoon from './pages/ComingSoon'
import NotFound from './pages/NotFound'
import OrderSuccessPage from './pages/OrderSuccessPage'
import MyOrdersPage from './pages/MyOrdersPage'
import ReturningKitchenLoop from './components/ReturningKitchenLoop'
import { getProducts } from './services/productService'
import { setProducts } from './data/products'
import { AppProvider } from './contexts/AppContext'

const routes: Record<string, ComponentType> = {
  '/': Home,
  '/products': Products,
  '/login': Login,
  '/register': Register,
  '/blog': Blog,
  '/cart': Cart,
  '/checkout': CheckOut,
  '/order-success': OrderSuccessPage,
  '/my-orders': MyOrdersPage,
  '/returning': ReturningKitchenLoop,
  '/body-hand': ComingSoon,
  '/hair': ComingSoon,
  '/fragrance': ComingSoon,
  '/home': ComingSoon,
  '/coming-soon': ComingSoon,
}

function AppContent() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    getProducts()
      .then((data) => {
        setProducts(data)
        setLoading(false)
      })
      .catch((err) => {
        console.error('Error fetching products:', err)
        setError('Unable to load formulations. Please try again later.')
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <div className="min-h-svh flex flex-col items-center justify-center bg-[var(--bg)] text-[var(--text-h)] font-sans px-6 text-center">
        <div className="w-12 h-12 border-2 border-[var(--accent-strong)] border-t-transparent rounded-full animate-spin mb-6"></div>
        <p className="text-[0.7rem] font-bold uppercase tracking-[0.2em] text-[var(--accent-strong)]">
          Amberis
        </p>
        <p className="mt-2 text-sm text-[var(--taupe)] font-light">
          Loading meticulous formulations...
        </p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-svh flex flex-col items-center justify-center bg-[var(--bg)] text-[var(--text-h)] font-sans px-6 text-center">
        <p className="text-[0.7rem] font-bold uppercase tracking-[0.2em] text-[var(--accent-strong)] mb-4">
          Amberis
        </p>
        <p className="text-md text-[var(--text-h)] font-medium max-w-[420px] leading-relaxed">
          {error}
        </p>
        <button
          onClick={() => window.location.reload()}
          className="btn-primary !text-white bg-[#22201d] mt-6 px-6 py-2.5 text-xs font-semibold uppercase tracking-wider"
          type="button"
        >
          <span className="!text-white">Retry</span>
        </button>
      </div>
    )
  }

  const Page =
    window.location.pathname.startsWith('/products/')
      ? ProductDetail
      : routes[window.location.pathname] ?? NotFound

  return (
    <MainLayout>
      <Page />
    </MainLayout>
  )
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  )
}

export default App
