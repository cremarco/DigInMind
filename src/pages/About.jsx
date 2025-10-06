import { AlertTriangle, Target, Network, Microscope, Heart, Users } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function About() {
  return (
    <div className="bg-gray-50 pb-24 pt-16 text-slate-700">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-xs uppercase tracking-[0.35em] text-slate-500">About</p>
          <h1 className="mt-4 text-4xl font-bold text-slate-900 sm:text-5xl">The proposal</h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg text-slate-600">
            Understanding the challenge and our vision for transforming mental health care through digital innovation.
          </p>
        </div>

        <section className="mt-20">
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
                <p className="mt-3 text-sm leading-relaxed text-slate-600">Mental health conditions often go undetected until they reach advanced stages, missing crucial windows for early intervention and prevention.</p>
              </div>
              <div className="flex h-full flex-col rounded-lg bg-purple-50/60 p-6 shadow-md">
                <h3 className="text-lg font-semibold text-slate-900">Symptom variability</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">Mental health symptoms manifest differently across individuals, cultures, and contexts, making standardised diagnosis challenging.</p>
              </div>
              <div className="flex h-full flex-col rounded-lg bg-emerald-50/60 p-6 shadow-md">
                <h3 className="text-lg font-semibold text-slate-900">Access barriers</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">Limited resources, geographic disparities, and stigma create significant obstacles to accessing timely mental health support and treatment.</p>
              </div>
            </div>

            <p className="mt-10 text-lg leading-relaxed">
              These challenges are compounded by the growing demand for mental health services, workforce shortages, and the need for culturally sensitive, evidence-based interventions. Traditional approaches alone cannot address the scale and complexity of this crisis.
            </p>
          </div>
        </section>

        <section className="mt-24">
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
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">Connect researchers, clinicians, psychologists, computer scientists, data scientists, and ethicists across Europe to foster knowledge exchange and collaborative research.</p>
                </div>

                <div className="rounded-xl bg-slate-50 p-6 shadow-md">
                  <div className="flex items-center gap-3 text-xs uppercase tracking-[0.35em] text-slate-500">
                    <Microscope className="h-5 w-5 text-teal-600" />
                    <span>Technological innovation</span>
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-slate-900">Develop AI-assisted diagnostic tools</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">Create innovative, evidence-based AI technologies that enhance diagnostic accuracy, support early detection, and provide personalised intervention recommendations while maintaining ethical standards.</p>
                </div>
              </div>

              <div className="space-y-8">
                <div className="rounded-xl bg-slate-50 p-6 shadow-md">
                  <div className="flex items-center gap-3 text-xs uppercase tracking-[0.35em] text-slate-500">
                    <Heart className="h-5 w-5 text-rose-600" />
                    <span>Patient-centred care</span>
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-slate-900">Improve early intervention</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">Enable timely identification of mental health challenges and facilitate rapid access to appropriate care, ultimately reducing the burden on individuals and healthcare systems.</p>
                </div>

                <div className="rounded-xl bg-slate-50 p-6 shadow-md">
                  <div className="flex items-center gap-3 text-xs uppercase tracking-[0.35em] text-slate-500">
                    <Users className="h-5 w-5 text-amber-600" />
                    <span>Equitable access</span>
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-slate-900">Promote accessibility and equity</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">Ensure that digital mental health solutions are accessible, culturally appropriate, and beneficial to diverse populations across Europe, regardless of geographic or socioeconomic barriers.</p>
                </div>
              </div>
            </div>

            <div className="mt-12 bg-white/15 p-10 text-white/75 shadow-2xl">
              <p className="text-xs uppercase tracking-[0.35em] text-blue-600">Our vision</p>
              <p className="mt-4 text-lg leading-relaxed text-slate-700">
                Through this COST Action, we envision a future where digital innovation complements human expertise to provide more accurate, accessible, and personalised mental health care. By fostering collaboration across borders and disciplines, DigInMind will contribute to reducing the burden of mental health disorders and improving quality of life for millions of Europeans.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-24">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center bg-white/10 shadow-md">
              <Target className="h-6 w-6 text-indigo-600" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Impact</p>
              <h2 className="text-3xl font-semibold text-slate-900">Expected outcomes</h2>
            </div>
          </div>

          <div className="mt-10 rounded-xl bg-white p-10 shadow-2xl">
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
        </section>

        <div className="mt-24 bg-white/12 p-12 text-center backdrop-blur-xl shadow-2xl">
          <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Collaborate</p>
          <h3 className="mt-4 text-3xl font-semibold text-slate-900">Be part of the solution</h3>
          <p className="mx-auto mt-6 max-w-2xl text-slate-600">
            We welcome researchers, clinicians, and professionals who share our vision for transforming mental health care through digital innovation.
          </p>
          <Link
            to="/contact"
            className="mt-8 inline-flex items-center gap-3 bg-white px-10 py-4 text-sm font-semibold uppercase tracking-[0.3em] text-slate-900 shadow-lg transition hover:bg-slate-100"
          >
            Join our network
          </Link>
        </div>
      </div>
    </div>
  )
}

