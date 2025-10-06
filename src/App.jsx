import { useEffect, useMemo, useState } from 'react'
import { ArrowRight, Brain, Users, Globe, Lightbulb, AlertTriangle, Target, Network, Microscope, Heart, Mail, MapPin, AlertCircle } from 'lucide-react'

// Utility function for smooth scrolling
function smoothScrollTo(id, offset = 80) {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return
  }

  const target = document.getElementById(id)
  if (!target) {
    return
  }

  const top = target.getBoundingClientRect().top + window.scrollY - offset
  window.scrollTo({ top, behavior: 'smooth' })
}

// AnimatedStat component
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

// Banner component
function Banner() {
  return (
    <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 text-white text-opacity-80">
      <div className="mx-auto flex max-w-7xl items-center justify-center gap-3 px-4 py-3 text-xs font-medium uppercase tracking-[0.35em]">
        <AlertCircle className="h-4 w-4 flex-shrink-0 text-white text-opacity-60" />
        <p className="text-center">
          This website presents a COST Action proposal currently under preparation. The network is not yet approved.
        </p>
      </div>
    </div>
  )
}

// Header component
function Header() {
  const navigation = useMemo(
    () => [
      { id: 'hero', label: 'Home' },
      { id: 'mission', label: 'Mission' },
      { id: 'proposal', label: 'Proposal' },
      { id: 'challenge', label: 'Challenge' },
      { id: 'aim', label: 'Our Aim' },
      { id: 'impact', label: 'Impact' },
      { id: 'solution', label: 'Join Us' },
      { id: 'vision', label: 'Vision' },
    ],
    [],
  )

  const [activeSection, setActiveSection] = useState('hero')

  useEffect(() => {
    const getSectionOffsets = () =>
      navigation
        .map(({ id }) => {
          const element = document.getElementById(id)
          return element
            ? {
                id,
                top: element.offsetTop,
              }
            : null
        })
        .filter(Boolean)

    let sectionOffsets = getSectionOffsets()

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 140

      for (let i = sectionOffsets.length - 1; i >= 0; i -= 1) {
        const section = sectionOffsets[i]
        if (section && scrollPosition >= section.top) {
          setActiveSection(section.id)
          return
        }
      }

      setActiveSection('hero')
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [navigation])

  const linkClasses = (id) =>
    id === activeSection
      ? 'text-blue-600'
      : 'text-slate-500 hover:text-slate-900'

  return (
    <header className="sticky top-0 z-40 bg-white bg-opacity-80 backdrop-blur shadow-md">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a
          href="#hero"
          onClick={(event) => {
            event.preventDefault()
            smoothScrollTo('hero')
          }}
          className="text-lg font-semibold tracking-[0.3em] text-slate-900"
        >
          DigInMind
        </a>

        <div className="flex items-center gap-8 text-xs font-semibold uppercase tracking-[0.3em] text-slate-600">
          {navigation.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={(event) => {
                event.preventDefault()
                smoothScrollTo(id)
              }}
              className={`pb-1 transition ${linkClasses(id)}`}
            >
              {label}
            </a>
          ))}
        </div>
      </nav>
    </header>
  )
}

// Footer component
function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
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
            </ul>
          </div>

        </div>

        <div className="mt-16 pt-8 text-center text-xs uppercase tracking-[0.35em] text-white/45 shadow-inner">
          <p>© {new Date().getFullYear()} DigInMind COST Action Proposal</p>
        </div>
      </div>
    </footer>
  )
}

