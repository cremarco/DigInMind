import { AlertTriangle, Target, Network, Microscope, Heart, Users } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function About() {
  return (
    <div className="py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            About the Proposal
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Understanding the challenge and our vision for transforming mental health care through digital innovation
          </p>
        </div>

        {/* The Challenge Section */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-red-100 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">The Challenge</h2>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-8 space-y-6">
            <p className="text-lg text-gray-700 leading-relaxed">
              Mental health disorders represent one of Europe's most pressing public health challenges, affecting millions of individuals and their families. Despite significant advances in clinical psychology and psychiatry, several critical barriers continue to impede effective care:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="font-semibold text-gray-900 mb-2">Early Diagnosis Difficulties</h3>
                <p className="text-gray-600 text-sm">
                  Mental health conditions often go undetected until they reach advanced stages, missing crucial windows for early intervention and prevention.
                </p>
              </div>
              
              <div className="border-l-4 border-purple-500 pl-4">
                <h3 className="font-semibold text-gray-900 mb-2">Symptom Variability</h3>
                <p className="text-gray-600 text-sm">
                  Mental health symptoms manifest differently across individuals, cultures, and contexts, making standardized diagnosis challenging.
                </p>
              </div>
              
              <div className="border-l-4 border-green-500 pl-4">
                <h3 className="font-semibold text-gray-900 mb-2">Access Barriers</h3>
                <p className="text-gray-600 text-sm">
                  Limited resources, geographic disparities, and stigma create significant obstacles to accessing timely mental health support and treatment.
                </p>
              </div>
            </div>
            
            <p className="text-lg text-gray-700 leading-relaxed mt-6">
              These challenges are compounded by the growing demand for mental health services, workforce shortages, and the need for culturally sensitive, evidence-based interventions. Traditional approaches alone cannot address the scale and complexity of this crisis.
            </p>
          </div>
        </section>

        {/* Our Aim Section */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg">
              <Target className="w-6 h-6 text-blue-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Our Aim</h2>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-8 space-y-6">
            <p className="text-lg text-gray-700 leading-relaxed">
              DigInMind aims to establish a transformative pan-European network that harnesses the power of digital innovation to revolutionize mental health care. Our mission is to create a collaborative ecosystem where clinical expertise meets technological advancement.
            </p>
            
            <div className="space-y-6 mt-8">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="inline-flex items-center justify-center w-10 h-10 bg-indigo-100 rounded-lg">
                    <Network className="w-5 h-5 text-indigo-600" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Build an Interdisciplinary Network</h3>
                  <p className="text-gray-700">
                    Connect researchers, clinicians, psychologists, computer scientists, data scientists, and ethicists across Europe to foster knowledge exchange and collaborative research.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="inline-flex items-center justify-center w-10 h-10 bg-teal-100 rounded-lg">
                    <Microscope className="w-5 h-5 text-teal-600" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Develop AI-Assisted Diagnostic Tools</h3>
                  <p className="text-gray-700">
                    Create innovative, evidence-based AI technologies that enhance diagnostic accuracy, support early detection, and provide personalized intervention recommendations while maintaining ethical standards.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="inline-flex items-center justify-center w-10 h-10 bg-pink-100 rounded-lg">
                    <Heart className="w-5 h-5 text-pink-600" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Improve Early Intervention</h3>
                  <p className="text-gray-700">
                    Enable timely identification of mental health challenges and facilitate rapid access to appropriate care, ultimately reducing the burden on individuals and healthcare systems.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="inline-flex items-center justify-center w-10 h-10 bg-amber-100 rounded-lg">
                    <Users className="w-5 h-5 text-amber-600" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Promote Accessibility and Equity</h3>
                  <p className="text-gray-700">
                    Ensure that digital mental health solutions are accessible, culturally appropriate, and beneficial to diverse populations across Europe, regardless of geographic or socioeconomic barriers.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mt-8">
              <p className="text-gray-800 font-medium mb-2">
                Our Vision
              </p>
              <p className="text-gray-700">
                Through this COST Action, we envision a future where digital innovation complements human expertise to provide more accurate, accessible, and personalized mental health care. By fostering collaboration across borders and disciplines, DigInMind will contribute to reducing the burden of mental health disorders and improving quality of life for millions of Europeans.
              </p>
            </div>
          </div>
        </section>

        {/* Expected Impact Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Expected Impact</h2>
          
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-8">
            <ul className="space-y-4">
              <li className="flex gap-3">
                <span className="text-blue-600 font-bold text-lg">•</span>
                <span className="text-gray-700">Enhanced diagnostic accuracy through AI-powered assessment tools</span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-600 font-bold text-lg">•</span>
                <span className="text-gray-700">Reduced waiting times for mental health assessments and interventions</span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-600 font-bold text-lg">•</span>
                <span className="text-gray-700">Cross-border knowledge sharing and best practice development</span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-600 font-bold text-lg">•</span>
                <span className="text-gray-700">Training opportunities for early-career researchers in digital mental health</span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-600 font-bold text-lg">•</span>
                <span className="text-gray-700">Ethical frameworks for responsible AI use in mental health care</span>
              </li>
            </ul>
          </div>
        </section>

        {/* CTA */}
        <div className="text-center bg-white rounded-lg shadow-md p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Be Part of the Solution
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            We welcome researchers, clinicians, and professionals who share our vision for transforming mental health care through digital innovation.
          </p>
          <Link
            to="/contact"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Join Our Network
          </Link>
        </div>
      </div>
    </div>
  )
}

