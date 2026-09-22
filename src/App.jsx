import { useEffect, useRef, useState } from 'react'
import { ArrowRightIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import costLogo from '/images/logo-white.svg'
import membersData from './data/members.json'
import { challenges, intendedOutcomes, workingGroups } from './data/proposal'
import EuropeMap from './components/EuropeMap'

const CONTACT_EMAIL = 'marco.cremaschi@unimib.it'
const container = 'mx-auto w-full max-w-6xl px-5 sm:px-8 lg:px-12'
const sectionSpace = 'py-14 sm:py-20'
const heading = 'text-3xl font-semibold tracking-tight sm:text-4xl'
const countryFlagCodes = {
  Belgium: 'be',
  'Bosnia and Herzegovina': 'ba',
  Bulgaria: 'bg',
  Cyprus: 'cy',
  'Czech Republic': 'cz',
  Germany: 'de',
  Ireland: 'ie',
  Italy: 'it',
  Lithuania: 'lt',
  Netherlands: 'nl',
  Poland: 'pl',
  Portugal: 'pt',
  Romania: 'ro',
  Serbia: 'rs',
  Slovakia: 'sk',
  Slovenia: 'si',
  Spain: 'es',
  Sweden: 'se',
  Switzerland: 'ch',
  Ukraine: 'ua',
}
const navigationLinks = [
  { id: 'proposal', label: 'Overview' },
  { id: 'working-groups', label: 'Working groups' },
  { id: 'outcomes', label: 'Expected outcomes' },
  { id: 'network', label: 'The network' },
]
const proponents = membersData
  .filter((member) => member.show)
  .sort((a, b) => a.surname.localeCompare(b.surname) || a.name.localeCompare(b.name))
const countries = Object.entries(proponents.reduce((counts, member) => {
  if (member.country) counts[member.country] = (counts[member.country] || 0) + 1
  return counts
}, {})).sort(([a], [b]) => a.localeCompare(b))
const countryNames = countries.map(([country]) => country)
const pendingMembers = membersData.filter((member) => !member.show).length

const glossary = [
  ['AI', 'Artificial intelligence'],
  ['A-PSY / B-INF', 'Psychology and clinical stream / informatics stream'],
  ['LLM', 'Large language model'],
  ['RAG', 'Retrieval-augmented generation'],
  ['KG', 'Knowledge graph'],
  ['FAIR', 'Findable, accessible, interoperable and reusable data'],
  ['ICD-11', 'International Classification of Diseases, 11th revision'],
  ['SNOMED', 'Systematized Nomenclature of Medicine'],
  ['DSS / EHR', 'Decision-support system / electronic health record'],
  ['UX / HCI', 'User experience / human–computer interaction'],
  ['ML / NLP / ASR', 'Machine learning / natural language processing / automatic speech recognition'],
  ['MLOps', 'Machine-learning operations'],
  ['STSM', 'Short-term scientific mission'],
  ['API', 'Application programming interface'],
]

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')
  const headerRef = useRef(null)
  const navRef = useRef(null)
  const menuButtonRef = useRef(null)

  useEffect(() => {
    let frame = 0
    const update = () => {
      const height = headerRef.current?.offsetHeight || 128
      document.documentElement.style.setProperty('--header-height', height + 'px')
      const current = navigationLinks.filter(({ id }) => {
        const element = document.getElementById(id)
        return element && element.getBoundingClientRect().top <= height + 60
      }).at(-1)
      setActiveSection(current?.id || 'hero')
    }
    const scheduleUpdate = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(update)
    }
    const observer = new ResizeObserver(scheduleUpdate)
    observer.observe(document.body)
    observer.observe(headerRef.current)
    window.addEventListener('scroll', scheduleUpdate, { passive: true })
    window.addEventListener('resize', scheduleUpdate)
    window.addEventListener('hashchange', scheduleUpdate)
    update()
    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
      window.removeEventListener('scroll', scheduleUpdate)
      window.removeEventListener('resize', scheduleUpdate)
      window.removeEventListener('hashchange', scheduleUpdate)
      document.documentElement.style.removeProperty('--header-height')
    }
  }, [])

  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 64rem)')
    const closeAtDesktop = () => {
      if (desktop.matches) setIsMenuOpen(false)
    }
    desktop.addEventListener('change', closeAtDesktop)
    return () => desktop.removeEventListener('change', closeAtDesktop)
  }, [])

  useEffect(() => {
    if (!isMenuOpen) return
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false)
        menuButtonRef.current?.focus()
      }
    }
    const onPointerDown = (event) => {
      if (!navRef.current?.contains(event.target)) setIsMenuOpen(false)
    }
    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('pointerdown', onPointerDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('pointerdown', onPointerDown)
    }
  }, [isMenuOpen])

  const linkClass = (id) => 'inline-flex min-h-12 items-center border-b-2 px-1 text-sm font-medium transition-colors ' +
      (activeSection === id
        ? 'border-secondary text-secondary'
        : 'border-transparent text-base-content/80 hover:text-secondary')

  return (
    <header ref={headerRef} className="sticky top-0 z-50 bg-base-100">
      <a href="#main" className="absolute left-5 top-3 z-50 -translate-y-40 rounded bg-base-100 px-4 py-3 font-semibold focus:translate-y-0">
        Skip to content
      </a>
      <div className="bg-neutral px-4 py-2.5 text-center text-xs leading-relaxed text-neutral-content sm:text-sm">
        COST Action proposal in preparation. <span className="whitespace-nowrap">Not yet approved.</span>
      </div>
      <nav
        ref={navRef}
        aria-label="Main navigation"
        className="relative border-b border-base-300"
        onBlur={(event) => {
          if (event.relatedTarget && !event.currentTarget.contains(event.relatedTarget)) setIsMenuOpen(false)
        }}
      >
        <div className={container + ' flex min-h-20 items-center justify-between gap-6'}>
          <a href="#hero" onClick={() => setIsMenuOpen(false)} className="py-3 text-xl font-bold tracking-tight" aria-label="DigInMind home">
            DigInMind<span className="text-secondary">.</span>
          </a>
          <div className="hidden items-center gap-7 lg:flex">
            {navigationLinks.map(({ id, label }) => (
              <a key={id} href={'#' + id} className={linkClass(id)} aria-current={activeSection === id ? 'location' : undefined}>
                {label}
              </a>
            ))}
          </div>
          <button
            ref={menuButtonRef}
            type="button"
            className="btn btn-ghost px-3 lg:hidden"
            aria-label={isMenuOpen ? 'Close navigation' : 'Open navigation'}
            aria-expanded={isMenuOpen}
            aria-controls="primary-navigation"
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            <span className="relative size-[22px] shrink-0" aria-hidden="true">
              <Bars3Icon className={'absolute inset-0 size-full transition-[opacity,transform] duration-200 ease-out ' + (isMenuOpen ? '-rotate-90 opacity-0' : 'rotate-0 opacity-100')} />
              <XMarkIcon className={'absolute inset-0 size-full transition-[opacity,transform] duration-200 ease-out ' + (isMenuOpen ? 'rotate-0 opacity-100' : 'rotate-90 opacity-0')} />
            </span>
            <span className="text-sm">Menu</span>
          </button>
        </div>
        <div id="primary-navigation" hidden={!isMenuOpen} className="mobile-navigation absolute inset-x-0 top-full border-b border-base-300 bg-base-100 lg:hidden">
          <div className={container + ' flex flex-col gap-2 py-4'}>
            {navigationLinks.map(({ id, label }) => (
              <a
                key={id}
                href={'#' + id}
                onClick={() => setIsMenuOpen(false)}
                className={linkClass(id)}
                aria-current={activeSection === id ? 'location' : undefined}
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </nav>
    </header>
  )
}

function Proposal() {
  return (
    <section id="proposal" tabIndex={-1} aria-labelledby="proposal-heading" className={'relative ' + sectionSpace}>
      {['mission', 'challenge', 'aim', 'vision'].map((id) => (
        <span key={id} id={id} data-anchor="" className="absolute top-0" />
      ))}
      <div className={container}>
        <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
          <div>
            <h2 id="proposal-heading" className={heading}>A shared foundation for responsible AI.</h2>
            <p className="mt-5 max-w-prose text-lg leading-relaxed text-base-content/80">
              DigInMind brings clinical expertise and informatics together to advance digital innovation in mental health.
            </p>
          </div>
          <div className="space-y-5 text-base leading-relaxed text-base-content/80">
            <p>
              Early diagnosis, differences in symptoms and unequal access to care are shared challenges across Europe.
              The proposed network will coordinate the knowledge and methods needed to address them.
            </p>
            <p>
              Its planned outputs include shared terminology, data protocols, evaluation tools, implementation guidance
              and training for responsible artificial intelligence (AI).
            </p>
            <p>
              These outputs are intended to enable better diagnostic tools, earlier intervention and more equitable care.
              Clinical deployment and product delivery are outside the Working Groups’ stated scope.
            </p>
          </div>
        </div>
        <dl className="mt-10 grid gap-8 border-y border-base-300 py-8 md:grid-cols-3">
          <div>
            <dt className="font-semibold">Common standards</dt>
            <dd className="mt-2 leading-relaxed text-base-content/80">A shared language, documented protocols and a registry of existing cohorts and tools.</dd>
          </div>
          <div>
            <dt className="font-semibold">Meaningful evaluation</dt>
            <dd className="mt-2 leading-relaxed text-base-content/80">Clinically relevant tasks, transparent benchmarks and guidance for safe use.</dd>
          </div>
          <div>
            <dt className="font-semibold">Responsible practice</dt>
            <dd className="mt-2 leading-relaxed text-base-content/80">Ethical frameworks, interdisciplinary training and accessible communication.</dd>
          </div>
        </dl>
        <details className="collapse collapse-arrow mt-6 rounded-none">
          <summary className="collapse-title pl-0 text-base font-semibold">Read the proposal background</summary>
          <div className="collapse-content px-0">
            <p className="max-w-prose leading-relaxed text-base-content/80">
              DigInMind stands for DIGital INnovation in Mental health for INtervention and Diagnosis.
              The proposal’s long-term vision is for digital innovation to complement human expertise
              and improve the accuracy, accessibility and personalisation of mental health care.
            </p>
            <div className="mt-8 max-w-prose">
              <div>
                <h3 className="text-lg font-semibold">The challenges</h3>
                <ul className="mt-4 space-y-5">
                  {challenges.map((challenge) => (
                    <li key={challenge.title}>
                      <h4 className="font-medium">{challenge.title}</h4>
                      <p className="mt-1 leading-relaxed text-base-content/80">{challenge.body}</p>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </div>
        </details>
      </div>
    </section>
  )
}

function WorkingGroups() {
  return (
    <section id="working-groups" tabIndex={-1} aria-labelledby="groups-heading" className={'bg-base-200 ' + sectionSpace}>
      <div className={container}>
        <h2 id="groups-heading" className={heading}>Five Working Groups. A shared framework.</h2>
        <p className="mt-5 max-w-prose text-lg leading-relaxed text-base-content/80">
          Five Working Groups connect psychology and clinical practice with informatics.
          Together they cover common standards, data protocols, evaluation, clinical workflows and responsible practice.
        </p>
        <p className="mt-4 max-w-prose leading-relaxed text-base-content/80">
          Each group is co-led by a clinical or psychology expert and an informatics expert.
          Joint working sessions connect the groups, while each retains responsibility for its own outputs.
        </p>
        <div className="mt-10 border-t border-base-300">
          {workingGroups.map((group, index) => (
            <details key={group.id} id={group.id} data-anchor="" className="collapse collapse-arrow overflow-visible rounded-none border-b border-base-300">
              <summary className="collapse-title py-6 pl-0 pr-10">
                <div className="grid gap-3 md:grid-cols-[1fr_1fr] md:gap-8">
                  <div>
                    <h3 className="text-xl font-semibold"><span className="text-secondary">WG{index + 1}</span> · {group.shortName}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-base-content/80">{group.audience}</p>
                  </div>
                  <p className="text-sm leading-relaxed text-base-content/80"><span className="font-semibold text-base-content">Planned outputs: </span>{group.output}</p>
                </div>
              </summary>
              <div className="collapse-content px-0">
                <p className="max-w-prose text-lg font-medium">{group.summary}</p>
                <p className="mt-4 max-w-prose leading-relaxed text-base-content/80">{group.purpose}</p>
                {[group.classificationNote, group.clinicalReasoningNote, group.evaluationNote, group.responsibleAINote]
                  .filter(Boolean).map((note) => <p key={note} className="mt-4 max-w-prose leading-relaxed text-base-content/80">{note}</p>)}
                <div className="mt-6 grid gap-6 md:grid-cols-2">
                  {group.streams.map((stream) => (
                    <div key={stream.label} className="border-t border-base-300 pt-5">
                      <h4 className="font-semibold">{stream.label === 'A-PSY' ? 'Psychology & clinical practice (A-PSY)' : 'Informatics (B-INF)'}</h4>
                      <p className="mt-2 leading-relaxed text-base-content/80">{stream.description}</p>
                    </div>
                  ))}
                </div>
                <dl className="mt-6 max-w-prose space-y-4 leading-relaxed">
                  <div><dt className="font-semibold">Relevant expertise</dt><dd className="mt-1 text-base-content/80">{group.participants}</dd></div>
                  <div><dt className="font-semibold">Connections with other groups</dt><dd className="mt-1 text-base-content/80">{group.interfaces}</dd></div>
                  <div><dt className="font-semibold">Outside this group’s scope</dt><dd className="mt-1 text-base-content/80">{group.outOfScope}</dd></div>
                </dl>
                <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 pb-3">

                  <a href="#terminology" className="inline-flex min-h-12 items-center text-sm font-medium text-secondary underline">Explain the terminology</a>
                </div>
              </div>
            </details>
          ))}
        </div>
        <details id="terminology" data-anchor="" className="collapse collapse-arrow mt-6 rounded-none">
          <summary className="collapse-title pl-0 text-base font-semibold">Terminology guide</summary>
          <div className="collapse-content px-0">
            <dl className="grid gap-x-10 gap-y-4 sm:grid-cols-2">
              {glossary.map(([term, meaning]) => (
                <div key={term}><dt className="font-semibold">{term}</dt><dd className="mt-1 text-sm leading-relaxed text-base-content/80">{meaning}</dd></div>
              ))}
            </dl>
          </div>
        </details>
      </div>
    </section>
  )
}

function Network() {
  return (
    <section id="network" tabIndex={-1} aria-labelledby="network-heading" className={sectionSpace}>
      <div className={container}>
        <h2 id="network-heading" className={heading}>A network across Europe.</h2>
        <p className="mt-5 max-w-prose text-lg leading-relaxed text-base-content/80">
          {proponents.length} confirmed proponents across {countries.length} countries bring clinical, academic and technical expertise.
          The network connects psychology, clinical practice, informatics and responsible-AI research.
        </p>
        <div className="mt-10 grid items-start gap-8 lg:grid-cols-[1.25fr_1fr]">
          <figure id="network-map" data-anchor="">
            <EuropeMap countriesWithMembers={countryNames} />
            <figcaption className="mt-3 text-sm leading-relaxed text-base-content/80">Highlighted countries have confirmed proponents in the proposal.</figcaption>
          </figure>
          <div>
            <h3 className="text-lg font-semibold">Countries represented</h3>
            <ul className="mt-4 grid gap-x-6 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              {countries.map(([country, count]) => (
                <li key={country} className="flex items-baseline justify-between gap-3 border-b border-base-300 py-2.5 text-sm">
                  <span>{country}</span><span className="whitespace-nowrap text-base-content/70 tabular-nums">{count} {count === 1 ? 'proponent' : 'proponents'}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <details className="collapse collapse-arrow mt-10 rounded-none border-y border-base-300">
          <summary className="collapse-title py-5 pl-0 text-lg font-semibold">Meet all {proponents.length} proponents</summary>
          <div className="collapse-content px-0">
            <ul className="grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
              {proponents.map((member) => (
                <li key={member.name + member.surname} className="relative border-t border-base-300 py-5 pr-12">
                  {countryFlagCodes[member.country] && (
                    <img
                      src={`https://flagcdn.com/${countryFlagCodes[member.country]}.svg`}
                      alt={`Flag of ${member.country}`}
                      width="32"
                      height="20"
                      loading="lazy"
                      className="absolute right-1 top-5 h-5 w-8 rotate-6 rounded-sm object-cover shadow-sm"
                    />
                  )}
                  <h3 className="font-semibold">{[member.title, member.name, member.surname].filter(Boolean).join(' ')}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-base-content/80">{member.affiliation}</p>
                  {member.department && <p className="mt-1 text-sm leading-relaxed text-base-content/80">{member.department}</p>}
                  <p className="mt-2 text-sm font-medium text-secondary">{member.country}</p>
                </li>
              ))}
            </ul>
            {pendingMembers > 0 && <p className="mt-4 text-sm text-base-content/80">{pendingMembers} additional proponents are in the invitation process.</p>}
          </div>
        </details>
      </div>
    </section>
  )
}

function Outcomes() {
  return (
    <section id="outcomes" tabIndex={-1} aria-labelledby="outcomes-heading" className={'dark-surface relative bg-neutral text-neutral-content ' + sectionSpace}>
      <span id="impact" data-anchor="" className="absolute top-0" />
      <div className={container + ' grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:gap-16'}>
        <div>
          <h2 id="outcomes-heading" className={heading}>Expected outcomes.</h2>
          <p className="mt-5 max-w-prose text-lg leading-relaxed text-neutral-content/85">
            Shared methods and responsible innovation, with better mental health care as the longer-term ambition.
          </p>
        </div>
        <div>
          <ul className="list-disc space-y-5 pl-5 text-base leading-relaxed text-neutral-content/90 marker:text-primary">
            {intendedOutcomes.map(({ title }) => <li key={title}>{title}</li>)}
          </ul>
          <p className="mt-7 max-w-prose text-sm leading-relaxed text-neutral-content/75">
            These are the proposal’s intended outcomes and longer-term contributions, rather than results already achieved.
            The Working Groups focus on shared resources, evaluation, guidance and training; clinical deployment and product delivery are outside their stated scope.
          </p>
        </div>
      </div>
    </section>
  )
}

export default function App() {
  useEffect(() => {
    // Native anchors preserve URL/history; open a disclosure for direct links too.
    const openHashTarget = (event) => {
      const id = window.location.hash.slice(1)
      const target = document.getElementById(id)
      if (target instanceof HTMLDetailsElement) {
        target.open = true
        target.scrollIntoView({ block: 'start', behavior: 'auto' })
      } else if (target && !event) {
        // A direct URL can load before React has mounted its anchor target.
        target.scrollIntoView({ block: 'start', behavior: 'auto' })
      }
    }
    const initialScroll = window.setTimeout(openHashTarget, 0)
    const onLoad = () => openHashTarget()
    window.addEventListener('load', onLoad)
    window.addEventListener('hashchange', openHashTarget)
    return () => {
      window.clearTimeout(initialScroll)
      window.removeEventListener('load', onLoad)
      window.removeEventListener('hashchange', openHashTarget)
    }
  }, [])

  return (
    <div className="min-h-screen bg-base-100 text-base-content">
      <Header />
      <main id="main" tabIndex={-1}>
        <section id="hero" tabIndex={-1} aria-labelledby="hero-heading" className="dark-surface relative isolate overflow-hidden bg-neutral py-12 text-neutral-content sm:py-16 lg:py-20">
          <img
            src={`${import.meta.env.BASE_URL}images/hero-background.jpg`}
            alt=""
            width="1672"
            height="941"
            fetchPriority="high"
            aria-hidden="true"
            className="hero-artwork absolute inset-0 -z-20 h-full w-full object-cover object-[75%_center] opacity-70 sm:object-center"
          />
          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-neutral/50 sm:bg-neutral/30" />
          <div className={container}>
            <h1 id="hero-heading" className="max-w-4xl text-4xl font-semibold leading-[1.12] tracking-tight sm:text-5xl lg:text-6xl">
              Digital innovation<br /><span className="text-primary">in mental health.</span>
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-neutral-content/85 sm:text-lg">
              A COST Action proposal connecting psychology, clinical practice and informatics to advance responsible artificial intelligence for diagnosis and intervention.
            </p>
            <div className="mt-7 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-6">
              <a href="#proposal" className="group btn cta px-6">Explore the proposal <ArrowRightIcon className="size-5 shrink-0 transition-transform duration-150 ease-out group-hover:translate-x-1 group-focus-visible:translate-x-1" aria-hidden="true" /></a>
              <a href="#working-groups" className="inline-flex min-h-12 items-center gap-2 font-medium underline decoration-neutral-content/40 hover:decoration-neutral-content">
                View working groups
              </a>
            </div>
            <div className="mt-9 flex flex-col gap-6 border-t border-neutral-content/25 pt-6 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-xl text-sm leading-relaxed text-neutral-content/80">
                <strong className="font-semibold text-neutral-content">{proponents.length} proponents</strong> across <strong className="font-semibold text-neutral-content">{countries.length} countries</strong>.
                {' '}Five Working Groups. Clinical and technical expertise, connected.
              </p>
              <img src={costLogo} alt="COST — European Cooperation in Science and Technology" width="146" height="72" className="h-14 w-auto self-start object-contain sm:h-16" />
            </div>
          </div>
        </section>
        <Proposal />
        <WorkingGroups />
        <Outcomes />
        <Network />
      </main>
      <footer id="solution" tabIndex={-1} data-anchor="" className="border-t border-base-300 py-8">
        <div className={container + ' flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between'}>
          <div><a href="#hero" className="inline-flex min-h-11 items-center font-semibold">DigInMind</a><p className="text-sm text-base-content/70">© {new Date().getFullYear()} · COST Action proposal</p><p className="mt-2 text-sm text-base-content/80">Dr Marco Cremaschi · <a href={"mailto:" + CONTACT_EMAIL} className="break-all underline">{CONTACT_EMAIL}</a></p></div>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
            <a href={"mailto:" + CONTACT_EMAIL + "?subject=DigInMind%20proposal"} className="inline-flex min-h-11 items-center font-medium underline">Contact the proposal team</a>
            <a href="https://www.cost.eu/" className="inline-flex min-h-11 items-center underline">About COST</a>
            <a href="#hero" className="inline-flex min-h-11 items-center underline">Back to top</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