// Main App component
function App() {
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
    [],
  )

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <Banner />
      <Header />
      <main className="flex-grow">
        <div>
          <style>{heroAnimationStyles}</style>
          {/* Hero Section */}
          <section id="hero" className="relative overflow-hidden bg-slate-950 py-20 sm:py-28">
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
                    <a
                      href="#proposal"
                      onClick={(event) => {
                        event.preventDefault()
                        smoothScrollTo('proposal')
                      }}
                      className="inline-flex items-center gap-3 bg-white px-8 py-3 text-base font-semibold uppercase tracking-[0.2em] text-slate-900 shadow-lg transition hover:bg-slate-100"
                    >
                      Explore the proposal
                      <ArrowRight className="h-5 w-5" />
                    </a>
                  </div>
                </div>

              </div>
            </div>
          </section>

          {/* Mission Statement */}
          <section id="mission" className="bg-white py-20">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">Mission Statement</h2>
              </div>
              <div className="mt-10 space-y-5 text-lg sm:text-xl leading-relaxed text-slate-700">
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
                <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">Main proponents</h2>
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
          <section id="proposal" className="bg-gray-50 py-20">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">Why DigInMind?</h2>
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

          {/* The challenge */}
          <section id="challenge" className="bg-gray-100 py-20">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">The challenge</h2>
              </div>

              <div className="mt-10 space-y-5 text-lg sm:text-xl leading-relaxed text-slate-700">
                <p>Mental health disorders represent one of Europe's most pressing public health challenges, affecting millions of individuals and their families. Despite significant advances in clinical psychology and psychiatry, several critical barriers continue to impede effective care:</p>
                
                <div className="mt-10 grid grid-cols-1 gap-8 items-stretch sm:grid-cols-2 xl:grid-cols-3">
                  <div className="flex h-full flex-col rounded-lg bg-blue-50/60 p-6 shadow-md">
                    <h3 className="text-lg font-semibold text-slate-900">Early diagnosis difficulties</h3>
                    <p className="mt-3 text-sm leading-relaxed text-slate-600">
                      Mental health conditions often go undetected until they reach advanced stages, missing crucial windows for early intervention and prevention.
                    </p>
                  </div>
                  <div className="flex h-full flex-col rounded-lg bg-purple-50/60 p-6 shadow-md">
                    <h3 className="text-lg font-semibold text-slate-900">Symptom variability</h3>
                    <p className="mt-3 text-sm leading-relaxed text-slate-600">
                      Mental health symptoms manifest differently across individuals, cultures, and contexts, making standardised diagnosis challenging.
                    </p>
                  </div>
                  <div className="flex h-full flex-col rounded-lg bg-emerald-50/60 p-6 shadow-md">
                    <h3 className="text-lg font-semibold text-slate-900">Access barriers</h3>
                    <p className="mt-3 text-sm leading-relaxed text-slate-600">
                      Limited resources, geographic disparities, and stigma create significant obstacles to accessing timely mental health support and treatment.
                    </p>
                  </div>
                </div>

                <p>These challenges are compounded by the growing demand for mental health services, workforce shortages, and the need for culturally sensitive, evidence-based interventions. Traditional approaches alone cannot address the scale and complexity of this crisis.</p>
              </div>
            </div>
          </section>

          {/* Our aim */}
          <section id="aim" className="bg-white py-20">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">Our aim</h2>
              </div>

              <div className="mt-10 space-y-5 text-lg sm:text-xl leading-relaxed text-slate-700">
                <p>DigInMind aims to establish a transformative pan-European network that harnesses the power of digital innovation to revolutionise mental health care. Our mission is to create a collaborative ecosystem where clinical expertise meets technological advancement.</p>

                <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-2">
                  <div className="space-y-8">
                    <div className="rounded-xl bg-slate-50 p-6 shadow-md">
                      <div className="flex items-center gap-3 text-xs uppercase tracking-[0.35em] text-slate-500">
                        <Network className="h-5 w-5 text-indigo-600" />
                        <span>Interdisciplinary cohesion</span>
                      </div>
                      <h3 className="mt-4 text-lg font-semibold text-slate-900">Build an interdisciplinary network</h3>
                      <p className="mt-3 text-sm leading-relaxed text-slate-600">
                        Connect researchers, clinicians, psychologists, computer scientists, data scientists, and ethicists across Europe to foster knowledge exchange and collaborative research.
                      </p>
                    </div>

                    <div className="rounded-xl bg-slate-50 p-6 shadow-md">
                      <div className="flex items-center gap-3 text-xs uppercase tracking-[0.35em] text-slate-500">
                        <Microscope className="h-5 w-5 text-teal-600" />
                        <span>Technological innovation</span>
                      </div>
                      <h3 className="mt-4 text-lg font-semibold text-slate-900">Develop AI-assisted diagnostic tools</h3>
                      <p className="mt-3 text-sm leading-relaxed text-slate-600">
                        Create innovative, evidence-based AI technologies that enhance diagnostic accuracy, support early detection, and provide personalised intervention recommendations while maintaining ethical standards.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-8">
                    <div className="rounded-xl bg-slate-50 p-6 shadow-md">
                      <div className="flex items-center gap-3 text-xs uppercase tracking-[0.35em] text-slate-500">
                        <Heart className="h-5 w-5 text-rose-600" />
                        <span>Patient-centred care</span>
                      </div>
                      <h3 className="mt-4 text-lg font-semibold text-slate-900">Improve early intervention</h3>
                      <p className="mt-3 text-sm leading-relaxed text-slate-600">
                        Enable timely identification of mental health challenges and facilitate rapid access to appropriate care, ultimately reducing the burden on individuals and healthcare systems.
                      </p>
                    </div>

                    <div className="rounded-xl bg-slate-50 p-6 shadow-md">
                      <div className="flex items-center gap-3 text-xs uppercase tracking-[0.35em] text-slate-500">
                        <Users className="h-5 w-5 text-amber-600" />
                        <span>Equitable access</span>
                      </div>
                      <h3 className="mt-4 text-lg font-semibold text-slate-900">Promote accessibility and equity</h3>
                      <p className="mt-3 text-sm leading-relaxed text-slate-600">
                        Ensure that digital mental health solutions are accessible, culturally appropriate, and beneficial to diverse populations across Europe, regardless of geographic or socioeconomic barriers.
                      </p>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </section>

          {/* Impact */}
          <section id="impact" className="bg-white py-20">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">Expected outcomes</h2>
              </div>

              <div className="mt-10 space-y-5 text-lg sm:text-xl leading-relaxed text-slate-700">
                <ul className="space-y-6">
                  <li className="flex items-start gap-4">
                    <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-blue-500" />
                    <span>Enhanced diagnostic accuracy through AI-powered assessment tools.</span>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-blue-500" />
                    <span>Reduced waiting times for mental health assessments and interventions.</span>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-blue-500" />
                    <span>Cross-border knowledge sharing and best practice development.</span>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-blue-500" />
                    <span>Training opportunities for early-career researchers in digital mental health.</span>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-blue-500" />
                    <span>Ethical frameworks for responsible AI use in mental health care.</span>
                  </li>
                </ul>
              </div>

            </div>
          </section>

          {/* Be part of the solution */}
          <section id="solution" className="bg-gray-50 py-20">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">Be part of the solution</h2>
              </div>
              <div className="mt-10 space-y-5 text-lg sm:text-xl leading-relaxed text-slate-700">
                <p className="mx-auto max-w-2xl text-center">
                  We welcome researchers, clinicians, and professionals who share our vision for transforming mental health care through digital innovation.
                </p>
                <div className="text-center">
                  <a
                    href="mailto:marco.cremaschi@unimib.it?subject=DigInMind - Expression of Interest"
                    className="mt-8 inline-flex items-center gap-3 bg-white px-10 py-4 text-sm font-semibold uppercase tracking-[0.3em] text-slate-900 shadow-lg transition hover:bg-slate-100"
                  >
                    <Mail className="h-6 w-6" />
                    Get in touch
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* Our vision */}
          <section id="vision" className="bg-white py-20">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">Our vision</h2>
              </div>
              <div className="mt-10 space-y-5 text-lg sm:text-xl leading-relaxed text-slate-700">
                <p>Through this COST Action, we envision a future where digital innovation complements human expertise to provide more accurate, accessible, and personalised mental health care. By fostering collaboration across borders and disciplines, DigInMind will contribute to reducing the burden of mental health disorders and improving quality of life for millions of Europeans.</p>
              </div>
            </div>
          </section>

        </div>
      </main>
      <Footer />
    </div>
  )
}

export default App