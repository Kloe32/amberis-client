import { useMemo, useState, useEffect } from 'react'
import { productPrice, productPriceValue, products } from '../data/products'
import { useApp } from '../contexts/AppContext'
import type { Product } from '../data/products'

// Curated luxury category metadata to elevate raw database names & descriptions
const CATEGORY_EDITORIAL_INFO: Record<
  string,
  { shortName: string; name: string; title: string; description: string }
> = {
  all: {
    shortName: 'All Formulations',
    name: 'The Complete Collection',
    title: 'Botanical Formulations for Daily Living',
    description:
      'A meticulously curated suite of cleansers, toners, serums, moisturisers, and targeted treatments formulated with botanicals of exceptional therapeutic grade.',
  },
  cleansers: {
    shortName: 'Cleansers',
    name: 'Facial Cleansers',
    title: 'Purifying & Clarifying Cleansers',
    description:
      'Mild gel, oil, and botanical milk cleansers formulated to gently lift daily impurities, excess sebum, and makeup without disrupting the skin’s natural lipid mantle.',
  },
  toner: {
    shortName: 'Toners',
    name: 'Balancing Toners',
    title: 'Hydrating & Clarifying Toners',
    description:
      'Refreshing floral waters and humectant complexes designed to balance epidermal pH, refine texture, and prime the skin for optimal serum absorption.',
  },
  serum: {
    shortName: 'Serums',
    name: 'Targeted Serums',
    title: 'Antioxidant & Barrier Serums',
    description:
      'Highly concentrated botanical concentrates, lipid-soluble vitamins, and active ceramides engineered for intensive cellular restoration and radiance.',
  },
  moisturisers: {
    shortName: 'Moisturisers',
    name: 'Hydrating Moisturisers',
    title: 'Nourishing Creams & Emulsions',
    description:
      'Sensory barrier crèmes and lightweight hydration cushions that lock in essential moisture, delivering enduring comfort, suppleness, and a natural glow.',
  },
  suncream: {
    shortName: 'Sun Care',
    name: 'Sun Protection',
    title: 'Broad-Spectrum Daily Shields',
    description:
      'Weightless, non-greasy UV defence formulations infused with soothing botanicals to safeguard delicate skin from photo-aging and environmental fatigue.',
  },
}

