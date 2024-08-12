'use client'

import NavLInks from './components/NavLInks'
import ThemeSelector from './components/ThemeSelector'

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <div className="px-3 py-3">
      <div className="flex justify-between items-center gap-1 flex-wrap mb-3">
        <NavLInks />
        <ThemeSelector />
      </div>

      {children}
    </div>
  )
}
