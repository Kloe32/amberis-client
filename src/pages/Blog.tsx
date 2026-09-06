import { useState, useEffect, useMemo, useRef } from 'react'
import {
  journalArticles,
  journalCategories,
} from '../data/journalArticles'
import { products, productPrice, productPriceValue } from '../data/products'
import { useApp } from '../contexts/AppContext'

// Reading Themes
type ReadingTheme = 'parchment' | 'sepia' | 'noir'
type FontSize = 'compact' | 'normal' | 'large'

export default function Blog() {
  const { addToCart, isAuthenticated } = useApp()

  // State
  const [selectedSlug, setSelectedSlug] = useState<string | null>(() => {
    // Check URL parameters or path
    const params = new URLSearchParams(window.location.search)
    const paramArticle = params.get('article')
    if (paramArticle) return paramArticle

    const pathParts = window.location.pathname.split('/').filter(Boolean)
    if (pathParts[0] === 'blog' && pathParts[1]) {
      return pathParts[1]
    }
    return null
  })

  const [selectedCategory, setSelectedCategory] = useState<string>('All Articles')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [readingTheme, setReadingTheme] = useState<ReadingTheme>('parchment')
  const [fontSize, setFontSize] = useState<FontSize>('normal')
  const [scrollProgress, setScrollProgress] = useState<number>(0)
  const [copiedLink, setCopiedLink] = useState(false)
  const [addedProductId, setAddedProductId] = useState<string | null>(null)
  const [isAmbientPlaying, setIsAmbientPlaying] = useState(false)

  const audioContextRef = useRef<AudioContext | null>(null)
  const gainNodeRef = useRef<GainNode | null>(null)
  const articleTopRef = useRef<HTMLDivElement>(null)

  // Sync state with browser URL & popstate
  useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search)
      const paramArticle = params.get('article')
      if (paramArticle) {
        setSelectedSlug(paramArticle)
      } else {
        const pathParts = window.location.pathname.split('/').filter(Boolean)
        if (pathParts[0] === 'blog' && pathParts[1]) {
          setSelectedSlug(pathParts[1])
        } else {
          setSelectedSlug(null)
        }
      }
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  // Scroll progress tracker for article reading
  useEffect(() => {
    if (!selectedSlug) {
      setScrollProgress(0)
      return
    }

    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      if (totalHeight <= 0) return
      const currentProgress = (window.scrollY / totalHeight) * 100
      setScrollProgress(Math.min(100, Math.max(0, currentProgress)))
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [selectedSlug])

  // Open an article
  const openArticle = (slug: string) => {
    setSelectedSlug(slug)
    const newUrl = `/blog?article=${slug}`
    window.history.pushState({ slug }, '', newUrl)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Back to compendium
  const closeArticle = () => {
    setSelectedSlug(null)
    window.history.pushState({}, '', '/blog')
    window.scrollTo({ top: 0, behavior: 'smooth' })
    if (isAmbientPlaying) {
      stopAmbientSound()
    }
  }

  // Selected article object
  const currentArticle = useMemo(() => {
    if (!selectedSlug) return null
    return journalArticles.find((a) => a.slug === selectedSlug) || null
  }, [selectedSlug])

  // Filtered articles list
  const filteredArticles = useMemo(() => {
    return journalArticles.filter((article) => {
      const matchesCategory =
        selectedCategory === 'All Articles' || article.category === selectedCategory

      const matchesSearch =
        !searchQuery.trim() ||
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.author.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.sensoryNotes.some((note) => note.toLowerCase().includes(searchQuery.toLowerCase()))

      return matchesCategory && matchesSearch
    })
  }, [selectedCategory, searchQuery])

  // Featured article
  const featuredArticle = useMemo(() => {
    return journalArticles.find((a) => a.featured) || journalArticles[0]
  }, [])

  // Related products for current article
  const articleProducts = useMemo(() => {
    if (!currentArticle?.relatedProductSlugs) return []
    return products.filter((p) =>
      currentArticle.relatedProductSlugs?.some(
        (slug) => p.slug.includes(slug) || slug.includes(p.slug) || p.name.toLowerCase().includes(slug.replace(/-/g, ' '))
      )
    ).slice(0, 3)
  }, [currentArticle])

  // Next and Previous articles
  const { prevArticle, nextArticle } = useMemo(() => {
    if (!currentArticle) return { prevArticle: null, nextArticle: null }
    const currentIndex = journalArticles.findIndex((a) => a.id === currentArticle.id)
    const prev = currentIndex > 0 ? journalArticles[currentIndex - 1] : journalArticles[journalArticles.length - 1]
    const next = currentIndex < journalArticles.length - 1 ? journalArticles[currentIndex + 1] : journalArticles[0]
    return { prevArticle: prev, nextArticle: next }
  }, [currentArticle])

  // Share link
  const handleShare = async () => {
    const url = window.location.href
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(url)
      setCopiedLink(true)
      setTimeout(() => setCopiedLink(false), 2400)
    }
  }

  // Quick Add to cart
  const handleAddProduct = (product: any) => {
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
    setAddedProductId(product._id)
    setTimeout(() => setAddedProductId(null), 1600)
  }

  // Ambient sound generator for serene reading immersion
  const toggleAmbientSound = () => {
    if (isAmbientPlaying) {
      stopAmbientSound()
    } else {
      startAmbientSound()
    }
  }

  const startAmbientSound = () => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext
      const ctx = new AudioCtx()
      audioContextRef.current = ctx

      // Create pink noise generator for soothing rainfall/room presence
      const bufferSize = ctx.sampleRate * 2
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
      const output = noiseBuffer.getChannelData(0)
      let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1
        b0 = 0.99886 * b0 + white * 0.0555179
        b1 = 0.99332 * b1 + white * 0.0750759
        b2 = 0.96900 * b2 + white * 0.1538520
        b3 = 0.86650 * b3 + white * 0.3104856
        b4 = 0.55000 * b4 + white * 0.5329522
        b5 = -0.7616 * b5 - white * 0.0168980
        output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.04
        b6 = white * 0.115926
      }

      const whiteNoise = ctx.createBufferSource()
      whiteNoise.buffer = noiseBuffer
      whiteNoise.loop = true

      // Filter for gentle low-pass warmth (gentle stream / breeze)
      const filter = ctx.createBiquadFilter()
      filter.type = 'lowpass'
      filter.frequency.value = 520

      const gainNode = ctx.createGain()
      gainNode.gain.setValueAtTime(0.01, ctx.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.12, ctx.currentTime + 2)
      gainNodeRef.current = gainNode

      whiteNoise.connect(filter)
      filter.connect(gainNode)
      gainNode.connect(ctx.destination)

      whiteNoise.start()
      setIsAmbientPlaying(true)
    } catch (e) {
      console.warn('AudioContext not supported or restricted', e)
    }
  }

  const stopAmbientSound = () => {
    if (audioContextRef.current && gainNodeRef.current) {
      gainNodeRef.current.gain.exponentialRampToValueAtTime(
        0.0001,
        audioContextRef.current.currentTime + 0.8
      )
      setTimeout(() => {
        audioContextRef.current?.close()
        audioContextRef.current = null
        setIsAmbientPlaying(false)
      }, 900)
    } else {
      setIsAmbientPlaying(false)
    }
  }

  // Cleanup audio on unmount
  useEffect(() => {
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close()
      }
    }
  }, [])

  // Determine theme classes
  const themeClasses = {
    parchment: {
      wrapper: 'bg-[#faf7f2] text-[#2c2925]',
      heroBg: 'bg-[#f3ede2]',
      border: 'border-[#ded7cc]',
      cardBg: 'bg-[#ffffff]',
      quoteBg: 'bg-[#f5efe4] border-[var(--aesop-ochre)]',
      labNoteBg: 'bg-[#f0e9dc] border-[#ded7cc]',
      headerText: 'text-[#1e1c19]',
      mutedText: 'text-[#6e6a64]',
      accentText: 'text-[var(--aesop-ochre)]',
      navBg: 'bg-[#faf7f2]/90 backdrop-blur-md',
      barTrack: 'bg-[#e5ded2]',
    },
    sepia: {
      wrapper: 'bg-[#f5ecdc] text-[#332a21]',
      heroBg: 'bg-[#ece0cc]',
      border: 'border-[#d8c8b0]',
      cardBg: 'bg-[#faf4ea]',
      quoteBg: 'bg-[#ebe0cb] border-[#b07c30]',
      labNoteBg: 'bg-[#e6d8c0] border-[#d8c8b0]',
      headerText: 'text-[#241c14]',
      mutedText: 'text-[#736352]',
      accentText: 'text-[#9c6a1e]',
      navBg: 'bg-[#f5ecdc]/90 backdrop-blur-md',
      barTrack: 'bg-[#ded0b8]',
    },
    noir: {
      wrapper: 'bg-[#181614] text-[#ded7cc]',
      heroBg: 'bg-[#22201d]',
      border: 'border-[#332f2a]',
      cardBg: 'bg-[#201d1a]',
      quoteBg: 'bg-[#25221d] border-[#d4a964]',
      labNoteBg: 'bg-[#221f1c] border-[#38332c]',
      headerText: 'text-[#f5f1eb]',
      mutedText: 'text-[#9c958a]',
      accentText: 'text-[#d4a964]',
      navBg: 'bg-[#181614]/90 backdrop-blur-md',
      barTrack: 'bg-[#2c2823]',
    },
  }[readingTheme]

  const fontClass = {
    compact: 'text-[0.95rem] leading-[1.8]',
    normal: 'text-[1.08rem] leading-[1.95]',
    large: 'text-[1.22rem] leading-[2.1]',
  }[fontSize]

  // =========================================================================
  // VIEW: FULL STORY READER
  // =========================================================================
  if (currentArticle) {
    return (
      <div ref={articleTopRef} className={`min-h-svh font-sans transition-colors duration-300 ${themeClasses.wrapper}`}>
        
        {/* Sticky Reading Progress Bar */}
        <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-transparent">
          <div
            className="h-full bg-[var(--aesop-ochre)] transition-all duration-150 ease-out"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>

        {/* Reader Control Header */}
        <header
          className={`sticky top-0 z-40 border-b ${themeClasses.border} ${themeClasses.navBg} transition-all duration-200`}
        >
          <div className="mx-auto max-w-5xl px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4">
            
            {/* Back Button */}
            <button
              onClick={closeArticle}
              className={`inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] font-semibold ${themeClasses.headerText} hover:${themeClasses.accentText} transition-colors cursor-pointer bg-transparent border-none focus-luxury`}
              type="button"
            >
              <span>&larr;</span>
              <span className="hidden sm:inline">The Journal Compendium</span>
              <span className="sm:hidden">Back</span>
            </button>

            {/* Middle Title preview on mobile */}
            <div className="hidden md:block truncate max-w-xs text-xs uppercase tracking-widest text-center opacity-70">
              {currentArticle.title}
            </div>

            {/* Reader Controls Toolbar */}
            <div className="flex items-center gap-2 sm:gap-4">
              
              {/* Sound Ambiance Generator */}
              <button
                type="button"
                onClick={toggleAmbientSound}
                className={`px-3 py-1.5 rounded text-[0.68rem] uppercase tracking-wider font-semibold border ${themeClasses.border} transition-all flex items-center gap-1.5 cursor-pointer ${
                  isAmbientPlaying
                    ? 'bg-[var(--aesop-ochre)] text-white border-[var(--aesop-ochre)]'
                    : 'hover:border-[var(--aesop-ochre)]'
                }`}
                title="Toggle soothing botanical soundscape"
              >
                <span>{isAmbientPlaying ? '🌿 Soundscape On' : '🌿 Quiet Mode'}</span>
              </button>

              {/* Text Size Switcher */}
              <div className={`flex items-center border ${themeClasses.border} rounded overflow-hidden text-xs`}>
                <button
                  type="button"
                  onClick={() => setFontSize('compact')}
                  className={`px-2 py-1 font-mono transition-colors ${
                    fontSize === 'compact' ? 'bg-[var(--aesop-ochre)] text-white' : 'hover:opacity-75'
                  }`}
                  title="Compact typography"
                >
                  A-
                </button>
                <button
                  type="button"
                  onClick={() => setFontSize('normal')}
                  className={`px-2 py-1 font-mono border-l border-r ${themeClasses.border} transition-colors ${
                    fontSize === 'normal' ? 'bg-[var(--aesop-ochre)] text-white' : 'hover:opacity-75'
                  }`}
                  title="Standard typography"
                >
                  A
                </button>
                <button
                  type="button"
                  onClick={() => setFontSize('large')}
                  className={`px-2 py-1 font-mono transition-colors ${
                    fontSize === 'large' ? 'bg-[var(--aesop-ochre)] text-white' : 'hover:opacity-75'
                  }`}
                  title="Large immersive typography"
                >
                  A+
                </button>
              </div>

              {/* Theme Switcher */}
              <div className={`flex items-center border ${themeClasses.border} rounded overflow-hidden text-[0.68rem] font-semibold uppercase`}>
                <button
                  type="button"
                  onClick={() => setReadingTheme('parchment')}
                  className={`px-2 py-1.5 transition-colors ${
                    readingTheme === 'parchment' ? 'bg-[#22201d] text-white' : 'hover:opacity-75'
                  }`}
                  title="Parchment Day Mode"
                >
                  Day
                </button>
                <button
                  type="button"
                  onClick={() => setReadingTheme('sepia')}
                  className={`px-2 py-1.5 border-l border-r ${themeClasses.border} transition-colors ${
                    readingTheme === 'sepia' ? 'bg-[#9c6a1e] text-white' : 'hover:opacity-75'
                  }`}
                  title="Sepia Warm Library Mode"
                >
                  Sepia
                </button>
                <button
                  type="button"
                  onClick={() => setReadingTheme('noir')}
                  className={`px-2 py-1.5 transition-colors ${
                    readingTheme === 'noir' ? 'bg-[#ded7cc] text-[#181614]' : 'hover:opacity-75'
                  }`}
                  title="Noir Midnight Mode"
                >
                  Noir
                </button>
              </div>

              {/* Share Button */}
              <button
                type="button"
                onClick={handleShare}
                className={`p-1.5 text-xs rounded border ${themeClasses.border} hover:${themeClasses.accentText} transition-all cursor-pointer`}
                title="Share Essay"
              >
                {copiedLink ? '✓ Copied' : 'Share'}
              </button>
            </div>
          </div>
        </header>

        {/* Article Story Main Container */}
        <main className="mx-auto max-w-3xl px-6 sm:px-10 py-12 sm:py-20">
          
          {/* Article Meta Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-dashed border-[var(--aesop-ochre)]/30 text-xs">
            <span className="text-[0.7rem] uppercase tracking-[0.24em] font-semibold text-[var(--aesop-ochre)]">
              {currentArticle.category}
            </span>
            <div className="flex items-center gap-4 text-xs opacity-70 font-light">
              <span>{currentArticle.date}</span>
              <span>•</span>
              <span>{currentArticle.readTime}</span>
            </div>
          </div>

          {/* Article Header & Title */}
          <header className="py-8 sm:py-12">
            <h1 className={`font-heading text-[clamp(2.2rem,4.8vw,3.8rem)] font-normal leading-[1.12] ${themeClasses.headerText} tracking-tight mb-6`}>
              {currentArticle.title}
            </h1>
            <p className={`text-lg sm:text-xl font-heading italic leading-relaxed opacity-85 max-w-2xl border-l-2 border-[var(--aesop-ochre)] pl-5 my-6`}>
              {currentArticle.subtitle}
            </p>
          </header>

          {/* Author Badge & Credentials */}
          <div className={`p-5 rounded-sm border ${themeClasses.border} ${themeClasses.cardBg} flex items-center gap-4 mb-12 shadow-sm`}>
            <div className="w-12 h-12 rounded-full bg-[var(--aesop-ochre)] text-white flex items-center justify-center font-heading text-lg font-semibold shrink-0">
              {currentArticle.author.name.split(' ').map((n) => n[0]).join('')}
            </div>
            <div>
              <p className={`text-sm font-semibold ${themeClasses.headerText}`}>
                {currentArticle.author.name}
              </p>
              <p className={`text-xs ${themeClasses.mutedText} font-light`}>
                {currentArticle.author.role} — <span className="italic">{currentArticle.author.location}</span>
              </p>
            </div>
          </div>

          {/* Sensory Profile Pillbox */}
          <div className="mb-12">
            <p className="text-[0.65rem] uppercase tracking-[0.2em] font-semibold text-[var(--aesop-ochre)] mb-2.5">
              Sensory Profile & Botanical Accords
            </p>
            <div className="flex flex-wrap gap-2">
              {currentArticle.sensoryNotes.map((note) => (
                <span
                  key={note}
                  className={`text-xs px-3 py-1 rounded-full border ${themeClasses.border} opacity-85`}
                >
                  {note}
                </span>
              ))}
            </div>
          </div>

          {/* Article Chapters & Narrative */}
          <article className="space-y-12 sm:space-y-16">
            {currentArticle.chapters.map((chapter, index) => (
              <section key={chapter.title} className="space-y-6">
                
                {/* Chapter Title */}
                <h2 className={`font-heading text-xl sm:text-2xl font-normal ${themeClasses.headerText} border-b ${themeClasses.border} pb-2.5`}>
                  {chapter.title}
                </h2>

                {/* Chapter Paragraphs */}
                <div className={`space-y-6 font-light ${fontClass}`}>
                  {chapter.paragraphs.map((p, pIndex) => (
                    <p
                      key={pIndex}
                      className={
                        index === 0 && pIndex === 0
                          ? 'first-letter:font-heading first-letter:text-5xl first-letter:float-left first-letter:mr-3 first-letter:leading-none first-letter:text-[var(--aesop-ochre)]'
                          : ''
                      }
                    >
                      {p}
                    </p>
                  ))}
                </div>

                {/* Chapter Pull Quote */}
                {chapter.quote && (
                  <blockquote className={`my-8 p-6 sm:p-8 rounded-sm border-l-4 ${themeClasses.quoteBg} shadow-sm`}>
                    <p className={`font-heading italic text-lg sm:text-xl leading-relaxed ${themeClasses.headerText}`}>
                      “{chapter.quote}”
                    </p>
                  </blockquote>
                )}

                {/* Lab Note or Field Observation */}
                {chapter.labNote && (
                  <div className={`my-8 p-6 rounded border ${themeClasses.labNoteBg}`}>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="w-2 h-2 rounded-full bg-[var(--aesop-ochre)] animate-pulse" />
                      <h3 className="text-xs uppercase tracking-[0.18em] font-semibold text-[var(--aesop-ochre)]">
                        {chapter.labNote.title}
                      </h3>
                    </div>
                    <p className={`text-xs sm:text-sm font-mono leading-relaxed opacity-90`}>
                      {chapter.labNote.content}
                    </p>
                  </div>
                )}
              </section>
            ))}
          </article>

          {/* Core Takeaways Summary Box */}
          <div className={`mt-16 p-8 rounded-sm border ${themeClasses.border} ${themeClasses.cardBg} shadow-sm`}>
            <p className="text-[0.68rem] uppercase tracking-[0.24em] font-semibold text-[var(--aesop-ochre)] mb-4">
              Key Botanical & Architectural Insights
            </p>
            <ul className="space-y-3 p-0 m-0 list-none text-xs sm:text-sm leading-relaxed">
              {currentArticle.keyTakeaways.map((point, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-[var(--aesop-ochre)] font-mono font-bold mt-0.5">•</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Related Formulations mentioned in Story */}
          {articleProducts.length > 0 && (
            <div className="mt-16 pt-12 border-t border-[var(--border)]">
              <p className="text-[0.68rem] uppercase tracking-[0.24em] font-semibold text-[var(--aesop-ochre)] mb-2">
                Formulations Referenced in this Essay
              </p>
              <h3 className={`font-heading text-2xl font-normal ${themeClasses.headerText} mb-6`}>
                Complementary Botanical Preparations
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {articleProducts.map((product) => (
                  <div
                    key={product._id}
                    className={`p-5 rounded border ${themeClasses.border} ${themeClasses.cardBg} flex flex-col justify-between group`}
                  >
                    <div>
                      <a href={`/products/${product.slug}`} className="block">
                        <div className="w-full aspect-square bg-[var(--surface-muted)] mb-4 flex items-center justify-center p-4">
                          <img
                            src={product.images?.[0] || product.category?.image}
                            alt={product.name}
                            className="max-h-full w-auto object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <h4 className={`font-heading text-base font-normal ${themeClasses.headerText} group-hover:text-[var(--aesop-ochre)] transition-colors leading-snug`}>
                          {product.name}
                        </h4>
                        <p className={`text-xs ${themeClasses.mutedText} line-clamp-2 my-2 font-light`}>
                          {product.description}
                        </p>
                      </a>
                    </div>

                    <div className="pt-3 border-t border-inherit flex items-center justify-between mt-4">
                      <span className="text-xs font-semibold">{productPrice(product)}</span>
                      <button
                        type="button"
                        onClick={() => handleAddProduct(product)}
                        className={`btn-action-add !text-white px-3 py-1.5 text-[0.65rem] uppercase tracking-wider font-semibold ${
                          addedProductId === product._id ? '!bg-[#285430]' : 'bg-[#22201d]'
                        }`}
                      >
                        <span className="!text-white">{addedProductId === product._id ? 'Added ✓' : 'Add'}</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Next / Previous Navigation Footer */}
          <div className="mt-16 pt-12 border-t border-[var(--border)] grid grid-cols-1 sm:grid-cols-2 gap-6">
            {prevArticle && (
              <button
                type="button"
                onClick={() => openArticle(prevArticle.slug)}
                className={`p-6 rounded border ${themeClasses.border} ${themeClasses.cardBg} text-left transition-all hover:border-[var(--aesop-ochre)] cursor-pointer group`}
              >
                <span className="text-[0.65rem] uppercase tracking-widest text-[var(--aesop-ochre)] font-semibold block mb-2">
                  &larr; Previous Essay
                </span>
                <p className={`font-heading text-lg font-normal ${themeClasses.headerText} group-hover:text-[var(--aesop-ochre)] transition-colors`}>
                  {prevArticle.title}
                </p>
              </button>
            )}

            {nextArticle && (
              <button
                type="button"
                onClick={() => openArticle(nextArticle.slug)}
                className={`p-6 rounded border ${themeClasses.border} ${themeClasses.cardBg} text-right transition-all hover:border-[var(--aesop-ochre)] cursor-pointer group`}
              >
                <span className="text-[0.65rem] uppercase tracking-widest text-[var(--aesop-ochre)] font-semibold block mb-2">
                  Next Essay &rarr;
                </span>
                <p className={`font-heading text-lg font-normal ${themeClasses.headerText} group-hover:text-[var(--aesop-ochre)] transition-colors`}>
                  {nextArticle.title}
                </p>
              </button>
            )}
          </div>

          {/* Bottom Back Button */}
          <div className="mt-12 text-center">
            <button
              onClick={closeArticle}
              type="button"
              className="btn-secondary !text-[#22201d] bg-white border border-[#22201d] px-8 py-3 text-xs uppercase tracking-[0.18em] font-semibold"
            >
              <span>Return to All Journal Entries</span>
            </button>
          </div>

        </main>
      </div>
    )
  }

  // =========================================================================
  // VIEW: JOURNAL COMPENDIUM & CATALOG
  // =========================================================================
  return (
    <div className="min-h-svh bg-[var(--bg)] text-[var(--text)] font-sans">
      
      {/* Hero Editorial Header */}
      <section className="border-b border-[var(--border)] bg-[var(--surface-muted)] px-[clamp(20px,5vw,72px)] py-[clamp(48px,7vw,88px)]">
        <div className="mx-auto max-w-5xl text-center [animation:amberisReveal_600ms_ease-out]">
          <p className="text-[0.68rem] uppercase tracking-[0.28em] font-semibold text-[var(--aesop-ochre)] mb-4">
            The Amberis Journal • Compendium VIII
          </p>
          <h1 className="font-heading text-[clamp(2.6rem,5vw,4.8rem)] font-normal leading-[1.08] text-[var(--text-h)] tracking-tight mb-6">
            Reflections on botany, architecture, and daily rituals.
          </h1>
          <p className="text-base sm:text-lg leading-[1.8] text-[var(--taupe)] font-light max-w-2xl mx-auto my-6">
            A curated compendium of long-form essays, field notes, and interviews exploring the phytochemistry of plant extracts, sensory design, and mindful living.
          </p>

          {/* Live Search Input */}
          <div className="max-w-md mx-auto mt-8">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search essays by topic, aroma, or scientist..."
                className="w-full bg-[var(--surface)] border border-[var(--border)] px-4 py-3 pl-10 text-xs sm:text-sm text-[var(--text-h)] placeholder-[var(--taupe)] rounded-none focus:outline-none focus:border-[var(--aesop-ochre)] transition-colors shadow-sm"
              />
              <svg
                className="w-4 h-4 text-[var(--taupe)] absolute left-3.5 top-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-3 text-xs text-[var(--taupe)] hover:text-[var(--text-h)]"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Category Navigation Pills */}
      <section className="border-b border-[var(--border)] bg-[var(--surface)] sticky top-0 z-30 shadow-xs">
        <div className="mx-auto max-w-7xl px-[clamp(20px,5vw,72px)] py-3 overflow-x-auto scrollbar-none">
          <div className="flex items-center gap-2 sm:gap-3 min-w-max">
            {journalCategories.map((category) => {
              const count =
                category === 'All Articles'
                  ? journalArticles.length
                  : journalArticles.filter((a) => a.category === category).length
              const isActive = selectedCategory === category

              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 text-[0.68rem] uppercase tracking-[0.14em] font-semibold transition-all cursor-pointer rounded-none border ${
                    isActive
                      ? 'bg-[#22201d] text-white border-[#22201d]'
                      : 'bg-transparent text-[var(--taupe)] border-[var(--border)] hover:text-[var(--text-h)] hover:border-[var(--aesop-ochre)]'
                  }`}
                >
                  <span>{category}</span>
                  <span className={`ml-1.5 text-[0.6rem] opacity-70 ${isActive ? 'text-white' : ''}`}>
                    ({count})
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* Featured Lead Essay (Only when viewing All and no search) */}
      {selectedCategory === 'All Articles' && !searchQuery && featuredArticle && (
        <section className="border-b border-[var(--border)] bg-[#22201d] text-[#f5f1eb] py-16 sm:py-20 px-[clamp(20px,5vw,72px)]">
          <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-3 text-xs">
                <span className="px-2.5 py-1 bg-[var(--aesop-ochre)] text-white font-semibold uppercase tracking-widest text-[0.6rem]">
                  Featured Editorial
                </span>
                <span className="text-[var(--soft-gold)] uppercase tracking-wider text-[0.68rem]">
                  {featuredArticle.category}
                </span>
                <span className="opacity-60">•</span>
                <span className="opacity-70 text-[0.72rem]">{featuredArticle.readTime}</span>
              </div>

              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-normal leading-tight text-[#faf7f2]">
                {featuredArticle.title}
              </h2>

              <p className="text-sm sm:text-base leading-[1.8] text-[#c7bfb5] font-light max-w-xl">
                {featuredArticle.excerpt}
              </p>

              <blockquote className="border-l-2 border-[var(--soft-gold)] pl-4 py-1 italic font-heading text-base text-[#e5ded4]">
                “{featuredArticle.pullQuote}”
              </blockquote>

              <div className="pt-4 flex items-center gap-6">
                <button
                  type="button"
                  onClick={() => openArticle(featuredArticle.slug)}
                  className="px-8 py-4 bg-white !text-[#22201d] text-xs font-semibold uppercase tracking-[0.18em] hover:bg-[var(--aesop-ochre)] hover:!text-white transition-all cursor-pointer shadow-md"
                >
                  <span>Read Full Essay &rarr;</span>
                </button>
                <div className="text-xs text-[#a8a39a]">
                  <span>By {featuredArticle.author.name}</span>
                  <span className="block opacity-60 text-[0.68rem]">{featuredArticle.author.location}</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 bg-[#1a1816] p-8 sm:p-10 border border-[rgba(255,255,255,0.08)] flex flex-col justify-between min-h-[340px]">
              <div>
                <p className="text-[0.65rem] uppercase tracking-[0.2em] font-semibold text-[var(--soft-gold)] mb-4">
                  Phytochemical Focus & Aromatics
                </p>
                <div className="space-y-3 mb-8">
                  {featuredArticle.sensoryNotes.map((note) => (
                    <div key={note} className="flex items-center gap-3 text-xs text-[#d6cfc5]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--soft-gold)]" />
                      <span>{note}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-[rgba(255,255,255,0.08)] text-[0.7rem] text-[#918c83] flex items-center justify-between">
                <span>Published {featuredArticle.date}</span>
                <span>{featuredArticle.chapters.length} Chapters</span>
              </div>
            </div>

          </div>
        </section>
      )}

      {/* Main Articles Grid */}
      <section className="py-20 px-[clamp(20px,5vw,72px)]">
        <div className="mx-auto max-w-7xl">
          
          {/* Header of results */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-8 mb-12 border-b border-[var(--border)] gap-4">
            <div>
              <p className="text-[0.65rem] uppercase tracking-[0.2em] font-semibold text-[var(--aesop-ochre)]">
                Selected Essays
              </p>
              <h2 className="font-heading text-2xl sm:text-3xl font-normal text-[var(--text-h)]">
                {selectedCategory === 'All Articles' ? 'All Published Stories' : selectedCategory}
              </h2>
            </div>
            <span className="text-xs text-[var(--taupe)] font-mono">
              Showing {filteredArticles.length} of {journalArticles.length} essays
            </span>
          </div>

          {filteredArticles.length === 0 ? (
            <div className="text-center py-20 bg-[var(--surface)] border border-[var(--border)] p-12">
              <p className="font-heading text-xl text-[var(--text-h)] mb-2">No journal essays matched your query.</p>
              <p className="text-xs text-[var(--taupe)] mb-6">Try searching for different terms like botany, architecture, or glass.</p>
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory('All Articles')
                  setSearchQuery('')
                }}
                className="btn-primary !text-white bg-[#22201d] px-6 py-2.5 text-xs font-semibold uppercase tracking-wider"
              >
                <span className="!text-white">Reset Filters</span>
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArticles.map((article) => (
                <article
                  key={article.id}
                  onClick={() => openArticle(article.slug)}
                  className="bg-[var(--surface)] border border-[var(--border)] p-8 flex flex-col justify-between group hover:shadow-[var(--shadow-card)] transition-all duration-300 cursor-pointer"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs text-[var(--taupe)] mb-4">
                      <span className="text-[0.65rem] uppercase tracking-[0.18em] font-semibold text-[var(--aesop-ochre)]">
                        {article.category}
                      </span>
                      <span>{article.readTime}</span>
                    </div>

                    <h3 className="font-heading text-xl sm:text-2xl font-normal text-[var(--text-h)] group-hover:text-[var(--aesop-ochre)] transition-colors leading-snug mb-3">
                      {article.title}
                    </h3>

                    <p className="text-xs sm:text-sm leading-[1.8] text-[var(--taupe)] font-light my-4 line-clamp-3">
                      {article.excerpt}
                    </p>

                    {/* Sensory Notes Preview */}
                    <div className="flex flex-wrap gap-1.5 my-4">
                      {article.sensoryNotes.slice(0, 2).map((note) => (
                        <span
                          key={note}
                          className="text-[0.62rem] px-2 py-0.5 rounded-full bg-[var(--surface-muted)] text-[var(--taupe)] border border-[var(--border)]"
                        >
                          {note}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 border-t border-[var(--border)] flex items-center justify-between text-xs text-[var(--taupe)] mt-6">
                    <div>
                      <span className="block font-medium text-[var(--text-h)] text-[0.72rem]">
                        {article.author.name}
                      </span>
                      <span className="text-[0.65rem] opacity-70">{article.date}</span>
                    </div>

                    <span className="font-semibold text-[var(--text-h)] group-hover:text-[var(--aesop-ochre)] group-hover:translate-x-1 transition-all inline-flex items-center gap-1 text-xs">
                      Read Essay &rarr;
                    </span>
                  </div>
                </article>
              ))}
            </div>
          )}

        </div>
      </section>

      {/* Newsletter Dispatch Banner */}
      <section className="border-t border-[var(--border)] bg-[var(--surface-strong)] py-16 px-[clamp(20px,5vw,72px)]">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-[0.68rem] uppercase tracking-[0.24em] font-semibold text-[var(--aesop-ochre)] mb-2">
            The Amberis Dispatch
          </p>
          <h2 className="font-heading text-2xl sm:text-3xl font-normal text-[var(--text-h)] mb-4">
            Receive forthcoming monographs and formulation disclosures.
          </h2>
          <p className="text-xs sm:text-sm leading-relaxed text-[var(--taupe)] font-light max-w-lg mx-auto mb-8">
            Every fortnight, we publish reflections on phytochemistry, botanical expeditions, and the philosophy of spatial design.
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              alert('Thank you for subscribing to The Amberis Journal Dispatch.')
            }}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              required
              placeholder="Enter your email address"
              className="flex-1 bg-[var(--surface)] border border-[var(--border)] px-4 py-3 text-xs text-[var(--text-h)] placeholder-[var(--taupe)] focus:outline-none focus:border-[var(--aesop-ochre)] shadow-xs"
            />
            <button
              type="submit"
              className="btn-primary !text-white bg-[#22201d] px-6 py-3 text-xs font-semibold uppercase tracking-wider shadow-sm cursor-pointer"
            >
              <span className="!text-white">Subscribe</span>
            </button>
          </form>
        </div>
      </section>

    </div>
  )
}
