export function smoothScrollTo(id, offset = 80) {
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

