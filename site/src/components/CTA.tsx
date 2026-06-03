import { motion, useReducedMotion } from 'framer-motion'
import { stagger, fadeUp, motionVariants } from '../lib/animations'

export function CTA() {
  const reduced = useReducedMotion()
  const container = motionVariants(reduced, stagger)
  const item = motionVariants(reduced, fadeUp)

  return (
    <section className="relative z-10 section-gap px-6 pb-32">
      <div className="max-w-5xl mx-auto text-center">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="flex flex-col items-center gap-0"
        >
          <motion.p variants={item} className="text-xs uppercase tracking-widest text-indigo-400 mb-4">
            Ready?
          </motion.p>
          <motion.h2
            variants={item}
            className="text-4xl sm:text-5xl font-extrabold mb-5"
            style={{
              background: 'linear-gradient(135deg, #ffffff 0%, #c7d2fe 60%, #818cf8 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Give your agents discipline
          </motion.h2>
          <motion.p variants={item} className="text-slate-500 mb-12 max-w-md text-lg">
            Lightweight. Markdown-first. No heavy runtime.
          </motion.p>

          <motion.div variants={item} className="flex flex-wrap gap-4 justify-center">
            <a
              href="https://github.com/truongnat/ai-engineering-harness"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-7 py-3.5 rounded-lg text-sm font-semibold text-white transition-all"
              style={{
                background: 'linear-gradient(135deg, #6366f1, #4f46e5)',
                boxShadow: '0 0 24px rgba(99,102,241,0.35)',
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
              </svg>
              View on GitHub
            </a>
            <a
              href="#install"
              className="px-7 py-3.5 rounded-lg text-sm font-semibold text-slate-300 hover:text-white transition-all"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.1)',
              }}
            >
              Quickstart
            </a>
            <a
              href="#demo"
              className="px-7 py-3.5 rounded-lg text-sm font-semibold text-slate-300 hover:text-white transition-all"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.1)',
              }}
            >
              Dogfood demo
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
