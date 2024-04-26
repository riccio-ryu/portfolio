import { ReactNode } from 'react'

interface TermsProps {
  height?: number
  children: ReactNode
}

export default function TermsBox({ height, children }: TermsProps) {
  return (
    <div
      className={`w-full ${
        height ? `h-[calc(${height}px)]` : 'h-36'
      } box-border resize-none overflow-y-auto rounded border border-solid border-mcl-999 p-1 text-xs leading-relaxed`}
    >
      {children}
    </div>
  )
}
