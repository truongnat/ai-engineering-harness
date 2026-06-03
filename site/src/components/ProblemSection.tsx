import { motion, useReducedMotion } from 'framer-motion'
import { stagger, fadeUp, motionVariants } from '../lib/animations'

const PAINS = [
  {
    icon: '⚠',
    title: 'Agents skip planning',
    body: 'Without a goal contract, agents jump straight to code — and build the wrong thing confidently.',
  },
  {
    icon: '✗',
    title: 'Verification is optimistic prose',
    body: '"Tests pass" without evidence. No exit codes, no test counts, no proof the command actually ran.',
  },
  {
    icon: '◌',
    title: 'Context forgotten between sessions',
    body: 'Decisions, constraints, and prior work evaporate when the context window resets.',
  },
]

const SOLUTION = [
  { label: 'Goal', file: 'GOAL.md' },
  { label: 'Plan', file: 'PLAN.md' },
  { label: 'Tasks', file: 'TASKS.md' },
  { label: 'Verify', file: 'VERIFY.md' },
  { label: 'Ship', file: 'SHIP.md' },
  { label: 'Remember', file: 'REMEMBER.md' },
]

export function ProblemSection() {
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
            The problem
          </motion.p>
          <motion.h2 variants={item} className="text-3xl sm:text-4xl font-bold text-white mb-12">
            What breaks without discipline
          </motion.h2>

          {/* Pain cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-16">
            {PAINS.map((pain) => (
              <motion.div key={pain.title} variants={item} className="glass-card p-6">
                <div
                  className="text-2xl mb-4 w-10 h-10 flex items-center justify-center rounded-lg"
                  style={{ background: 'rgba(239,68,68,0.1)', color: '#f87171' }}
                >
                  {pain.icon}
                </div>
                <h3 className="font-semibold text-slate-200 mb-2">{pain.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{pain.body}</p>
              </motion.div>
            ))}
          </div>

          {/* Solution loop */}
          <motion.p variants={item} className="text-xs uppercase tracking-widest text-slate-600 mb-5">
            The solution
          </motion.p>
          <motion.div variants={item} className="flex flex-wrap gap-2 items-center">
            {SOLUTION.map((step, i) => (
              <div key={step.label} className="flex items-center gap-2">
                <div
                  className="px-4 py-2.5 rounded-xl text-center"
                  style={{
                    background: 'rgba(99,102,241,0.08)',
                    border: '1px solid rgba(99,102,241,0.2)',
                  }}
                >
                  <div className="text-xs font-semibold text-indigo-300">{step.label}</div>
                  <div className="text-xs text-slate-600 font-mono mt-0.5">{step.file}</div>
                </div>
                {i < SOLUTION.length - 1 && (
                  <span className="text-slate-700 text-sm">→</span>
                )}
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
