import { motion, useReducedMotion } from 'framer-motion'
import { stagger, fadeUp, motionVariants } from '../lib/animations'

const COMMANDS = [
  { id: 'harness-map',      reads: 'repo',           writes: 'MAP.md',        gate: false },
  { id: 'harness-start',    reads: 'MAP.md',         writes: 'GOAL.md',       gate: false },
  { id: 'harness-discuss',  reads: 'GOAL.md',        writes: 'DISCUSSION.md', gate: false },
  { id: 'harness-plan',     reads: 'DISCUSSION.md',  writes: 'PLAN.md',       gate: true  },
  { id: 'harness-run',      reads: 'PLAN.md',        writes: 'impl',          gate: false },
  { id: 'harness-verify',   reads: 'impl',           writes: 'VERIFY.md',     gate: false },
  { id: 'harness-ship',     reads: 'VERIFY.md',      writes: 'SHIP.md',       gate: true  },
  { id: 'harness-remember', reads: 'SHIP.md',        writes: 'REMEMBER.md',   gate: false },
]

export function CommandFlow() {
  const reduced = useReducedMotion()
  const container = motionVariants(reduced, stagger)
  const item = motionVariants(reduced, fadeUp)

  return (
    <section id="commands" className="relative z-10 section-gap px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
        >
          <motion.p variants={item} className="text-xs uppercase tracking-widest text-indigo-400 mb-3">
            Command flow
          </motion.p>
          <motion.h2 variants={item} className="text-3xl sm:text-4xl font-bold text-white mb-12">
            Eight commands, one loop
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {COMMANDS.map((cmd) => (
              <motion.div key={cmd.id} variants={item} className="glass-card p-5">
                {cmd.gate && (
                  <span
                    className="inline-block mb-3 text-xs px-2 py-0.5 rounded font-semibold"
                    style={{
                      background: 'rgba(234,179,8,0.1)',
                      color: '#facc15',
                      border: '1px solid rgba(234,179,8,0.2)',
                    }}
                  >
                    approval gate
                  </span>
                )}
                <div className="font-mono text-sm font-medium text-indigo-300 mb-3">
                  {cmd.id}
                </div>
                <div className="space-y-1.5 text-xs text-slate-600">
                  <div className="flex gap-2">
                    <span className="text-slate-700 w-10 shrink-0">reads</span>
                    <span className="font-mono text-slate-500">{cmd.reads}</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-slate-700 w-10 shrink-0">writes</span>
                    <span className="font-mono text-emerald-600">{cmd.writes}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
