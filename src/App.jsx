import { useEffect, useMemo, useState } from 'react'
import { geoPath, geoMercator, geoCentroid, geoBounds } from 'd3'
import { feature } from 'topojson-client'
import countriesTopology from 'world-atlas/countries-110m.json'
import { ArrowRight, ArrowDown, Brain, Users, Globe, Lightbulb, AlertTriangle, Target, Network, Microscope, Heart, Mail, MapPin, AlertCircle, Menu, X } from 'lucide-react'
import costLogo from '/images/logo-white.svg'
import membersData from './data/members.json'

const MAP_WIDTH = 760
const MAP_HEIGHT = 520

const COUNTRY_NAME_NORMALISERS = new Map([
  ['Macedonia', 'North Macedonia'],
  ['Bosnia and Herz.', 'Bosnia and Herzegovina'],
  ['Czechia', 'Czech Republic'],
])

const getDisplayCountryName = (name) => COUNTRY_NAME_NORMALISERS.get(name) ?? name

const EUROPEAN_COUNTRY_NAMES = new Set([
  'Albania',
  'Armenia',
  'Austria',
  'Azerbaijan',
  'Belarus',
  'Belgium',
  'Bosnia and Herz.',
  'Bulgaria',
  'Croatia',
  'Cyprus',
  'Czechia',
  'Denmark',
  'Estonia',
  'Finland',
  'France',
  'Georgia',
  'Germany',
  'Greece',
  'Hungary',
  'Iceland',
  'Ireland',
  'Italy',
  'Kosovo',
  'Latvia',
  'Lithuania',
  'Luxembourg',
  'Macedonia',
  'Malta',
  'Moldova',
  'Montenegro',
  'Netherlands',
  'Norway',
  'Poland',
  'Portugal',
  'Romania',
  'Russia',
  'Serbia',
  'Slovakia',
  'Slovenia',
  'Spain',
  'Sweden',
  'Switzerland',
  'Turkey',
  'Ukraine',
  'United Kingdom',
])

const EUROPE_BOUNDARY = {
  minLatitude: 32,
  maxLatitude: 72,
  minLongitude: -25,
  maxLongitude: 45,
}

const bannerAnimationStyles = `
  @keyframes banner-marquee {
    0% {
      transform: translateX(100%);
    }
    100% {
      transform: translateX(-100%);
    }
  }

  .banner-marquee {
    animation: banner-marquee 28s linear infinite;
    will-change: transform;
  }
`

