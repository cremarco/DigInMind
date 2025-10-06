import { Link, useLocation } from 'react-router-dom'
import { Brain } from 'lucide-react'

export default function Header() {
  const location = useLocation()

  const isActive = (path) => {
    return location.pathname === path ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-700 hover:text-blue-600'
  }

  return (
    <header className="bg-white shadow-sm sticky top-0 z-40">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2 group">
            <Brain className="w-8 h-8 text-blue-600 group-hover:text-blue-700 transition-colors" />
            <span className="text-xl font-semibold text-gray-900 group-hover:text-blue-700 transition-colors">
              DigInMind
            </span>
          </Link>
          
          <div className="flex gap-8">
            <Link 
              to="/" 
              className={`px-1 py-2 text-sm font-medium transition-colors ${isActive('/')}`}
            >
              Home
            </Link>
            <Link 
              to="/about" 
              className={`px-1 py-2 text-sm font-medium transition-colors ${isActive('/about')}`}
            >
              About
            </Link>
            <Link 
              to="/contact" 
              className={`px-1 py-2 text-sm font-medium transition-colors ${isActive('/contact')}`}
            >
              Join Us
            </Link>
          </div>
        </div>
      </nav>
    </header>
  )
}

