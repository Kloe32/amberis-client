import { useState } from 'react'
import { products, productPrice } from '../data/products'

type CategoryPreviewInfo = {
  category: string
  title: string
  subtitle: string
  description: string
  laboratoryStatus: string
  expectedSeason: string
  botanicalNotes: string[]
}

const CATEGORY_COMING_SOON_DATA: Record<string, CategoryPreviewInfo> = {
  '/body-hand': {
    category: 'Body & Hand Care',
    title: 'Body & Hand Formulations.',
    subtitle: 'Nourishing cleansers, aromatic balms, and skin exfoliants',
    description:
      'Our laboratory is currently perfecting a range of plant-based body washes, invigorating botanical scrubs, and rich hand balms. Each formula is undergoing rigorous stability and dermatological trials to ensure deep moisture without residue.',
    laboratoryStatus: 'Phase III Stability & Scent Profiling',
    expectedSeason: 'Late Autumn 2026',
    botanicalNotes: ['Cedar Atlas', 'Bergamot Rind', 'Geranium Leaf', 'Crushed Macadamia'],
  },
  '/hair': {
    category: 'Hair & Scalp Care',
    title: 'Hair & Scalp Formulations.',
    subtitle: 'Gentle cleansing washes, conditioning balms, and scalp serums',
    description:
      'Conceived to nurture both hair follicle vitality and scalp microbiome balance. Our impending hair formulations combine cold-pressed botanicals with bio-fermented actives to cleanse softly while imparting weightless gloss and resilience.',
    laboratoryStatus: 'Phytochemical Balancing & Lather Trials',
    expectedSeason: 'Winter 2026',
    botanicalNotes: ['Sage Leaf', 'Cedarwood Bark', 'Hydrolysed Oats', 'Rosemary Oil'],
  },
  '/fragrance': {
    category: 'Olfactory Studies & Fragrance',
    title: 'Botanical Fragrances.',
    subtitle: 'Nuanced personal aromas distilled from rare botanical resins and woods',
    description:
      'A collection of evocative eaux de parfum inspired by ancient extraction methods, coastal flora, and shadowed forest floors. Formulated in limited small-batch macerations using sustainably sourced essential absolutes.',
    laboratoryStatus: 'Olfactory Maturation & Maceration',
    expectedSeason: 'Early Spring 2027',
    botanicalNotes: ['Frankincense', 'Smoked Vetiver', 'Bitter Orange', 'Labdanum Resin'],
  },
  '/home': {
    category: 'Home & Atmosphere',
    title: 'Home & Ambient Formulations.',
    subtitle: 'Aromatic room sprays, botanical incense, and ambient drops',
    description:
      'Formulations designed to transform the olfactory architecture of living and work spaces. Botanical distillations that quietly neutralize fatigue and instill calm focus.',
    laboratoryStatus: 'Diffusion Calibration & Aromatic Blending',
    expectedSeason: 'Autumn 2026',
    botanicalNotes: ['Clove Bud', 'Patchouli', 'Grapefruit Rind', 'Palo Santo'],
  },
}

const DEFAULT_COMING_SOON: CategoryPreviewInfo = {
  category: 'Laboratory Research',
  title: 'Formulations in Development.',
  subtitle: 'Meticulous research and formulation require deliberate care',
  description:
    'Our botanical chemists and dermatological researchers are actively formulating and testing new products for this range. We invite you to register your interest to receive early batch access and dispatch notes.',
  laboratoryStatus: 'Active Formulation & Scientific Verification',
  expectedSeason: 'Coming Soon',
  botanicalNotes: ['Cold-Pressed Botanicals', 'Bio-Actives', 'Therapeutic Resins'],
}

