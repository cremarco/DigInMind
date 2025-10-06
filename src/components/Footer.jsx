import { Mail, Users, Globe } from 'lucide-react'
import { smoothScrollTo } from '../utils/scroll'

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-[0.35em] text-slate-300">About</p>
            <p className="text-sm leading-relaxed text-slate-200">
              A pan-European COST network proposal connecting psychologists, clinicians, and computer scientists to advance AI-assisted mental health diagnosis and early intervention.
            </p>
          </div>

          <div className="space-y-4">
            <p className="text-xs uppercase tracking-[0.35em] text-slate-300">Quick links</p>
            <ul className="space-y-3 text-sm text-slate-200">
              <li>
                <a href="https://www.cost.eu" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 rounded-md bg-white/10 px-4 py-3 text-white/85 shadow-sm transition hover:bg-white/15">
                  <Globe className="h-4 w-4" />
                  COST Association
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  onClick={(event) => {
                    event.preventDefault()
                    smoothScrollTo('contact')
                  }}
                  className="flex items-center gap-3 rounded-md bg-white/10 px-4 py-3 text-white/85 shadow-sm transition hover:bg-white/15"
                >
                  <Users className="h-4 w-4" />
                  Join the Network
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <p className="text-xs uppercase tracking-[0.35em] text-slate-300">Contact</p>
            <p className="text-sm text-slate-200">
              Interested in joining our network? Reach out to learn more about collaboration opportunities.
            </p>
            <a
              href="#contact"
              onClick={(event) => {
                event.preventDefault()
                smoothScrollTo('contact')
              }}
              className="inline-flex items-center gap-3 rounded-md bg-white/10 px-4 py-3 text-sm font-medium uppercase tracking-[0.3em] text-white shadow-sm transition hover:bg-white/15"
            >
              <Mail className="h-4 w-4" />
              Get in touch
            </a>
          </div>
        </div>

        <div className="mt-16 pt-8 text-center text-xs uppercase tracking-[0.35em] text-white/45 shadow-inner">
          <p>© {new Date().getFullYear()} DigInMind COST Action Proposal</p>
        </div>
      </div>
    </footer>
  )
}

