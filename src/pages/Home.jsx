import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Brain, Users, Globe, Lightbulb } from 'lucide-react'

function AnimatedStat({ value, suffix = '', label, duration = 1400 }) {
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    let animationFrameId
    const startTime = performance.now()

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      const nextValue = Math.round(progress * value)

      setDisplayValue(nextValue)

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate)
      }
    }

    animationFrameId = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [value, duration])

  return (
    <div>
      <p className="text-3xl font-semibold text-white">
        {displayValue.toLocaleString('en-US')}
        {suffix}
      </p>
      <p className="mt-2 text-xs uppercase tracking-[0.3em] text-white/60">{label}</p>
    </div>
  )
}

export default function Home() {
  const heroAnimationStyles = `
    @keyframes blob {
      0%, 100% {
        transform: translate3d(0, 0, 0) scale(1);
      }
      33% {
        transform: translate3d(35px, -25px, 0) scale(1.05);
      }
      66% {
        transform: translate3d(-25px, 30px, 0) scale(0.95);
      }
    }

    @keyframes slowfade {
      0%, 100% {
        opacity: 0.55;
      }
      50% {
        opacity: 0.9;
      }
    }

    .animate-blob {
      animation: blob 22s ease-in-out infinite;
    }

    .animate-blob-alt {
      animation: blob 28s ease-in-out infinite;
    }

    .animation-delay-2000 {
      animation-delay: 2s;
    }

    .animation-delay-4000 {
      animation-delay: 4s;
    }

    .glow-fade {
      animation: slowfade 16s ease-in-out infinite;
    }
  `

  const stats = useMemo(
    () => [
      { value: 25, suffix: '+', label: 'Institutions engaged' },
      { value: 12, suffix: '', label: 'Countries represented' },
      { value: 4, suffix: '', label: 'Focus domains' },
    ],
    []
  )

  return (
    <div>
      <style>{heroAnimationStyles}</style>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-950 py-20 sm:py-28">
        <div className="absolute inset-0 -z-10 pointer-events-none">
          <div className="absolute inset-0 bg-slate-950" />
          <div className="absolute -top-40 -left-24 h-[28rem] w-[28rem] bg-slate-500/30 blur-3xl animate-blob" />
          <div className="absolute top-1/3 -right-32 h-[26rem] w-[26rem] bg-blue-500/25 blur-[150px] animate-blob-alt animation-delay-2000" />
          <div className="absolute bottom-[-6rem] left-1/3 h-[24rem] w-[24rem] bg-emerald-400/20 blur-[140px] animate-blob animation-delay-4000" />
          <div className="absolute inset-0 bg-slate-900/80 glow-fade" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-16">
            <div className="text-white">
              <div className="mb-8 flex items-center gap-4 text-xs font-semibold uppercase tracking-[0.35em] text-white/60">
                <span className="h-px flex-1 bg-white/35" />
                <span>COST Action Proposal</span>
                <span className="h-px flex-1 bg-white/35" />
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight">
                DigInMind: DIGital INnovation in Mental health for INtervention and Diagnosis
              </h1>
              <p className="mt-6 max-w-2xl text-base sm:text-lg md:text-xl text-white/75">
                We unite clinicians, researchers, and technologists to accelerate ethical, data-driven tools that improve early detection, personalised interventions, and equitable access to mental health support across Europe.
              </p>
              <div className="mt-12 grid gap-6 sm:grid-cols-3">
                {stats.map((stat) => (
                  <AnimatedStat key={stat.label} value={stat.value} suffix={stat.suffix} label={stat.label} />
                ))}
              </div>
              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-3 bg-white px-8 py-3 text-base font-semibold uppercase tracking-[0.2em] text-slate-900 shadow-lg transition hover:bg-slate-100"
                >
                  Explore the proposal
                  <ArrowRight className="h-5 w-5" />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-3 bg-white/10 px-8 py-3 text-base font-semibold uppercase tracking-[0.2em] text-white/90 shadow-md transition hover:bg-white/20"
                >
                  Join the network
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-slate-700">
          <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Mission statement</p>
          <div className="mt-6 space-y-5 text-lg sm:text-xl leading-relaxed">
            <p>Mental health challenges are rising across Europe, yet early diagnosis and intervention remain limited by resource constraints and diagnostic complexity.</p>
            <p>DigInMind aims to build a collaborative European network that bridges clinical expertise with cutting-edge technological innovation.</p>
            <p>By bringing together diverse disciplines, we seek to develop AI-assisted tools for more accurate, accessible, and timely mental health support, ultimately improving outcomes for individuals and communities across the continent.</p>
          </div>
        </div>
      </section>

      {/* Main Proponents */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Leadership</p>
            <h2 className="mt-4 text-3xl font-bold text-slate-900 sm:text-4xl">Main proponents</h2>
          </div>
          <div className="mt-14 grid grid-cols-1 gap-8 items-stretch sm:grid-cols-2 lg:grid-cols-3">
            <div className="flex h-full flex-col bg-white p-8 shadow-xl">
              <h3 className="text-lg font-semibold text-slate-900">Dr. Marco Cremaschi</h3>
              <p className="mt-3 text-sm uppercase tracking-[0.25em] text-slate-500">University of Milano-Bicocca</p>
              <p className="mt-4 text-sm text-slate-600">Department of Informatics, Systems and Communication (DISCo)</p>
            </div>
            <div className="flex h-full flex-col bg-white p-8 shadow-xl">
              <h3 className="text-lg font-semibold text-slate-900">Prof. Antonio Preti</h3>
              <p className="mt-3 text-sm uppercase tracking-[0.25em] text-slate-500">University of Torino</p>
              <p className="mt-4 text-sm text-slate-600">Dipartimento di Neuroscienze "Rita Levi Montalcini"</p>
            </div>
            <div className="flex h-full flex-col bg-white p-8 shadow-xl">
              <h3 className="text-lg font-semibold text-slate-900">Dr. Francesco Bevione</h3>
              <p className="mt-3 text-sm uppercase tracking-[0.25em] text-slate-500">University of Torino</p>
              <p className="mt-4 text-sm text-slate-600">Dipartimento di Neuroscienze "Rita Levi Montalcini"</p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="bg-gray-50 py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Value proposition</p>
            <h2 className="mt-4 text-3xl font-bold text-slate-900 sm:text-4xl">Why DigInMind?</h2>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-10 items-stretch sm:grid-cols-2 xl:grid-cols-4">
            <div className="flex h-full flex-col bg-white p-8 shadow-lg">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                <Brain className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900">AI-assisted innovation</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">Leveraging artificial intelligence for enhanced diagnostic accuracy and early intervention.</p>
            </div>

            <div className="flex h-full flex-col bg-white p-8 shadow-lg">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-600">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900">Interdisciplinary network</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">Connecting psychologists, clinicians, and computer scientists across disciplines.</p>
            </div>

            <div className="flex h-full flex-col bg-white p-8 shadow-lg">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 text-purple-600">
                <Globe className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900">Pan-European reach</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">Building collaboration across European countries and research institutions.</p>
            </div>

            <div className="flex h-full flex-col bg-white p-8 shadow-lg">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 text-amber-600">
                <Lightbulb className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900">Accessible solutions</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">Developing tools to make mental health support more accessible to all communities.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gray-100 py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-center text-slate-900">
          <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Collaborate with us</p>
          <h2 className="mt-4 text-3xl font-bold sm:text-4xl">Join our growing network</h2>
          <p className="mt-6 text-lg text-slate-600 sm:text-xl">
            We're seeking researchers, clinicians, and professionals across Europe to collaborate on this important initiative.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center gap-3 bg-blue-600 px-8 py-3 text-base font-semibold uppercase tracking-[0.2em] text-white shadow-lg transition hover:bg-blue-700"
            >
              Express your interest
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              to="/about"
              className="inline-flex items-center gap-3 bg-white/90 px-8 py-3 text-base font-semibold uppercase tracking-[0.2em] text-slate-800 shadow-lg transition hover:bg-white"
            >
              Discover the proposal
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

