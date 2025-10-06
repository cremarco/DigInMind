import { useEffect, useMemo, useState } from 'react'
import { smoothScrollTo } from '../utils/scroll'

export default function Header() {
  const navigation = useMemo(
    () => [
      { id: 'hero', label: 'Home' },
      { id: 'mission', label: 'Mission' },
      { id: 'proposal', label: 'Proposal' },
      { id: 'impact', label: 'Impact' },
      { id: 'contact', label: 'Join Us' },
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

