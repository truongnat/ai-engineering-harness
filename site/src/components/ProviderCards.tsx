import { motion, useReducedMotion } from 'framer-motion'
import { stagger, fadeUp, motionVariants } from '../lib/animations'

const PROVIDERS = [
  {
    name: 'Claude Code',
    tag: 'Primary',
    desc: 'Full native slash commands. Best-supported path.',
    tagStyle: { background: 'rgba(99,102,241,0.12)', color: '#a5b4fc', border: '1px solid rgba(99,102,241,0.3)' },
  },
  {
    name: 'Cursor',
    tag: 'Secondary',
    desc: 'Rules-based integration. Solid support.',
    tagStyle: { background: 'rgba(6,182,212,0.1)', color: '#22d3ee', border: '1px solid rgba(6,182,212,0.25)' },
  },
  {
    name: 'Codex',
    tag: 'Experimental',
    desc: 'AGENTS.md entrypoint. Being validated.',
    tagStyle: { background: 'rgba(100,116,139,0.1)', color: '#94a3b8', border: '1px solid rgba(100,116,139,0.2)' },
  },
  {
    name: 'Gemini',
    tag: 'Experimental',
    desc: 'GEMINI.md entrypoint. Being validated.',
    tagStyle: { background: 'rgba(100,116,139,0.1)', color: '#94a3b8', border: '1px solid rgba(100,116,139,0.2)' },
  },
]

export function ProviderCards() {
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
            Providers
          </motion.p>
          <motion.h2 variants={item} className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Works where your agent lives
          </motion.h2>
          <motion.p variants={item} className="text-slate-500 mb-12 max-w-xl">
            v0.11.0 is experimental. Per-provider behavior is still being validated.
          </motion.p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {PROVIDERS.map(p => (
              <motion.div key={p.name} variants={item} className="glass-card p-6">
                <div className="flex items-start justify-between mb-4">
                  <span className="font-semibold text-slate-200">{p.name}</span>
                  <span
                    className="text-xs px-2 py-0.5 rounded-full font-semibold shrink-0 ml-2"
                    style={p.tagStyle}
                  >
                    {p.tag}
                  </span>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.p variants={item} className="mt-6 text-xs text-slate-700">
            OpenCode is no longer part of the active provider scope.
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}
