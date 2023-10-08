import { ReactNode } from 'react'
import HeaderSpace from './headerSpace'

interface LayoutProps {
  width?: number
  children: ReactNode
}

export default function Layout({ width, children }: LayoutProps) {
  const num = width ? String(width) + 'px' : undefined
  return (
    <div className="h-screen w-full">
      <HeaderSpace />
      <div className="relative mx-auto my-0 min-h-[calc(100%-2.5rem)] w-auto max-w-[60rem] sm:min-h-[calc(100%-4rem)]">
        {/* sign up space wrap */}
        <div
          className={`relative mx-auto my-0 box-border flex h-auto w-full flex-wrap overflow-hidden pb-24 pt-3 ${
            num !== undefined ? `sm:w-[360px] sm:pt-11` : 'sm:w-full'
          }`}
        >
          {children}
        </div>
      </div>
    </div>
  )
}