function Products() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState<'default' | 'price-low' | 'price-high' | 'name'>('default')
  const [addedId, setAddedId] = useState<string | null>(null)
  const { addToCart, isAuthenticated } = useApp()

  // Read URL query parameter on mount if present (e.g. /products?category=cleansers)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const cat = params.get('category')
    if (cat) {
      setSelectedCategory(cat.toLowerCase())
    }
  }, [])

  // Dynamically extract unique categories from the products list with item counts
  const categoryOptions = useMemo(() => {
    const slugs = Array.from(new Set(products.map((p) => p.category?.slug).filter(Boolean)))
    
    const list = [
      {
        slug: 'all',
        label: 'All Formulations',
        count: products.length,
      },
      ...slugs.map((slug) => {
        const matching = products.filter((p) => p.category?.slug === slug)
        const editorial = CATEGORY_EDITORIAL_INFO[slug]
        const fallbackName = matching[0]?.category?.name || slug
        return {
          slug,
          label: editorial?.shortName || fallbackName,
          count: matching.length,
        }
      }),
    ]

    return list
  }, [products.length])

  // Active Category information for Hero Header
  const activeCategoryInfo = useMemo(() => {
    if (selectedCategory === 'all') {
      return CATEGORY_EDITORIAL_INFO.all
    }
    if (CATEGORY_EDITORIAL_INFO[selectedCategory]) {
      return CATEGORY_EDITORIAL_INFO[selectedCategory]
    }
    const matchedProduct = products.find((p) => p.category?.slug === selectedCategory)
    return {
      shortName: matchedProduct?.category?.name || 'Category',
      name: matchedProduct?.category?.name || 'Formulations',
      title: `${matchedProduct?.category?.name || 'Category'} Formulations`,
      description:
        matchedProduct?.category?.description ||
        'Formulated with botanical rigor to nurture, balance, and replenish.',
    }
  }, [selectedCategory])

  // Filtered and Sorted Products
  const filteredProducts = useMemo(() => {
    let list =
      selectedCategory === 'all'
        ? [...products]
        : products.filter((product) => product.category?.slug === selectedCategory)

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tags?.some((t) => t.toLowerCase().includes(q)),
      )
    }

    if (sortBy === 'price-low') {
      list.sort((a, b) => productPriceValue(a) - productPriceValue(b))
    } else if (sortBy === 'price-high') {
      list.sort((a, b) => productPriceValue(b) - productPriceValue(a))
    } else if (sortBy === 'name') {
      list.sort((a, b) => a.name.localeCompare(b.name))
    }

    return list
  }, [selectedCategory, searchQuery, sortBy, products.length])

  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
    e.preventDefault()
    e.stopPropagation()
    if (!isAuthenticated) {
      window.location.href = '/login'
      return
    }

    addToCart({
      productId: product._id,
      name: product.name,
      slug: product.slug,
      price: productPriceValue(product),
      image: product.images[0] || product.category.image,
    })

    setAddedId(product._id)
    setTimeout(() => {
      setAddedId(null)
    }, 1500)
  }

  return (
    <div className="min-h-svh bg-[var(--bg)] text-[var(--text)] font-sans">
      
      {/* Category Hero Header */}
      <section className="border-b border-[var(--border)] bg-[var(--surface-muted)] px-[clamp(20px,5vw,72px)] py-[clamp(44px,6vw,84px)]">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-7">
              <p className="text-[0.68rem] uppercase tracking-[0.24em] font-semibold text-[var(--aesop-ochre)] mb-3">
                {activeCategoryInfo.name}
              </p>
              <h1 className="font-heading text-[clamp(2.4rem,4.8vw,4.4rem)] font-normal leading-[1.08] text-[var(--text-h)] tracking-tight">
                {activeCategoryInfo.title}.
              </h1>
            </div>
            <div className="lg:col-span-5">
              <p className="text-sm sm:text-base leading-relaxed text-[var(--taupe)] font-light max-w-lg">
                {activeCategoryInfo.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky Category Bar (Full-Width, Uncramped, Dedicated Row) */}
      <section className="sticky top-[65px] z-30 border-b border-[var(--border)] bg-[var(--surface)]/95 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-[clamp(16px,4vw,48px)]">
          {/* Row 1: Full-Width Category Navigation Tabs */}
          <div className="border-b border-[rgba(0,0,0,0.06)] py-1">
            <nav
              className="flex items-center gap-2 sm:gap-6 overflow-x-auto whitespace-nowrap scrollbar-none py-1.5 -mb-px"
              aria-label="Category filter tabs"
            >
              {categoryOptions.map((cat) => {
                const isActive = selectedCategory === cat.slug

                return (
                  <button
                    key={cat.slug}
                    onClick={() => {
                      setSelectedCategory(cat.slug)
                      const url = new URL(window.location.href)
                      if (cat.slug === 'all') {
                        url.searchParams.delete('category')
                      } else {
                        url.searchParams.set('category', cat.slug)
                      }
                      window.history.replaceState({}, '', url.toString())
                    }}
                    className={`relative py-2 px-1 text-[0.72rem] uppercase tracking-[0.18em] font-semibold transition-all cursor-pointer bg-transparent border-none flex items-center gap-2 ${
                      isActive
                        ? 'text-[#22201d] font-bold'
                        : 'text-[#7a746c] hover:text-[#22201d]'
                    }`}
                    type="button"
                  >
                    <span>{cat.label}</span>
                    <span
                      className={`text-[0.62rem] font-mono px-1.5 py-0.2 rounded-full transition-colors ${
                        isActive
                          ? 'bg-[#22201d] text-white'
                          : 'bg-[#f3ede2] text-[#7a746c]'
                      }`}
                    >
                      {cat.count}
                    </span>
                    {/* Active Bottom Indicator */}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#22201d] rounded-full [animation:amberisReveal_200ms_ease-out]"></span>
                    )}
                  </button>
                )
              })}
            </nav>
          </div>

          {/* Row 2: Sub-toolbar with Live Formulation Counter, Search & Sort */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 py-3 text-xs">
            <div className="flex items-center gap-3 text-[#7a746c] font-medium uppercase tracking-widest text-[0.68rem]">
              <span>Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'Formulation' : 'Formulations'}</span>
              {selectedCategory !== 'all' && (
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-[#f3ede2] text-[#22201d] border border-[#ded7cc]">
                  <span>{activeCategoryInfo.shortName}</span>
                  <button
                    onClick={() => {
                      setSelectedCategory('all')
                      const url = new URL(window.location.href)
                      url.searchParams.delete('category')
                      window.history.replaceState({}, '', url.toString())
                    }}
                    className="hover:text-[#8a241b] cursor-pointer bg-transparent border-none p-0 text-sm leading-none"
                    aria-label="Clear category filter"
                  >
                    &times;
                  </button>
                </span>
              )}
              {searchQuery && <span>Matching: &ldquo;{searchQuery}&rdquo;</span>}
            </div>

            <div className="flex items-center gap-3">
              {/* Search Box */}
              <div className="relative flex-1 sm:w-64">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#8c867d]">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search formulations..."
                  className="w-full bg-[#ffffff] border border-[#ded7cc] pl-8 pr-7 py-1.5 text-xs text-[#22201d] placeholder-[#8c867d] focus:outline-none focus:border-[#22201d] transition-colors"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-[#8c867d] hover:text-[#22201d] bg-transparent border-none cursor-pointer"
                    aria-label="Clear search"
                  >
                    &times;
                  </button>
                )}
              </div>

              {/* Sort Selector */}
              <select
                value={sortBy}
                onChange={(e: any) => setSortBy(e.target.value)}
                className="bg-[#ffffff] border border-[#ded7cc] px-3 py-1.5 text-xs text-[#22201d] uppercase tracking-wider focus:outline-none focus:border-[#22201d] cursor-pointer"
                aria-label="Sort formulations"
              >
                <option value="default">Default</option>
                <option value="name">Name (A-Z)</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Product Catalog Grid */}
      <section className="py-16 px-[clamp(20px,5vw,72px)]">
        <div className="mx-auto max-w-7xl">

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredProducts.map((product) => {
                const isAdded = addedId === product._id

                return (
                  <div
                    key={product._id}
                    className="group bg-[var(--surface)] border border-[var(--border)] p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-[var(--shadow-card)]"
                  >
                    <a href={`/products/${product.slug}`} className="block">
                      <div className="w-full aspect-square bg-[var(--surface-muted)] mb-5 flex items-center justify-center p-6 overflow-hidden">
                        <img
                          src={product.images[0] || product.category?.image}
                          alt={product.name}
                          className="max-h-full w-auto object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>

                      <div className="space-y-1 mb-4">
                        <p className="text-[0.65rem] uppercase tracking-[0.18em] font-semibold text-[var(--aesop-ochre)]">
                          {product.category?.name || 'Skincare'}
                        </p>
                        <h2 className="font-heading text-lg font-normal text-[var(--text-h)] group-hover:text-[var(--aesop-ochre)] transition-colors leading-snug">
                          {product.name}
                        </h2>
                        <p className="text-xs text-[var(--taupe)] line-clamp-2 leading-relaxed font-light pt-1">
                          {product.description}
                        </p>
                      </div>
                    </a>

                    <div className="pt-4 border-t border-[var(--border)] flex items-center justify-between mt-auto">
                      <span className="text-sm font-semibold text-[var(--text-h)]">
                        {productPrice(product)}
                      </span>
                      <button
                        onClick={(e) => handleAddToCart(e, product)}
                        className={`btn-action-add !text-white px-4 py-2.5 text-[0.68rem] uppercase tracking-[0.14em] font-semibold transition-all cursor-pointer ${
                          isAdded ? 'btn-action-added !bg-[#285430]' : 'bg-[#22201d]'
                        }`}
                        type="button"
                      >
                        <span className="!text-white">{isAdded ? 'Added ✓' : 'Add to bag'}</span>
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="py-24 text-center border border-dashed border-[var(--border)] p-12 bg-[var(--surface)]">
              <p className="font-heading text-2xl text-[var(--text-h)] mb-3">No formulations found</p>
              <p className="text-sm text-[var(--taupe)] font-light max-w-md mx-auto mb-6">
                We could not find any formulations matching your search criteria. Try modifying your search or resetting filters.
              </p>
              <button
                onClick={() => { setSearchQuery(''); setSelectedCategory('all') }}
                className="btn-primary !text-white bg-[#22201d] px-8 py-3.5 text-xs uppercase tracking-widest font-semibold cursor-pointer"
              >
                <span className="!text-white">Reset Filters</span>
              </button>
            </div>
          )}

        </div>
      </section>

    </div>
  )
}

export default Products
