import { AlertCircle } from 'lucide-react'

export default function Banner() {
  return (
    <div className="bg-amber-50 border-b border-amber-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-center gap-2 text-amber-900">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <p className="text-sm sm:text-base font-medium text-center">
            This website presents a COST Action proposal currently under preparation. The network is not yet approved.
          </p>
        </div>
      </div>
    </div>
  )
}

