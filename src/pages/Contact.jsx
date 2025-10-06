import { Mail, MapPin, Users } from 'lucide-react'

export default function Contact() {
  return (
    <div className="bg-slate-950 pb-24 pt-16 text-white/80">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-xs uppercase tracking-[0.35em] text-white/60">Contact</p>
          <h1 className="mt-4 text-4xl font-bold text-white sm:text-5xl">Join the DigInMind network</h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg text-white/70">
            We're building a community of experts dedicated to advancing mental health care through digital innovation. Express your interest in joining our collaborative network.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-10 items-stretch lg:grid-cols-3">
          <div className="flex h-full flex-col bg-white/5 p-8 shadow-2xl backdrop-blur-xl">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center bg-white/10 shadow-md">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-white/60">Eligibility</p>
                <h3 className="text-lg font-semibold text-white">Who can join</h3>
              </div>
            </div>
            <p className="mt-6 text-sm leading-relaxed text-white/70">
              Researchers, clinicians, psychologists, computer scientists, data scientists, and mental health professionals from across Europe.
            </p>
          </div>

          <div className="flex h-full flex-col bg-white/5 p-8 shadow-2xl backdrop-blur-xl">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center bg-white/10 shadow-md">
                <MapPin className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-white/60">Scope</p>
                <h3 className="text-lg font-semibold text-white">Geographic reach</h3>
              </div>
            </div>
            <p className="mt-6 text-sm leading-relaxed text-white/70">
              Open to participants from all COST member countries and cooperating states across Europe and beyond.
            </p>
          </div>

          <div className="flex h-full flex-col bg-white/5 p-8 shadow-2xl backdrop-blur-xl">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center bg-white/10 shadow-md">
                <Mail className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-white/60">Involvement</p>
                <h3 className="text-lg font-semibold text-white">How to engage</h3>
              </div>
            </div>
            <p className="mt-6 text-sm leading-relaxed text-white/70">
              Express your interest and learn about collaboration opportunities by contacting the coordination team.
            </p>
          </div>
        </div>

        <div className="mx-auto mt-20 max-w-2xl">
          <div className="bg-white/5 p-12 text-center shadow-2xl backdrop-blur-xl">
            <div className="mx-auto flex h-20 w-20 items-center justify-center bg-white/10 shadow-lg">
              <Mail className="h-10 w-10 text-white" />
            </div>
            <h2 className="mt-6 text-3xl font-semibold text-white">Get in touch</h2>
            <p className="mx-auto mt-6 max-w-xl text-lg text-white/75">
              Interested in joining our network or learning more about the DigInMind proposal? Reach out to us via email.
            </p>
            <a
              href="mailto:marco.cremaschi@unimib.it?subject=DigInMind - Expression of Interest"
              className="mt-8 inline-flex items-center gap-3 bg-white px-10 py-4 text-sm font-semibold uppercase tracking-[0.3em] text-slate-900 shadow-lg transition hover:bg-slate-100"
            >
              <Mail className="h-6 w-6" />
              marco.cremaschi@unimib.it
            </a>
            <div className="mt-10 pt-6 text-sm text-white/60">
              <p>
                <strong>Note:</strong> This is a preliminary expression of interest for a COST Action proposal currently under preparation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

