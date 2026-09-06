import { useState } from 'react'
import { products, productPrice, productPriceValue } from '../data/products'
import { journalArticles } from '../data/journalArticles'
import { useApp } from '../contexts/AppContext'
import heroProductImg from '../assets/Hero Product.jpeg'

const standards = [
  { title: 'Pure Botanical Formulations', desc: 'Synthesised with therapeutic plants and scientifically validated actives.' },
  { title: 'Refillable Amber Glass', desc: 'Designed to protect formulations from UV degradation and minimise waste.' },
  { title: 'Cruelty-Free & Vegan', desc: 'Leaping Bunny certified, never tested on animals.' },
  { title: 'Private Consultations', desc: 'Bespoke routine guidance tailored to seasonal and climate shifts.' },
]

const rituals = [
  {
    step: '01',
    title: 'Purify & Clarify',
    subtitle: 'Gentle morning & evening cleanse',
    desc: 'Remove surface impurities without stripping the skin’s natural lipid barrier.',
    action: 'Discover Cleansers',
  },
  {
    step: '02',
    title: 'Balance & Tone',
    subtitle: 'Cellular hydration preparation',
    desc: 'Prepare the epidermis to absorb antioxidant-rich treatments and hydration.',
    action: 'Explore Toners',
  },
  {
    step: '03',
    title: 'Nourish & Fortify',
    subtitle: 'Deep lipid & antioxidant infusion',
    desc: 'Restore moisture balance and provide a protective shield against environmental fatigue.',
    action: 'View Moisturisers',
  },
]

