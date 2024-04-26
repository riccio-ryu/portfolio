import { ReactNode, useEffect } from 'react'
import { deviceSize } from '@/atoms'
import { useRecoilState } from 'recoil'
import HeaderSpace from './headerSpace'
interface LayoutProps {
  width?: number
  children: ReactNode
}

export default function Layout({ width, children }: LayoutProps) {
  const num = width ? String(width) + 'px' : undefined

  const [device, setDevice] = useRecoilState(deviceSize)

  useEffect(() => {
    // first check width
    setDevice(window.innerWidth <= 680 ? 'mobile' : 'pc')

    // resize
    const windowResize = () => {
      const width = window.innerWidth
      setDevice(width <= 680 ? 'mobile' : 'pc')
    }

    window.addEventListener(`resize`, windowResize)

    return () => {
      window.removeEventListener(`resize`, windowResize)
    }
  }, [])

  return (
    <div className="relative h-full min-h-screen w-full">
      <HeaderSpace />
      <div className="relative mx-auto my-0 min-h-[calc(100%-2.5rem)] w-auto max-w-[60rem] sm:min-h-[calc(100%-4rem)]">
        {/* sign up space wrap */}
        <div
          className={`relative mx-auto my-0 box-border flex h-auto w-full flex-wrap overflow-hidden px-2 pb-24 pt-3 sm:px-0 ${
            num !== undefined ? `sm:w-[360px] sm:pt-11` : 'sm:w-full'
          }`}
        >
          {children}
        </div>
      </div>
    </div>
  )
}
