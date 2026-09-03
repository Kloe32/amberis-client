
const articles = [
  {
    id: 1,
    category: 'Botanical Science',
    title: 'The Art and Precision of Cold-Pressed Plant Lipid Extractions',
    date: 'August 18, 2026',
    readTime: '5 min read',
    excerpt:
      'How thermal thresholds affect active flavonoids and antioxidant stability during our delicate multi-phase extraction process in our Melbourne laboratory.',
  },
  {
    id: 2,
    category: 'Architecture & Spaces',
    title: 'Designing Boutiques That Speak in Textures of Stone and Wood',
    date: 'August 02, 2026',
    readTime: '4 min read',
    excerpt:
      'An interview with our principal interior architect on crafting tactile sanctuaries that slow the pulse and invite deliberate sensory connection.',
  },
  {
    id: 3,
    category: 'Daily Rituals',
    title: 'Morning Resets: The Physiological Impact of Aromatic Cleansing',
    date: 'July 24, 2026',
    readTime: '6 min read',
    excerpt:
      'Exploring how herbaceous vapors and focused skin massage can influence the parasympathetic nervous system at the dawn of the day.',
  },
  {
    id: 4,
    category: 'Formulation Craft',
    title: 'Why We Bottle Exclusively in UV-Protective Amber Glass',
    date: 'July 15, 2026',
    readTime: '3 min read',
    excerpt:
      'Exploring photochemical degradation in delicate botanicals and our ongoing circular refill initiative across our boutiques.',
  },
]

function Blog() {
  return (
    <div className="min-h-svh bg-[var(--bg)] text-[var(--text)] font-sans">
      
      {/* Hero Header */}
      <section className="border-b border-[var(--border)] bg-[var(--surface-muted)] px-[clamp(20px,5vw,72px)] py-[clamp(56px,8vw,96px)]">
        <div className="mx-auto max-w-5xl text-center">
          <p className="text-[0.68rem] uppercase tracking-[0.26em] font-semibold text-[var(--aesop-ochre)] mb-4">
            The Amberis Journal
          </p>
          <h1 className="font-heading text-[clamp(2.6rem,5vw,4.8rem)] font-normal leading-[1.08] text-[var(--text-h)] tracking-tight mb-6">
            Reflections on botany, architecture, and daily rituals.
          </h1>
          <p className="text-base sm:text-lg leading-[1.8] text-[var(--taupe)] font-light max-w-2xl mx-auto my-6">
            A curated compendium of essays and interviews exploring the craft of formulation, sensory design, and mindful living.
          </p>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-20 px-[clamp(20px,5vw,72px)]">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {articles.map((article) => (
              <article
                key={article.id}
                className="bg-[var(--surface)] border border-[var(--border)] p-8 sm:p-10 flex flex-col justify-between group hover:shadow-[var(--shadow-card)] transition-all"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-[var(--taupe)] mb-4">
                    <span className="text-[0.65rem] uppercase tracking-[0.18em] font-semibold text-[var(--aesop-ochre)]">
                      {article.category}
                    </span>
                    <span>{article.readTime}</span>
                  </div>

                  <h2 className="font-heading text-2xl sm:text-3xl font-normal text-[var(--text-h)] group-hover:text-[var(--aesop-ochre)] transition-colors leading-snug mb-3">
                    {article.title}
                  </h2>

                  <p className="text-xs sm:text-sm leading-[1.8] text-[var(--taupe)] font-light my-6">
                    {article.excerpt}
                  </p>
                </div>

                <div className="pt-6 border-t border-[var(--border)] flex items-center justify-between text-xs text-[var(--taupe)] mt-4">
                  <span>{article.date}</span>
                  <span className="font-semibold text-[var(--text-h)] group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                    Read Essay &rarr;
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}

export default Blog
