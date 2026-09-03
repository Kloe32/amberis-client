import React from 'react'
import { ArrowLeft, Compass, Sparkles, BookOpen } from 'lucide-react'

export const NotFound: React.FC = () => {
  return (
    <section className="min-h-[80vh] bg-[var(--bg)] flex items-center justify-center py-20 px-[clamp(20px,5vw,72px)] font-sans text-[var(--text)]">
      <div className="max-w-2xl w-full mx-auto text-center space-y-8">
        
        {/* Subtle decorative emblem */}
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[var(--surface)] border border-[var(--border)] text-[var(--aesop-ochre)] shadow-sm">
          <Compass className="w-7 h-7" />
        </div>

        <div className="space-y-3">
          <p className="text-[0.68rem] font-bold uppercase tracking-[0.24em] text-[var(--aesop-ochre)]">
            404 &mdash; Page Not Found
          </p>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-normal text-[var(--text-h)] leading-tight">
            An uncharted path.
          </h1>
          <p className="text-sm sm:text-base text-[var(--taupe)] font-light max-w-lg mx-auto leading-relaxed pt-2">
            The formulation, journal entry, or catalogue chapter you are seeking does not exist or may have been quietly relocated.
          </p>
        </div>

        {/* Quick Suggestions Card */}
        <div className="bg-[var(--surface)] border border-[var(--border)] p-6 sm:p-8 text-left space-y-4 shadow-[var(--shadow-subtle)]">
          <p className="text-[0.65rem] uppercase tracking-[0.2em] font-semibold text-[var(--taupe)] border-b border-[var(--border)] pb-3">
            Suggested Destinations
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <a
              href="/products"
              className="p-3 bg-[var(--surface-muted)] border border-[var(--border)] hover:border-[var(--aesop-dark)] transition-colors flex items-center gap-3 group"
            >
              <Sparkles className="w-4 h-4 text-[var(--aesop-ochre)] shrink-0" />
              <div>
                <p className="font-heading text-sm text-[var(--text-h)] group-hover:text-[var(--aesop-ochre)] transition-colors">
                  Skin Care Formulations
                </p>
                <p className="text-[var(--taupe)] text-[0.68rem]">Explore botanical rituals</p>
              </div>
            </a>

            <a
              href="/blog"
              className="p-3 bg-[var(--surface-muted)] border border-[var(--border)] hover:border-[var(--aesop-dark)] transition-colors flex items-center gap-3 group"
            >
              <BookOpen className="w-4 h-4 text-[var(--aesop-ochre)] shrink-0" />
              <div>
                <p className="font-heading text-sm text-[var(--text-h)] group-hover:text-[var(--aesop-ochre)] transition-colors">
                  The Amberis Journal
                </p>
                <p className="text-[var(--taupe)] text-[0.68rem]">Essays on skin & senses</p>
              </div>
            </a>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-2">
          <a
            href="/"
            className="btn-primary !text-white bg-[#22201d] w-full sm:w-auto px-8 py-3.5 text-xs uppercase tracking-[0.18em] font-semibold flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-white" />
            <span className="!text-white">Return to Homepage</span>
          </a>
          <a
            href="/products"
            className="btn-secondary w-full sm:w-auto px-8 py-3.5 text-xs uppercase tracking-[0.18em] font-semibold flex items-center justify-center gap-2"
          >
            <span>Browse All Formulations</span>
          </a>
        </div>

      </div>
    </section>
  )
}

export default NotFound
