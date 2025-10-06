import { AlertCircle } from 'lucide-react'

export default function Banner() {
  return (
    <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 text-white text-opacity-80">
      <div className="mx-auto flex max-w-7xl items-center justify-center gap-3 px-4 py-3 text-xs font-medium uppercase tracking-[0.35em]">
        <AlertCircle className="h-4 w-4 flex-shrink-0 text-white text-opacity-60" />
        <p className="text-center">
          This website presents a COST Action proposal currently under preparation. The network is not yet approved.
        </p>
      </div>
    </div>
  )
}

