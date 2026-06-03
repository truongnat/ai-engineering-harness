import { motion, useReducedMotion } from 'framer-motion'
import { stagger, fadeUp, motionVariants } from '../lib/animations'

const FEATURES = [
  {
    title: 'Easy to inspect',
    body: 'Every artifact is a plain markdown file. Open it in any editor, diff it in git, read it in code review.',
    icon: '◉',
    color: '#6366f1',
  },
  {
    title: 'Easy to version',
    body: 'Artifacts live in `.harness/` alongside your code. Git tracks every goal, plan, and verify decision.',
    icon: '◎',
    color: '#7c3aed',
  },
  {
    title: 'Easy for agents to follow',
    body: 'Agents read and write markdown reliably. No custom runtime, no API calls — just files with a known schema.',
    icon: '◈',
    color: '#0891b2',
  },
]

export function FeatureGrid() {
  const reduced = useReducedMotion()
  const container = motionVariants(reduced, stagger)
  const item = motionVariants(reduced, fadeUp)

  return (
    <section className="relative z-10 section-gap px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
        >
          <motion.p variants={item} className="text-xs uppercase tracking-widest text-indigo-400 mb-3">
            Why markdown-first?
          </motion.p>
          <motion.h2 variants={item} className="text-3xl sm:text-4xl font-bold text-white mb-12">
            The format that works everywhere
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {FEATURES.map(f => (
              <motion.div key={f.title} variants={item} className="glass-card p-6">
                <div
                  className="text-xl mb-4 w-10 h-10 flex items-center justify-center rounded-lg font-mono"
                  style={{ background: `${f.color}18`, color: f.color }}
                >
                  {f.icon}
                </div>
                <h3 className="font-semibold text-slate-200 mb-2">{f.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{f.body}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
