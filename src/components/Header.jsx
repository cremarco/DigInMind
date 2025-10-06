import { Link, useLocation } from 'react-router-dom'

export default function Header() {
  const location = useLocation()

  const isActive = (path) => {
    return location.pathname === path
      ? 'text-blue-600'
      : 'text-slate-500 hover:text-slate-900'
  }

  return (
    <header className="sticky top-0 z-40 bg-white bg-opacity-80 backdrop-blur shadow-md">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="text-lg font-semibold tracking-[0.3em] text-slate-900">
          DigInMind
        </Link>

        <div className="flex items-center gap-8 text-xs font-semibold uppercase tracking-[0.3em] text-slate-600">
          <Link to="/" className={`pb-1 transition ${isActive('/')}`}>
            Home
          </Link>
          <Link to="/about" className={`pb-1 transition ${isActive('/about')}`}>
            About
          </Link>
          <Link to="/contact" className={`pb-1 transition ${isActive('/contact')}`}>
            Join Us
          </Link>
        </div>
      </nav>
    </header>
  )
}

