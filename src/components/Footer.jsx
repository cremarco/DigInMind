import { Mail, Users, Globe } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-white font-semibold mb-4">About DigInMind</h3>
            <p className="text-sm leading-relaxed">
              A pan-European COST network proposal connecting psychologists, clinicians, and computer scientists to advance AI-assisted mental health diagnosis and early intervention.
            </p>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="https://www.cost.eu" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-2">
                  <Globe className="w-4 h-4" />
                  COST Association
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-white transition-colors flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Join the Network
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <p className="text-sm mb-4">
              Interested in joining our network? Reach out to learn more about collaboration opportunities.
            </p>
            <a 
              href="/contact" 
              className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors text-sm"
            >
              <Mail className="w-4 h-4" />
              Get in Touch
            </a>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
          <p>© {new Date().getFullYear()} DigInMind COST Action Proposal. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

