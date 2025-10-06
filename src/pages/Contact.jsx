import { Mail, MapPin, Users } from 'lucide-react'

export default function Contact() {

  return (
    <div className="py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Join the DigInMind Network
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're building a community of experts dedicated to advancing mental health care through digital innovation. Express your interest in joining our collaborative network.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Contact Info Cards */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Who Can Join</h3>
            </div>
            <p className="text-gray-600 text-sm">
              Researchers, clinicians, psychologists, computer scientists, data scientists, and mental health professionals from across Europe.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg">
                <MapPin className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Geographic Scope</h3>
            </div>
            <p className="text-gray-600 text-sm">
              Open to participants from all COST member countries and cooperating states across Europe and beyond.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg">
                <Mail className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Get Involved</h3>
            </div>
            <p className="text-gray-600 text-sm">
              Fill out the form below to express your interest and learn about collaboration opportunities.
            </p>
          </div>
        </div>

        {/* Contact Information */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full mb-6">
              <Mail className="w-10 h-10 text-blue-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Get in Touch</h2>
            <p className="text-lg text-gray-600 mb-8">
              Interested in joining our network or learning more about the DigInMind proposal? 
              Reach out to us via email.
            </p>
            <a 
              href="mailto:marco.cremaschi@unimib.it?subject=DigInMind - Expression of Interest" 
              className="inline-flex items-center gap-3 bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
            >
              <Mail className="w-6 h-6" />
              marco.cremaschi@unimib.it
            </a>
            <div className="mt-8 pt-8 border-t border-gray-200">
              <p className="text-sm text-gray-500">
                <strong>Note:</strong> This is a preliminary expression of interest for a COST Action proposal currently under preparation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