function Home() {
  const { addToCart, isAuthenticated } = useApp()
  const [addedId, setAddedId] = useState<string | null>(null)

  // Spotlight 3 formulations from products or fallback
  const spotlightProducts = products.slice(0, 3)

  const handleQuickAdd = (product: any) => {
    if (!isAuthenticated) {
      window.location.href = '/login'
      return
    }

    addToCart({
      productId: product._id,
      name: product.name,
      slug: product.slug,
      price: productPriceValue(product),
      image: product.images?.[0] || product.category?.image,
    })

    setAddedId(product._id)
    setTimeout(() => setAddedId(null), 1600)
  }

  return (
    <div className="min-h-svh bg-[var(--bg)] text-[var(--text)] font-sans">
      
      {/* Hero Section */}
      <section className="border-b border-[var(--border)] bg-[var(--surface-muted)] overflow-hidden">
        <div className="mx-auto max-w-7xl px-[clamp(20px,5vw,72px)] py-[clamp(48px,8vw,96px)] grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center min-h-[calc(100svh-120px)]">
          
          <div className="lg:col-span-7 [animation:amberisReveal_700ms_ease-out]">
            <p className="text-[0.68rem] uppercase tracking-[0.26em] font-semibold text-[var(--aesop-ochre)] mb-4">
              Seasonal Botanical Formulations
            </p>
            <h1 className="font-heading text-[clamp(2.8rem,5.5vw,5.6rem)] font-normal leading-[1.04] text-[var(--text-h)] tracking-tight">
              Meticulous care for skin, hair, and senses.
            </h1>
            <p className="text-base sm:text-lg leading-[1.8] text-[var(--taupe)] font-light max-w-xl my-8">
              Formulations crafted with exceptional botanical ingredients and scientifically proven actives, designed to elevate your daily self-care ritual.
            </p>
            
            <div className="flex flex-wrap gap-4 items-center pt-2">
              <a
                href="/products"
                className="btn-primary !text-white bg-[#22201d] px-8 py-4 text-xs font-semibold uppercase tracking-[0.18em] shadow-sm"
              >
                <span className="!text-white">Explore Formulations</span>
              </a>
              <a
                href="/blog"
                className="btn-secondary !text-[#22201d] bg-white border border-[#22201d] px-8 py-4 text-xs font-semibold uppercase tracking-[0.18em]"
              >
                <span>Read The Journal</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 flex justify-center items-center relative">
            <div className="relative w-full max-w-md aspect-[4/5] bg-[var(--surface-strong)] flex items-center justify-center p-8 border border-[var(--border)] shadow-[var(--shadow-elevated)] group">
              <img
                src={heroProductImg}
                alt="Amberis Botanical Formulation"
                className="max-h-[85%] w-auto object-contain mix-blend-multiply transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm p-4 border border-[var(--border)] text-center shadow-sm">
                <p className="text-[0.65rem] uppercase tracking-[0.2em] text-[var(--aesop-ochre)] font-semibold">Spotlight</p>
                <p className="font-heading text-sm font-medium text-[var(--text-h)] mt-0.5">Parsley Seed Antioxidant Serum</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Standards Virtues Grid */}
      <section className="border-b border-[var(--border)] bg-[var(--surface)]">
        <div className="mx-auto max-w-7xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {standards.map((item, index) => (
            <div
              key={item.title}
              className={`p-8 lg:p-10 border-b sm:border-b-0 border-[var(--border)] ${
                index > 0 ? 'lg:border-l' : ''
              } ${index % 2 === 1 ? 'sm:border-l' : ''}`}
            >
              <span className="text-[var(--aesop-ochre)] text-lg block mb-3 font-mono font-light">0{index + 1}</span>
              <h2 className="text-xs uppercase tracking-[0.16em] font-semibold text-[var(--text-h)] mb-3">
                {item.title}
              </h2>
              <p className="text-xs leading-[1.75] text-[var(--taupe)] font-light mt-2">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Curated Formulations Spotlight */}
      <section className="py-20 lg:py-28 border-b border-[var(--border)] bg-[var(--aesop-cream)]">
        <div className="mx-auto max-w-7xl px-[clamp(20px,5vw,72px)]">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <p className="text-[0.68rem] uppercase tracking-[0.24em] font-semibold text-[var(--aesop-ochre)] mb-2">
                Curated Selection
              </p>
              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-normal text-[var(--text-h)]">
                Essential Formulations.
              </h2>
            </div>
            <a
              href="/products"
              className="text-xs uppercase tracking-[0.18em] font-semibold text-[var(--text-h)] hover:text-[var(--aesop-ochre)] underline underline-offset-8 transition-colors"
            >
              View all products &rarr;
            </a>
          </div>

          {spotlightProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {spotlightProducts.map((product) => (
                <div
                  key={product._id}
                  className="bg-[var(--surface)] border border-[var(--border)] p-6 flex flex-col justify-between group transition-all duration-300 hover:shadow-[var(--shadow-card)]"
                >
                  <a href={`/products/${product.slug}`} className="block">
                    <div className="w-full aspect-[4/5] bg-[var(--surface-muted)] mb-6 flex items-center justify-center p-6 overflow-hidden">
                      <img
                        src={product.images?.[0] || product.category?.image}
                        alt={product.name}
                        className="max-h-full w-auto object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <p className="text-[0.65rem] uppercase tracking-[0.16em] text-[var(--aesop-ochre)] font-semibold mb-1.5">
                      {product.category?.name || 'Skincare'}
                    </p>
                    <h3 className="font-heading text-xl font-normal text-[var(--text-h)] group-hover:text-[var(--aesop-ochre)] transition-colors leading-snug">
                      {product.name}
                    </h3>
                    <p className="text-xs text-[var(--taupe)] line-clamp-2 leading-[1.7] my-3.5 font-light">
                      {product.description}
                    </p>
                  </a>

                  <div className="pt-4 border-t border-[var(--border)] flex items-center justify-between mt-auto">
                    <span className="text-sm font-semibold text-[var(--text-h)]">
                      {productPrice(product)}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleQuickAdd(product)}
                      className={`btn-action-add !text-white px-5 py-2.5 text-[0.68rem] uppercase tracking-wider font-semibold transition-all cursor-pointer ${
                        addedId === product._id ? 'btn-action-added !bg-[#285430]' : 'bg-[#22201d]'
                      }`}
                    >
                      <span className="!text-white">{addedId === product._id ? 'Added ✓' : 'Add to bag'}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <a href="/products" className="btn-primary !text-white bg-[#22201d] px-8 py-3.5 text-xs uppercase tracking-widest font-semibold">
                <span className="!text-white">Browse Full Catalog</span>
              </a>
            </div>
          )}
        </div>
      </section>

      {/* Skincare Rituals Guide (3-Step Routine) */}
      <section className="py-20 lg:py-28 border-b border-[var(--border)] bg-[var(--surface-strong)]">
        <div className="mx-auto max-w-7xl px-[clamp(20px,5vw,72px)]">
          <div className="max-w-2xl mb-16">
            <p className="text-[0.68rem] uppercase tracking-[0.24em] font-semibold text-[var(--aesop-ochre)] mb-2">
              The Daily Protocol
            </p>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-normal text-[var(--text-h)]">
              Building a purposeful skincare routine.
            </h2>
            <p className="text-sm sm:text-base leading-[1.8] text-[var(--taupe)] font-light my-5">
              Layering formulations sequentially allows botanicals and active complexes to permeate effectively, providing progressive nourishment throughout the day.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {rituals.map((ritual) => (
              <div key={ritual.step} className="bg-[var(--surface)] p-8 border border-[var(--border)] flex flex-col justify-between shadow-sm">
                <div>
                  <span className="text-3xl font-heading font-light text-[var(--aesop-ochre)] block mb-6">
                    {ritual.step}
                  </span>
                  <p className="text-[0.65rem] uppercase tracking-[0.18em] font-semibold text-[var(--taupe)] mb-1">
                    {ritual.subtitle}
                  </p>
                  <h3 className="font-heading text-2xl font-normal text-[var(--text-h)] mb-3">
                    {ritual.title}
                  </h3>
                  <p className="text-xs sm:text-sm leading-[1.75] text-[var(--taupe)] font-light my-6">
                    {ritual.desc}
                  </p>
                </div>
                <a
                  href="/products"
                  className="btn-secondary !text-[#22201d] bg-white border border-[#22201d] px-5 py-3 text-xs uppercase tracking-[0.16em] font-semibold w-full justify-between"
                >
                  <span>{ritual.action}</span>
                  <span>&rarr;</span>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Botanical Laboratory & Craftsmanship Split */}
      <section className="border-b border-[var(--border)] bg-[#22201d] text-[#f4eee6]">
        <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-12 min-h-[500px]">
          <div className="lg:col-span-6 p-8 sm:p-14 lg:p-20 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-[rgba(255,255,255,0.08)]">
            <p className="text-[0.68rem] uppercase tracking-[0.24em] font-semibold text-[var(--soft-gold)] mb-3">
              The Formulation Ethos
            </p>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-normal leading-tight text-[#faf7f2]">
              Respect for botanical chemistry and architectural elegance.
            </h2>
            <p className="text-sm sm:text-base leading-[1.8] text-[#c2bab0] font-light my-8">
              Every Amberis formulation is born from an uncompromising pursuit of plant-based efficacy. We extract antioxidants, essential lipids, and cold-pressed botanical essences to nourish the skin barrier at its most fundamental level.
            </p>
            <div>
              <a
                href="/blog?article=cold-pressed-plant-lipid-extractions"
                className="inline-flex items-center justify-center px-8 py-4 bg-[#ffffff] !text-[#22201d] text-xs uppercase tracking-[0.18em] font-semibold hover:bg-[var(--aesop-ochre)] hover:!text-[#ffffff] transition-all cursor-pointer shadow-md"
              >
                <span>Read Extraction Essay &rarr;</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-6 bg-[#1a1816] p-12 flex items-center justify-center relative overflow-hidden">
            <div className="max-w-md text-center">
              <blockquote className="font-heading italic text-xl sm:text-2xl text-[#faf7f2] leading-[1.7] mb-6">
                “True beauty is an organic alignment between calm inner chemistry and mindful daily rituals.”
              </blockquote>
              <cite className="text-xs uppercase tracking-[0.2em] text-[var(--soft-gold)] not-italic font-semibold">
                — Amberis Botanical Laboratory, 2026
              </cite>
            </div>
          </div>
        </div>
      </section>

      {/* The Journal Spotlight Section */}
      <section className="py-20 lg:py-28 border-b border-[var(--border)] bg-[var(--surface-muted)]">
        <div className="mx-auto max-w-7xl px-[clamp(20px,5vw,72px)]">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <p className="text-[0.68rem] uppercase tracking-[0.24em] font-semibold text-[var(--aesop-ochre)] mb-2">
                The Amberis Journal
              </p>
              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-normal text-[var(--text-h)]">
                Stories on botany, spaces, and rituals.
              </h2>
            </div>
            <a
              href="/blog"
              className="text-xs uppercase tracking-[0.18em] font-semibold text-[var(--text-h)] hover:text-[var(--aesop-ochre)] underline underline-offset-8 transition-colors"
            >
              Explore Compendium VIII &rarr;
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {journalArticles.slice(0, 3).map((article) => (
              <a
                key={article.id}
                href={`/blog?article=${article.slug}`}
                className="bg-[var(--surface)] border border-[var(--border)] p-8 flex flex-col justify-between group transition-all duration-300 hover:shadow-[var(--shadow-card)] no-underline"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-[var(--taupe)] mb-4">
                    <span className="text-[0.65rem] uppercase tracking-[0.18em] font-semibold text-[var(--aesop-ochre)]">
                      {article.category}
                    </span>
                    <span>{article.readTime}</span>
                  </div>

                  <h3 className="font-heading text-xl font-normal text-[var(--text-h)] group-hover:text-[var(--aesop-ochre)] transition-colors leading-snug mb-3">
                    {article.title}
                  </h3>

                  <p className="text-xs text-[var(--taupe)] line-clamp-3 leading-[1.75] font-light my-3">
                    {article.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-[var(--border)] flex items-center justify-between text-xs text-[var(--taupe)] mt-4">
                  <span className="text-[0.68rem]">{article.author.name}</span>
                  <span className="font-semibold text-[var(--text-h)] group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                    Read Essay &rarr;
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}

export default Home