function EuropeMap({ countriesWithMembers }) {
  const { countries, matchedParticipants } = useMemo(() => {
    const participatingCountries = new Set(countriesWithMembers)

    const worldFeatures = feature(countriesTopology, countriesTopology.objects.countries).features
    const europeanFeatures = worldFeatures.filter(({ properties, geometry }) => {
      if (!EUROPEAN_COUNTRY_NAMES.has(properties.name)) {
        return false
      }

      const bounds = geoBounds({ type: 'Feature', geometry, properties })
      const [[minLon, minLat], [maxLon, maxLat]] = bounds

      return (
        maxLon >= EUROPE_BOUNDARY.minLongitude &&
        minLon <= EUROPE_BOUNDARY.maxLongitude &&
        maxLat >= EUROPE_BOUNDARY.minLatitude &&
        minLat <= EUROPE_BOUNDARY.maxLatitude
      )
    })

    const foundParticipants = new Map(
      europeanFeatures
        .filter(({ properties }) => participatingCountries.has(getDisplayCountryName(properties.name)))
        .map((featureItem) => [featureItem.properties.name, featureItem]),
    )

    return {
      countries: europeanFeatures,
      matchedParticipants: foundParticipants,
    }
  }, [countriesWithMembers])

  const projection = useMemo(() => {
    const projectionInstance = geoMercator()
    const focusFeatures = matchedParticipants.size > 0 ? Array.from(matchedParticipants.values()) : countries

    if (focusFeatures.length > 0) {
      const featureCollection = { type: 'FeatureCollection', features: focusFeatures }
      const padding = matchedParticipants.size > 0 ? 60 : 28
      projectionInstance.fitExtent(
        [
          [padding, padding],
          [MAP_WIDTH - padding, MAP_HEIGHT - padding],
        ],
        featureCollection,
      )
    } else {
      projectionInstance
        .center([20, 55])
        .scale(600)
        .translate([MAP_WIDTH / 2, MAP_HEIGHT / 2])
    }

    return projectionInstance
  }, [countries, matchedParticipants])

  const pathGenerator = useMemo(() => geoPath(projection), [projection])

  const markers = useMemo(() => {
    return Array.from(matchedParticipants.values())
      .map((countryFeature) => {
        const centroid = geoCentroid(countryFeature)
        const coordinates = projection(centroid)

        if (!coordinates || Number.isNaN(coordinates[0]) || Number.isNaN(coordinates[1])) {
          return null
        }

        return {
          name: countryFeature.properties.name,
          coordinates,
        }
      })
      .filter(Boolean)
  }, [matchedParticipants, projection])

  return (
    <svg
      viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`}
      role="img"
      aria-label="Map of Europe highlighting participating countries"
      className="w-full"
    >
      <defs>
        <linearGradient id="europe-map-background" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#020617" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#0f172a" stopOpacity="0.9" />
        </linearGradient>
      </defs>

      <rect width={MAP_WIDTH} height={MAP_HEIGHT} fill="url(#europe-map-background)" />

      {countries.map((countryFeature) => {
        const path = pathGenerator(countryFeature)

        if (!path) {
          return null
        }

        const countryName = countryFeature.properties.name
        const isHighlighted = matchedParticipants.has(countryName)
        const label = getDisplayCountryName(countryName)

        return (
          <path
            key={countryName}
            d={path}
            fill={isHighlighted ? '#3b82f6' : '#64748b'}
            fillOpacity={isHighlighted ? 0.9 : 0.45}
            stroke="#f1f5f9"
            strokeOpacity={0.3}
            strokeWidth={0.6}
          >
            <title>{label}</title>
          </path>
        )
      })}

    </svg>
  )
}

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

// Banner component for proposal status context
function Banner() {
  return (
    <div className="bg-gradient-to-r from-blue-950 via-indigo-900 to-blue-950 text-white text-opacity-85 overflow-hidden">
      <style>{bannerAnimationStyles}</style>
      <div className="mx-auto max-w-7xl overflow-hidden px-4 py-3">
        <div className="banner-marquee flex items-center justify-center gap-3 text-xs font-medium uppercase tracking-[0.35em]">
          <AlertCircle className="h-4 w-4 flex-shrink-0 text-white text-opacity-60" />
          <p className="text-center whitespace-nowrap">
            This website presents a COST Action proposal currently under preparation. The network is not yet approved.
          </p>
        </div>
      </div>
    </div>
  )
}

// Header component with scroll-spy behavior
function Header() {
  const navigation = useMemo(
    () => [
      { id: 'hero', label: 'Home' },
      { id: 'mission', label: 'Mission' },
      { id: 'proposal', label: 'Proposal' },
      { id: 'challenge', label: 'Challenge' },
      { id: 'aim', label: 'Our Aim' },
      { id: 'impact', label: 'Impact' },
      { id: 'working-groups', label: 'Working Groups' },
      { id: 'solution', label: 'Join Us' },
      { id: 'vision', label: 'Vision' },
    ],
    [],
  )

  const [activeSection, setActiveSection] = useState('hero')
  const [isMenuOpen, setIsMenuOpen] = useState(false)

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

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 640) {
        setIsMenuOpen(false)
      }
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const linkClasses = (id) =>
    id === activeSection
      ? 'text-blue-600'
      : 'text-slate-500 hover:text-slate-900'

  return (
    <header className="relative z-40 bg-white bg-opacity-80 backdrop-blur shadow-md">
      <nav className="relative mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a
          href="#hero"
          onClick={(event) => {
            event.preventDefault()
            smoothScrollTo('hero')
            setIsMenuOpen(false)
          }}
          className="text-lg font-semibold tracking-[0.3em] text-slate-900"
        >
          DigInMind
        </a>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded bg-white px-3 py-2 text-slate-700 shadow-sm transition hover:bg-slate-100 sm:hidden"
          aria-expanded={isMenuOpen}
          aria-controls="primary-navigation"
          onClick={() => setIsMenuOpen((previous) => !previous)}
        >
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>

        <div className="hidden items-center gap-8 text-xs font-semibold uppercase tracking-[0.3em] text-slate-600 sm:flex">
          {navigation.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={(event) => {
                event.preventDefault()
                smoothScrollTo(id)
                setIsMenuOpen(false)
              }}
              className={`pb-1 transition ${linkClasses(id)}`}
            >
              {label}
            </a>
          ))}
        </div>

        <div
          id="primary-navigation"
          className={`absolute left-0 right-0 top-full bg-white/95 backdrop-blur transition duration-200 sm:hidden ${
            isMenuOpen ? 'pointer-events-auto translate-y-0 opacity-100' : 'pointer-events-none -translate-y-2 opacity-0'
          }`}
        >
          <div className="flex flex-col gap-3 px-4 py-4 text-xs font-semibold uppercase tracking-[0.25em] text-slate-700">
            {navigation.map(({ id, label }) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={(event) => {
                  event.preventDefault()
                  smoothScrollTo(id)
                  setIsMenuOpen(false)
                }}
                className={`block py-2 transition ${linkClasses(id)}`}
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

// Footer component with contact links
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
                <a href="https://www.cost.eu" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 bg-white/10 px-4 py-3 text-white/85 shadow-sm transition hover:bg-white/15">
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

  const uniqueCountriesWithMembers = useMemo(() => {
    const counts = membersData.reduce((accumulator, member) => {
      const displayName = getDisplayCountryName(member.country)
      if (!accumulator.has(displayName)) {
        accumulator.set(displayName, 0)
      }

      accumulator.set(displayName, accumulator.get(displayName) + 1)
      return accumulator
    }, new Map())

    return Array.from(counts.entries())
      .map(([country, count]) => ({ country, count }))
      .sort((a, b) => a.country.localeCompare(b.country))
  }, [])

  const participatingCountries = useMemo(
    () => uniqueCountriesWithMembers.map(({ country }) => country),
    [uniqueCountriesWithMembers],
  )

  const membersCount = useMemo(() => membersData.length, [])
  const countriesCount = participatingCountries.length

  const stats = useMemo(
    () => [
      { value: membersCount, suffix: '', label: 'Actual members' },
      { value: countriesCount, suffix: '', label: 'Countries represented' },
      { value: 4, suffix: '', label: 'Focus domains' },
    ],
    [membersCount, countriesCount],
  )

  // Shared layout utilities keep section spacing and copy styling consistent
  const containerClasses = 'mx-auto w-full max-w-5xl px-6 sm:px-10 lg:px-12'
  const sectionSpacing = 'py-24'
  const narrativeClasses = 'mt-12 space-y-6 text-lg sm:text-xl leading-relaxed text-slate-700'
  const cardSurface = 'group text-left shadow-sm transition hover:-translate-y-1 hover:shadow-lg'
  const cardPadding = 'p-8 sm:p-10'
  const cardInnerSpacing = 'space-y-6'
  const cardLabelStyles = 'flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em]'
  const cardTitleStyles = 'text-lg font-semibold'
  const cardBodyStyles = 'text-sm leading-relaxed'

  // Precomputed content collections keep the JSX declarative and readable
  const proponents = useMemo(
    () =>
      membersData
        .filter(({ role, show }) =>
          Boolean(show) && (role === 'Main Proponent' || role === 'Proponent'),
        )
        .sort((first, second) => {
          if (first.role === second.role) {
            return first.name.localeCompare(second.name)
          }

          return first.role === 'Main Proponent' ? -1 : 1
        })
        .map(({ name, affiliation, department }) => ({
          name,
          institution: affiliation,
          description: department ?? null,
        })),
    [],
  )

  const featureCards = useMemo(
    () => [
      {
        icon: Brain,
        iconColor: 'text-brand-cerulean',
        label: 'Innovation pillar',
        title: 'AI-assisted innovation',
        body: 'Leveraging artificial intelligence for enhanced diagnostic accuracy and early intervention.',
      },
      {
        icon: Users,
        iconColor: 'text-teal-500',
        label: 'Network pillar',
        title: 'Interdisciplinary network',
        body: 'Connecting psychologists, clinicians, and computer scientists across disciplines.',
      },
      {
        icon: Globe,
        iconColor: 'text-indigo-500',
        label: 'Reach pillar',
        title: 'Pan-European reach',
        body: 'Building collaboration across European countries and research institutions.',
      },
      {
        icon: Lightbulb,
        iconColor: 'text-amber-500',
        label: 'Impact pillar',
        title: 'Accessible solutions',
        body: 'Developing tools to make mental health support more accessible to all communities.',
      },
    ],
    [],
  )

  const challengeCards = useMemo(
    () => [
      {
        icon: AlertTriangle,
        iconColor: 'text-brand-cerulean',
        label: 'Barrier',
        title: 'Early diagnosis difficulties',
        body: 'Mental health conditions often go undetected until they reach advanced stages, missing crucial windows for early intervention and prevention.',
      },
      {
        icon: Microscope,
        iconColor: 'text-indigo-400',
        label: 'Barrier',
        title: 'Symptom variability',
        body: 'Mental health symptoms manifest differently across individuals, cultures, and contexts, making standardised diagnosis challenging.',
      },
      {
        icon: MapPin,
        iconColor: 'text-emerald-500',
        label: 'Barrier',
        title: 'Access barriers',
        body: 'Limited resources, geographic disparities, and stigma create significant obstacles to accessing timely mental health support and treatment.',
      },
    ],
    [],
  )

  const aimPillars = useMemo(
    () => [
      {
        icon: Network,
        iconColor: 'text-brand-cerulean',
        label: 'Interdisciplinary cohesion',
        title: 'Build an interdisciplinary network',
        body: 'Connect researchers, clinicians, psychologists, computer scientists, data scientists, and ethicists across Europe to foster knowledge exchange and collaborative research.',
      },
      {
        icon: Microscope,
        iconColor: 'text-teal-500',
        label: 'Technological innovation',
        title: 'Develop AI-assisted diagnostic tools',
        body: 'Create innovative, evidence-based AI technologies that enhance diagnostic accuracy, support early detection, and provide personalised intervention recommendations while maintaining ethical standards.',
      },
      {
        icon: Heart,
        iconColor: 'text-rose-500',
        label: 'Patient-centred care',
        title: 'Improve early intervention',
        body: 'Enable timely identification of mental health challenges and facilitate rapid access to appropriate care, ultimately reducing the burden on individuals and healthcare systems.',
      },
      {
        icon: Users,
        iconColor: 'text-amber-500',
        label: 'Equitable access',
        title: 'Promote accessibility and equity',
        body: 'Ensure that digital mental health solutions are accessible, culturally appropriate, and beneficial to diverse populations across Europe, regardless of geographic or socioeconomic barriers.',
      },
    ],
    [],
  )

  const outcomeHighlights = useMemo(
    () => [
      {
        icon: Target,
        iconColor: 'text-brand-cerulean',
        title: 'Enhanced diagnostic accuracy through AI-powered assessment tools.',
      },
      {
        icon: Target,
        iconColor: 'text-teal-500',
        title: 'Reduced waiting times for mental health assessments and interventions.',
      },
      {
        icon: Target,
        iconColor: 'text-indigo-500',
        title: 'Cross-border knowledge sharing and best practice development.',
      },
      {
        icon: Target,
        iconColor: 'text-amber-500',
        title: 'Training opportunities for early-career researchers in digital mental health.',
      },
      {
        icon: Target,
        iconColor: 'text-rose-500',
        title: 'Ethical frameworks for responsible AI use in mental health care.',
      },
    ],
    [],
  )

  const workingGroups = useMemo(
    () => [
      {
        id: 'wg1',
        name: 'WG1 — Terminology, Standards & Interoperability (AI-ready)',
        purpose:
          'Establish the common language and technical foundations so all partners can describe mental-health phenomena and datasets in compatible ways, and AI systems (LLMs/RAG/KGs) can be audited, traced and integrated safely.',
        classificationNote:
          'In psychiatry, multiple classification systems coexist, and experts often disagree on diagnostic boundaries or construct definitions. To ensure conceptual consistency and interoperability, this Action adopts the ICD-11 framework as its primary reference. ICD-11 offers globally standardized terminology, dimensional specifiers aligned with current clinical practice, and digital compatibility that facilitates integration with AI-ready knowledge representations.',
        streams: [
          {
            label: 'A-PSY',
            description:
              'Curate a clinically grounded Open Glossary (ICD-11 constructs, symptom clusters, outcomes), define Minimal Clinical Dataset elements and consent language understandable to patients and clinicians.',
          },
          {
            label: 'B-INF',
            description:
              'Specify Knowledge-Graph (KG) schema & ontology mappings (ICD-11/SNOMED/etc.), FAIR metadata profiles, and LLM artefact standards (prompt/trace logging, data sheets, model cards, RAG citation fields).',
          },
        ],
        participants: 'Clinical taxonomists, psychometricians, health-informatics and semantic-web engineers, data stewards.',
        interfaces: 'Other WGs consult the glossary/standards; no joint tasks.',
        outOfScope: 'Running acquisition studies, building benchmarks, or doing pilots.',
      },
      {
        id: 'wg2',
        name: 'WG2 — Acquisition Protocols & Cohort Registry (LLM/KG-friendly)',
        purpose:
          'Harmonise how data are captured and documented (clinical, psychometric, speech/conversation, paralinguistics), and catalogue existing cohorts/tools so teams can align methods without sharing raw data.',
        streams: [
          {
            label: 'A-PSY',
            description:
              'Produce a Protocol Compendium for clinical/psychometric/speech elicitation; define annotation guides (turn-level intents, affect, uncertainty, clinician rationales) with inter-rater procedures.',
          },
          {
            label: 'B-INF',
            description:
              'Deliver a Registry Portal & API (cohorts, measures, tools) and a KG Population Playbook to transform registry metadata into a KG (provenance included). No new data collection.',
          },
        ],
        participants: 'Clinicians, speech scientists, annotators, data managers, software engineers.',
        interfaces: 'WG3 may reference registry metadata to design tasks; WG1 standards are consulted.',
        outOfScope: 'Conducting clinical pilots.',
      },
      {
        id: 'wg3',
        name: 'WG3 — Tasks, Metrics & Benchmark Design (AI/LLM focus)',
        purpose:
          'Define what good looks like for mental-health AI by specifying reference tasks, metrics (factuality, faithfulness, calibration, bias/fairness, robustness, multilinguality, speech), and baseline suites for LLM/RAG/KG methods.',
        clinicalReasoningNote:
          'Map the clinical reasoning chain from patient presentation to diagnosis, from diagnosis to treatment decision, and from intervention to outcome assessment, across three high-pressure settings: emergency departments, general psychiatry outpatient clinics, and primary care. Identify critical points and failure modes in this chain that may compromise diagnostic accuracy or treatment appropriateness. Define current gold standards for diagnostic and therapeutic decision-making, and specify how AI-based systems could support clinicians in improving consistency, timeliness, and quality of care.',
        streams: [
          {
            label: 'A-PSY',
            description:
              'Specify clinically meaningful tasks (screening, differential triage, longitudinal monitoring), inclusion/exclusion and gold-standard labelling; define fairness constructs and outcome measures.',
          },
          {
            label: 'B-INF',
            description:
              'Deliver a Metric Pack & Evaluation Toolkit (docs + test sets), Challenge Rulebook (reproducibility, privacy, safety), and public leaderboards with transparent baselines (where permissible).',
          },
        ],
        participants: 'Clinical methodologists, evaluation scientists, ML/NLP/ASR researchers, benchmark curators.',
        interfaces: 'May consult WG1/2 documents; publishes reports that others can read.',
        outOfScope: 'Executing hospital pilots/implementations.',
      },
      {
        id: 'wg4',
        name: 'WG4 — Implementation Guidelines & Clinical Workflow Integration (AI systems)',
        purpose:
          'Turn standards and benchmarks into actionable guidance for safe, usable AI-assisted DSS in emergency departments, primary care and community mental-health centres without building products.',
        evaluationNote:
          'Evaluate whether and how AI-based models developed within the Action effectively enhance clinical performance, by assessing their impact on diagnostic accuracy, decision-making quality, and time efficiency in simulated environments replicating real-world workflows.',
        streams: [
          {
            label: 'A-PSY',
            description:
              'Create UX heuristics for clinicians/patients, cognitive-load and acceptability checklists, safety & escalation pathways (human-in-the-loop).',
          },
          {
            label: 'B-INF',
            description:
              'Publish reference architectures (on-prem/edge, hybrid-cloud) for RAG over EHR with KG back-ends, prompt governance & guardrails, monitoring (drift, performance, safety) and auditability.',
          },
        ],
        participants: 'Clinicians with service-design interest, HCI/UX researchers, health-IT architects, MLOps engineers.',
        interfaces: 'Consumes WG1 standards as inputs on paper; shares guidance that others may read.',
        outOfScope: 'Defining standards (WG1) or benchmark metrics (WG3); no site deployments/pilots.',
      },
      {
        id: 'wg5',
        name: 'WG5 — Ethics, Policy, Training & Communication (Responsible AI)',
        purpose:
          'Ensure responsible AI across the Action: ethics, legal and social implications; governance models; capacity-building (Training Schools/STSMs) for both communities; clear communication to clinicians, patients and policymakers.',
        responsibleAINote:
          'Expand responsible-AI activities to include post-deployment monitoring frameworks that assess ethical, clinical, and social impacts over time (“ethics in use”). Strengthen patient involvement through co-creation of communication and training materials, ensuring that AI explainability tools and consent information are accessible, transparent, and sensitive to stigma and cultural diversity.',
        streams: [
          {
            label: 'A-PSY',
            description:
              'Develop risk scenarios for mental-health AI (consent, stigma, harm mitigation, accessibility), clinician-facing training and patient communication toolkits.',
          },
          {
            label: 'B-INF',
            description:
              'Define AI governance & model-risk tiers (documentation, logging, approvals), procurement policy briefs, and technical training on LLM/RAG/KG safety & evaluation.',
          },
        ],
        participants: 'Bioethicists, clinicians, legal scholars, standards liaisons, safety/assurance engineers, science communicators.',
        interfaces: 'Provides documents and training offers usable by all; no cross-WG tasking.',
        outOfScope: 'Writing technical standards (WG1), acquisition protocols (WG2), or metric design (WG3).',
      },
    ],
    [],
  )

  return (
    <div className="flex min-h-screen flex-col bg-brand-cloud text-brand-ink">
      <div className="sticky top-0 z-50">
        <Banner />
        <Header />
      </div>
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

            <div className={`${containerClasses} relative`}>
              <div className="space-y-12">
                {/* Titolo esteso allineato a sinistra */}
                <div>
                  <div className="mb-8 flex items-center gap-4 text-xs font-semibold uppercase tracking-[0.35em] text-white/60">
                    <span className="h-px flex-1 bg-white/35" />
                    <span>COST Action Proposal</span>
                    <span className="h-px flex-1 bg-white/35" />
                  </div>
                  <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-white text-left">
                    <span className="text-amber-400">DigInMind</span>: DIGital INnovation in Mental health for INtervention and Diagnosis
                  </h1>
                </div>

                {/* Due colonne: descrizione e metriche a sinistra, logo a destra */}
                <div className="grid gap-12 lg:grid-cols-[1fr_auto] lg:items-start">
                  <div className="space-y-8">
                    <p className="text-base sm:text-lg md:text-xl text-white/75 text-left">
                      We unite clinicians, researchers, and technologists to accelerate ethical, data-driven tools that improve early detection, personalised interventions, and equitable access to mental health support across Europe.
                    </p>
                    <div className="grid gap-6 sm:grid-cols-3">
                      {stats.map((stat) => (
                        <AnimatedStat key={stat.label} value={stat.value} suffix={stat.suffix} label={stat.label} />
                      ))}
                    </div>
                    <div className="flex">
                      <a
                        href="#proposal"
                        onClick={(event) => {
                          event.preventDefault()
                          smoothScrollTo('proposal')
                        }}
                        className="inline-flex items-center gap-3 bg-white px-8 py-3 text-base font-semibold uppercase tracking-[0.2em] text-slate-900 shadow-lg transition hover:bg-slate-100"
                      >
                        Explore the proposal
                        <ArrowDown className="h-5 w-5" />
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex justify-center lg:justify-end">
                    <img src={costLogo} alt="COST Association logo" className="h-24 w-auto" />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Mission Statement */}
          <section id="mission" className={`bg-white ${sectionSpacing}`}>
            <div className={`${containerClasses} space-y-8`}>
              <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">Mission Statement</h2>
              <div className={`${narrativeClasses} text-left`}>
                <p>Mental health challenges are rising across Europe, yet early diagnosis and intervention remain limited by resource constraints and diagnostic complexity.</p>
                <p>DigInMind aims to build a collaborative European network that bridges clinical expertise with cutting-edge technological innovation.</p>
                <p>By bringing together diverse disciplines, we seek to develop AI-assisted tools for more accurate, accessible, and timely mental health support, ultimately improving outcomes for individuals and communities across the continent.</p>
              </div>
            </div>
          </section>

          {/* Proponents */}
          <section className={`bg-white ${sectionSpacing}`}>
            <div className={`${containerClasses} space-y-8`}>
              <div className="text-left">
                <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">Proponents</h2>
                <p className="mt-4 text-base text-slate-600">
                  A core group anchors the network with clinical, academic, and technical leadership.
                </p>
              </div>
              <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {proponents.map((proponent) => (
                  <article key={proponent.name} className={`${cardSurface} bg-slate-50 px-5 py-5 sm:px-4 sm:py-4`}>
                    <div className="space-y-3">
                      <h3 className="text-base font-semibold leading-tight text-slate-900">{proponent.name}</h3>
                      <p className="text-[0.65rem] font-semibold uppercase tracking-[0.28em] leading-relaxed text-slate-500">{proponent.institution}</p>
                      {proponent.description ? (
                        <p className="text-xs leading-snug text-slate-600">{proponent.description}</p>
                      ) : null}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* Key Features */}
          <section id="proposal" className={`bg-gradient-to-b from-slate-100 via-white to-slate-100 ${sectionSpacing}`}>
            <div className={`${containerClasses} space-y-8`}>
              <div className="text-left">
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-blue-600">Strategic pillars</p>
                <h2 className="mt-4 text-3xl font-bold text-slate-900 sm:text-4xl">Why DigInMind?</h2>
              </div>

              <div className="mt-16 grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
                {featureCards.map(({ icon: Icon, iconColor, label, title, body }) => (
                  <article key={title} className={`${cardSurface} bg-slate-50 ${cardPadding}`}>
                    <div className={cardInnerSpacing}>
                      <div className={`${cardLabelStyles} text-slate-500`}>
                        <Icon className={`h-5 w-5 ${iconColor}`} />
                        <span className="text-slate-500">{label}</span>
                      </div>
                      <h3 className={`${cardTitleStyles} text-slate-900`}>{title}</h3>
                      <p className={`${cardBodyStyles} text-slate-600`}>{body}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* The challenge */}
          <section id="challenge" className={`bg-slate-950 ${sectionSpacing}`}>
            <div className={`${containerClasses} space-y-8 text-white`}>
              <div className="text-left">
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/60">Problem framing</p>
                <h2 className="mt-4 text-3xl font-bold sm:text-4xl">The challenge</h2>
              </div>

              <div className={`${narrativeClasses} text-white/80`}
              >
                <p>Mental health disorders represent one of Europe&apos;s most pressing public health challenges, affecting millions of individuals and their families. Despite significant advances in clinical psychology and psychiatry, several critical barriers continue to impede effective care:</p>

                <div className="mt-12 grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
                  {challengeCards.map(({ icon: Icon, iconColor, label, title, body }) => (
                    <article
                      key={title}
                      className={`${cardSurface} ${cardPadding} bg-white/5 text-white/80 shadow-lg backdrop-blur hover:bg-white/10`}
                    >
                      <div className={cardInnerSpacing}>
                        <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-white/60">
                          <Icon className={`h-5 w-5 ${iconColor}`} />
                          <span className="text-white/70">{label}</span>
                        </div>
                        <h3 className="text-lg font-semibold text-white">{title}</h3>
                        <p className="text-sm leading-relaxed text-white/75">{body}</p>
                      </div>
                    </article>
                  ))}
                </div>

                <p>These challenges are compounded by the growing demand for mental health services, workforce shortages, and the need for culturally sensitive, evidence-based interventions. Traditional approaches alone cannot address the scale and complexity of this crisis.</p>
              </div>
            </div>
          </section>

          {/* Our aim */}
          <section id="aim" className={`bg-white ${sectionSpacing}`}>
            <div className={`${containerClasses} space-y-8`}>
              <div className="text-left">
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-blue-600">Our mission</p>
                <h2 className="mt-4 text-3xl font-bold text-slate-900 sm:text-4xl">Our aim</h2>
              </div>

              <div className={narrativeClasses}>
                <p>DigInMind aims to establish a transformative pan-European network that harnesses the power of digital innovation to revolutionise mental health care. Our mission is to create a collaborative ecosystem where clinical expertise meets technological advancement.</p>

                <div className="mt-14 grid gap-10 lg:grid-cols-2">
                  {aimPillars.map(({ icon: Icon, iconColor, label, title, body }) => (
                    <article key={title} className={`${cardSurface} bg-slate-50 ${cardPadding}`}>
                      <div className={cardInnerSpacing}>
                        <div className={`${cardLabelStyles} text-slate-500`}>
                          <Icon className={`h-5 w-5 ${iconColor}`} />
                          <span className="text-slate-500">{label}</span>
                        </div>
                        <h3 className={`${cardTitleStyles} text-slate-900`}>{title}</h3>
                        <p className={`${cardBodyStyles} text-slate-600`}>{body}</p>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Impact */}
          <section id="impact" className={`bg-gradient-to-b from-white to-slate-100 ${sectionSpacing}`}>
            <div className={`${containerClasses} space-y-8 text-left`}>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-blue-600">What success unlocks</p>
              <h2 className="mt-4 text-3xl font-bold text-slate-900 sm:text-4xl">Expected outcomes</h2>

              <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {outcomeHighlights.map(({ icon: Icon, iconColor, title }) => (
                  <article key={title} className={`${cardSurface} bg-slate-50 ${cardPadding}`}>
                    <div className={cardInnerSpacing}>
                      <Icon className={`h-6 w-6 ${iconColor}`} />
                      <p className="text-sm text-slate-600">{title}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* Working groups */}
          <section id="working-groups" className={`bg-white ${sectionSpacing}`}>
            <div className={`${containerClasses} space-y-8 text-left`}>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-blue-600">Working structure</p>
              <h2 className="mt-4 text-3xl font-bold text-slate-900 sm:text-4xl">Working Groups</h2>
              <p className="text-lg text-slate-700">
                Five coordinated Working Groups deliver DigInMind outputs through dedicated psychology (A-PSY) and informatics (B-INF) streams, ensuring that every activity pairs informatics and psychological expertise from design through delivery.
              </p>

              <div className="mt-16 grid grid-cols-1 gap-10">
                {workingGroups.map(
                  ({
                    id,
                    name,
                    purpose,
                    classificationNote,
                    clinicalReasoningNote,
                    evaluationNote,
                    responsibleAINote,
                    streams,
                    participants,
                    interfaces,
                    outOfScope,
                  }) => (
                  <article key={id} className={`${cardSurface} bg-slate-50 ${cardPadding}`}>
                    <div className={cardInnerSpacing}>
                      <h3 className="text-xl font-semibold text-slate-900">{name}</h3>
                      <p className={`${cardBodyStyles} text-slate-600`}>{purpose}</p>
                      {classificationNote ? (
                        <p className={`${cardBodyStyles} text-blue-700 bg-blue-50 px-4 py-3`}>{classificationNote}</p>
                      ) : null}
                      {clinicalReasoningNote ? (
                        <p className={`${cardBodyStyles} text-blue-700 bg-blue-50 px-4 py-3`}>{clinicalReasoningNote}</p>
                      ) : null}
                      {evaluationNote ? (
                        <p className={`${cardBodyStyles} text-blue-700 bg-blue-50 px-4 py-3`}>{evaluationNote}</p>
                      ) : null}
                      {responsibleAINote ? (
                        <p className={`${cardBodyStyles} text-blue-700 bg-blue-50 px-4 py-3`}>{responsibleAINote}</p>
                      ) : null}

                      <div className="space-y-4">
                        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">Streams</p>
                        <ul className="space-y-3 text-sm text-slate-600">
                          {streams.map((stream) => (
                            <li key={stream.label} className="bg-white px-4 py-3 shadow-sm">
                              <p className="font-semibold text-slate-800">{stream.label}</p>
                              <p className="mt-2 text-slate-600">{stream.description}</p>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="space-y-2 text-sm text-slate-600">
                        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">Who should join</p>
                        <p>{participants}</p>
                      </div>

                      <div className="space-y-2 text-sm text-slate-600">
                        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">Interfaces</p>
                        <p>{interfaces}</p>
                      </div>

                      <div className="space-y-2 text-sm text-slate-600">
                        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">Out of scope</p>
                        <p>{outOfScope}</p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              <p className="text-base text-slate-700">
                Each Working Group is co-led by one Informatics (INF) and one Psychology/Clinical (PSY) expert. Activities run in two independent streams (A-PSY and B-INF) with self-contained deliverables. Interfaces between WGs are strictly document-based (consultation of published outputs), ensuring stand-alone work while maintaining INF-PSY parity across leadership, outputs and training opportunities.
              </p>
            </div>
          </section>

          {/* Be part of the solution */}
          <section id="solution" className={`bg-white ${sectionSpacing}`}>
            <div className={`${containerClasses} space-y-8 text-left`}>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-blue-600">Join the network</p>
              <h2 className="mt-4 text-3xl font-bold text-slate-900 sm:text-4xl">Be part of the solution</h2>
              <p className="mt-8 text-lg text-slate-700">
                We welcome researchers, clinicians, and professionals who share our vision for transforming mental health care through digital innovation.
              </p>
              <div className="mt-12 flex flex-wrap items-center justify-center gap-6">
                <a
                  href="mailto:marco.cremaschi@unimib.it?subject=DigInMind - Expression of Interest"
                  className="inline-flex items-center gap-3 bg-amber-400 px-10 py-4 text-sm font-semibold uppercase tracking-[0.3em] text-slate-900 shadow-lg transition hover:bg-amber-500"
                >
                  <Mail className="h-6 w-6" />
                  Get in touch
                </a>
              </div>
            </div>
          </section>

          {/* Our vision */}
          <section id="vision" className={`bg-slate-950 ${sectionSpacing}`}>
            <div className={`${containerClasses} space-y-8 text-left text-white`}>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/60">Looking ahead</p>
              <h2 className="mt-4 text-3xl font-bold sm:text-4xl">Our vision</h2>
              <div className={`${narrativeClasses} text-left text-white/80`}>
                <p>Through this COST Action, we envision a future where digital innovation complements human expertise to provide more accurate, accessible, and personalised mental health care. By fostering collaboration across borders and disciplines, DigInMind will contribute to reducing the burden of mental health disorders and improving quality of life for millions of Europeans.</p>
              </div>
            </div>
          </section>

          {/* Network map */}
          <section id="network-map" className={`bg-white ${sectionSpacing}`}>
            <div className={`${containerClasses} space-y-8`}>
              <div className="text-left">
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-blue-600">European network</p>
                <h2 className="mt-4 text-3xl font-bold text-slate-900 sm:text-4xl">Participating countries</h2>
                <p className="mt-6 text-lg text-slate-600">
                  The DigInMind network already connects specialists across Europe. Highlighted countries show where members currently contribute to the initiative.
                </p>
              </div>

              <div className="mt-16 grid gap-12 lg:grid-cols-2 lg:items-start">
                <div className="overflow-hidden shadow-xl">
                  <EuropeMap countriesWithMembers={participatingCountries} />
                </div>

                <div className="flex flex-col gap-8">
                  <div className="space-y-3">
                    <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">Countries represented</p>
                    <ul className="space-y-3 text-sm text-slate-600">
                      {uniqueCountriesWithMembers.map(({ country, count }) => (
                        <li
                          key={country}
                          className="flex items-center justify-between gap-6 bg-slate-50 px-5 py-3 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                        >
                          <span className="font-semibold text-slate-800">{country}</span>
                          <span className="text-xs uppercase tracking-[0.25em] text-blue-600">{count} member{count > 1 ? 's' : ''}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-blue-50/80 p-6 text-left shadow-md">
                    <p className="text-sm text-slate-700">
                      We actively welcome partners from additional countries. Reach out if you would like to collaborate or represent your national community within DigInMind.
                    </p>
                  </div>
                </div>
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