function ComingSoon() {
  const pathname = window.location.pathname
  const info = CATEGORY_COMING_SOON_DATA[pathname] || DEFAULT_COMING_SOON
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  // Recommend existing loaded skincare products
  const previewProducts = products.slice(0, 3)

  function handleSubscribe(e: React.FormEvent) {
    e.preventDefault()
    if (email.trim()) {
      setSubscribed(true)
    }
  }

  return (
    <div className="min-h-svh bg-[var(--bg)] text-[var(--text)] font-sans">
      
      {/* Hero Section with Editorial Notice */}
      <section className="border-b border-[var(--border)] bg-[var(--surface-muted)] px-[clamp(20px,5vw,72px)] py-[clamp(56px,8vw,108px)]">
        <div className="mx-auto max-w-5xl">
          
          <div className="space-y-4 mb-8">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="text-[0.68rem] uppercase tracking-[0.24em] font-semibold text-[var(--aesop-ochre)]">
                {info.category}
              </span>
              <span className="text-[var(--taupe)] text-xs">•</span>
              <span className="px-2.5 py-0.5 bg-[#f3ede2] text-[#22201d] text-[0.62rem] font-mono uppercase tracking-wider border border-[#ded7cc]">
                {info.laboratoryStatus}
              </span>
            </div>

            <h1 className="font-heading text-[clamp(2.5rem,5.2vw,4.8rem)] font-normal leading-[1.06] text-[var(--text-h)] tracking-tight">
              {info.title}
            </h1>
            
            <p className="text-base sm:text-lg text-[var(--aesop-dark)] font-normal leading-relaxed max-w-2xl pt-3">
              {info.subtitle}.
            </p>
          </div>

          <p className="text-sm sm:text-base leading-[1.85] text-[var(--taupe)] font-light max-w-3xl my-8">
            {info.description}
          </p>

          {/* Laboratory Status Dossier */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6 sm:p-8 bg-[var(--surface)] border border-[var(--border)] shadow-xs my-10">
            <div>
              <p className="text-[0.65rem] uppercase tracking-[0.18em] font-semibold text-[var(--taupe)] mb-1.5">
                Anticipated Release
              </p>
              <p className="font-heading text-lg font-normal text-[var(--text-h)]">
                {info.expectedSeason}
              </p>
            </div>

            <div>
              <p className="text-[0.65rem] uppercase tracking-[0.18em] font-semibold text-[var(--taupe)] mb-1.5">
                Certification
              </p>
              <p className="font-heading text-lg font-normal text-[var(--text-h)]">
                Vegan & Cruelty-Free
              </p>
            </div>

            <div className="sm:col-span-2 md:col-span-1">
              <p className="text-[0.65rem] uppercase tracking-[0.18em] font-semibold text-[var(--taupe)] mb-1.5">
                Key Botanical Extracts
              </p>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {info.botanicalNotes.map((note) => (
                  <span
                    key={note}
                    className="px-2 py-0.5 bg-[#f3ede2] text-[0.62rem] text-[#22201d] font-medium border border-[#ded7cc]"
                  >
                    {note}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Register Interest / Early Access Form */}
          <div className="p-8 sm:p-10 bg-[#22201d] text-[#f4eee6] border border-[rgba(255,255,255,0.08)] space-y-4">
            <p className="text-[0.68rem] uppercase tracking-[0.24em] font-semibold text-[var(--soft-gold)] mb-1">
              Register for First Batch Release
            </p>
            <h2 className="font-heading text-2xl font-normal text-[#faf7f2]">
              Receive notification upon formulation completion.
            </h2>
            <p className="text-xs sm:text-sm text-[#c2bab0] font-light max-w-xl leading-[1.75] my-4">
              Leave your email to receive private formulation logs, sensory profile notes, and early ordering access for {info.category}.
            </p>

            {subscribed ? (
              <div className="p-4 bg-[#285430] text-white text-xs font-medium border border-[#3e7849] [animation:amberisReveal_300ms_ease-out]">
                ✓ Thank you. Your interest in {info.category} has been registered. You will receive private dispatch notes prior to public release.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-lg pt-3">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="flex-1 bg-[rgba(255,255,255,0.08)] border border-[rgba(222,215,204,0.3)] px-4 py-3 text-xs sm:text-sm text-[#f5f1eb] placeholder-[#8a857c] focus:outline-none focus:border-[var(--soft-gold)] transition-colors"
                />
                <button
                  type="submit"
                  className="btn-primary !text-white !bg-[var(--aesop-ochre)] px-6 py-3 text-xs uppercase tracking-widest font-semibold hover:!bg-white hover:!text-[#22201d] transition-all cursor-pointer shadow-sm"
                >
                  <span className="!text-white">Notify Me</span>
                </button>
              </form>
            )}
          </div>

        </div>
      </section>

      {/* Cross-Promotion: In the Interim, Explore Skincare */}
      <section className="py-16 px-[clamp(20px,5vw,72px)] bg-[var(--surface)] border-b border-[var(--border)]">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div>
              <p className="text-[0.68rem] uppercase tracking-[0.24em] font-semibold text-[var(--aesop-ochre)] mb-2">
                Available Formulations
              </p>
              <h2 className="font-heading text-2xl sm:text-3xl font-normal text-[var(--text-h)]">
                Explore Our Active Skincare Range.
              </h2>
            </div>
            <a
              href="/products"
              className="btn-secondary !text-[#22201d] bg-white border border-[#22201d] px-6 py-3 text-xs uppercase tracking-wider font-semibold"
            >
              <span>View All Skin Formulations &rarr;</span>
            </a>
          </div>

          {previewProducts.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {previewProducts.map((product) => (
                <a
                  key={product._id}
                  href={`/products/${product.slug}`}
                  className="group bg-[var(--surface)] border border-[var(--border)] p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-[var(--shadow-card)]"
                >
                  <div className="w-full aspect-square bg-[var(--surface-muted)] mb-5 flex items-center justify-center p-6 overflow-hidden">
                    <img
                      src={product.images[0] || product.category?.image}
                      alt={product.name}
                      className="max-h-full w-auto object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <p className="text-[0.65rem] uppercase tracking-[0.16em] text-[var(--aesop-ochre)] font-semibold mb-1">
                    {product.category?.name || 'Skincare'}
                  </p>
                  <h3 className="font-heading text-lg font-normal text-[var(--text-h)] group-hover:text-[var(--aesop-ochre)] transition-colors mb-2 leading-snug">
                    {product.name}
                  </h3>
                  <p className="text-xs text-[var(--taupe)] line-clamp-2 leading-[1.7] my-3.5 font-light">
                    {product.description}
                  </p>
                  <p className="text-sm font-semibold text-[var(--text-h)] pt-3 border-t border-[var(--border)] mt-auto">
                    {productPrice(product)}
                  </p>
                </a>
              ))}
            </div>
          )}
        </div>
      </section>

    </div>
  )
}

export default ComingSoon
