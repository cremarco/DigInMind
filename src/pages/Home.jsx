import { useEffect, useMemo, useState } from 'react'
import { ArrowRight, Brain, Users, Globe, Lightbulb, AlertTriangle, Target, Network, Microscope, Heart, Mail, MapPin } from 'lucide-react'
import { smoothScrollTo } from '../utils/scroll'

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
    [],
  )

  return (
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
                <a
                  href="#contact"
                  onClick={(event) => {
                    event.preventDefault()
                    smoothScrollTo('contact')
                  }}
                  className="inline-flex items-center gap-3 bg-white/10 px-8 py-3 text-base font-semibold uppercase tracking-[0.2em] text-white/90 shadow-md transition hover:bg-white/20"
                >
                  Join the network
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section id="mission" className="bg-white py-20">
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
      <section id="proposal" className="bg-gray-50 py-20">
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

      {/* The challenge & mission */}
      <section className="bg-gray-100 py-24" id="challenge">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-slate-700">
          <div className="grid gap-16 lg:grid-cols-[1fr,1.3fr]">
            <div>
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center bg-white/10 shadow-md">
                  <AlertTriangle className="h-6 w-6 text-red-500" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Context</p>
                  <h2 className="text-3xl font-semibold text-slate-900">The challenge</h2>
                </div>
              </div>

              <div className="mt-10 rounded-xl bg-white p-10 shadow-2xl">
                <p className="text-lg leading-relaxed">
                  Mental health disorders represent one of Europe's most pressing public health challenges, affecting millions of individuals and their families. Despite significant advances in clinical psychology and psychiatry, several critical barriers continue to impede effective care:
                </p>

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

                <p className="mt-10 text-lg leading-relaxed">
                  These challenges are compounded by the growing demand for mental health services, workforce shortages, and the need for culturally sensitive, evidence-based interventions. Traditional approaches alone cannot address the scale and complexity of this crisis.
                </p>
              </div>
            </div>

            <div id="mission-details">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center bg-white/10 shadow-md">
                  <Target className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Mission</p>
                  <h2 className="text-3xl font-semibold text-slate-900">Our aim</h2>
                </div>
              </div>

              <div className="mt-10 rounded-xl bg-white p-10 shadow-2xl">
                <p className="text-lg leading-relaxed">
                  DigInMind aims to establish a transformative pan-European network that harnesses the power of digital innovation to revolutionise mental health care. Our mission is to create a collaborative ecosystem where clinical expertise meets technological advancement.
                </p>

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

                <div className="mt-12 bg-white/15 p-10 text-slate-700 shadow-2xl">
                  <p className="text-xs uppercase tracking-[0.35em] text-blue-600">Our vision</p>
                  <p className="mt-4 text-lg leading-relaxed">
                    Through this COST Action, we envision a future where digital innovation complements human expertise to provide more accurate, accessible, and personalised mental health care. By fostering collaboration across borders and disciplines, DigInMind will contribute to reducing the burden of mental health disorders and improving quality of life for millions of Europeans.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact */}
      <section id="impact" className="bg-white py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-slate-700">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center bg-white/10 shadow-md">
              <Target className="h-6 w-6 text-indigo-600" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Impact</p>
              <h2 className="text-3xl font-semibold text-slate-900">Expected outcomes</h2>
            </div>
          </div>

          <div className="mt-10 rounded-xl bg-gray-50 p-10 shadow-2xl">
            <ul className="space-y-6 text-slate-700">
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

          <div className="mt-24 bg-white/12 p-12 text-center backdrop-blur-xl shadow-2xl">
            <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Collaborate</p>
            <h3 className="mt-4 text-3xl font-semibold text-slate-900">Be part of the solution</h3>
            <p className="mx-auto mt-6 max-w-2xl text-slate-600">
              We welcome researchers, clinicians, and professionals who share our vision for transforming mental health care through digital innovation.
            </p>
            <a
              href="#contact"
              onClick={(event) => {
                event.preventDefault()
                smoothScrollTo('contact')
              }}
              className="mt-8 inline-flex items-center gap-3 bg-blue-600 px-10 py-4 text-sm font-semibold uppercase tracking-[0.3em] text-white shadow-lg transition hover:bg-blue-700"
            >
              Join our network
              <ArrowRight className="h-5 w-5" />
            </a>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="bg-slate-950 py-24 text-white/80">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-xs uppercase tracking-[0.35em] text-white/60">Contact</p>
            <h2 className="mt-4 text-4xl font-bold text-white sm:text-5xl">Join the DigInMind network</h2>
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
              <h3 className="mt-6 text-3xl font-semibold text-white">Get in touch</h3>
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
      </section>
    </div>
  )
}

