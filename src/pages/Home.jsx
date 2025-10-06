import { Link } from 'react-router-dom'
import { ArrowRight, Brain, Users, Globe, Lightbulb } from 'lucide-react'

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              DigInMind
            </h1>
            <p className="text-xl sm:text-2xl text-gray-700 mb-8 font-medium">
              DIGital INnovation in Mental health for INtervention and Diagnosis
            </p>
            <p className="text-lg sm:text-xl text-gray-600 mb-10 leading-relaxed">
              A pan-European COST network proposal connecting psychologists, clinicians, and computer scientists to advance AI-assisted mental-health diagnosis and early intervention.
            </p>
            
            <div className="bg-white p-6 rounded-lg shadow-md mb-10 max-w-3xl mx-auto">
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                Mental health challenges are rising across Europe, yet early diagnosis and intervention remain limited by resource constraints and diagnostic complexity. 
                DigInMind aims to build a collaborative European network that bridges clinical expertise with cutting-edge technological innovation. 
                By bringing together diverse disciplines, we seek to develop AI-assisted tools for more accurate, accessible, and timely mental health support, 
                ultimately improving outcomes for individuals and communities across the continent.
              </p>
            </div>
            
            <Link
              to="/about"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
            >
              Learn more about the proposal
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Why DigInMind?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                <Brain className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">AI-Assisted Innovation</h3>
              <p className="text-gray-600">
                Leveraging artificial intelligence for enhanced diagnostic accuracy and early intervention.
              </p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                <Users className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Interdisciplinary Network</h3>
              <p className="text-gray-600">
                Connecting psychologists, clinicians, and computer scientists across disciplines.
              </p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
                <Globe className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Pan-European Reach</h3>
              <p className="text-gray-600">
                Building collaboration across European countries and research institutions.
              </p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-100 rounded-full mb-4">
                <Lightbulb className="w-8 h-8 text-amber-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Accessible Solutions</h3>
              <p className="text-gray-600">
                Developing tools to make mental health support more accessible to all communities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Join Our Growing Network
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            We're seeking researchers, clinicians, and professionals across Europe to collaborate on this important initiative.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg"
          >
            Express Your Interest
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  )
}

