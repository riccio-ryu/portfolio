import { ReactNode, useEffect } from 'react'
import { deviceSize } from '@/atoms'
import { useRecoilState } from 'recoil'
import { useRouter } from 'next/router'
import HeaderSpace from './headerSpace'
interface LayoutProps {
  width?: number
  children: ReactNode
}

export default function Layout({ width, children }: LayoutProps) {
  const router = useRouter()
  const path = router.pathname
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
  // useEffect(() => {
  //   console.log(device)
  // }, [device])

  return (
    <div className="relative h-full min-h-screen w-full">
      <HeaderSpace />
      <div
        className={`relative mx-auto my-0 min-h-[calc(100%-2.5rem)] w-auto sm:min-h-[calc(100%-4rem)] ${
          path === '/map' ? '' : 'max-w-[60rem]'
        }`}
      >
        {/* sign up space wrap */}
        <div
          className={`relative mx-auto my-0 box-border flex w-full flex-wrap overflow-hidden sm:px-0 ${
            num !== undefined ? `sm:w-[360px] sm:pt-11` : 'sm:w-full'
          } ${
            path === '/map'
              ? device !== 'pc'
                ? 'h-[calc(100vh-5rem)]'
                : 'h-[calc(100vh-4rem)]'
              : 'h-auto px-2 pb-24 pt-3'
          }`}
        >
          {children}
        </div>
      </div>
    </div>
  )
}
