import { deviceSize, loginInfo } from '@/atoms'
import Link from 'next/link'
import { VscSearch, VscListFilter, VscBell, VscAccount } from 'react-icons/vsc'
import { useRecoilValue } from 'recoil'

interface TopNavProps {
  navNow?: string
}

export default function TopNav({ navNow }: TopNavProps) {
  //
  const login = useRecoilValue(loginInfo)
  const deviceSz = useRecoilValue(deviceSize)

  return (
    <div className="fixed top-0 h-10 w-full bg-white shadow-lg sm:h-16">
      <div className="flex h-full w-full max-w-7xl flex-row content-center items-center justify-between px-2">
        {/* left logo */}
        <div className="flex flex-nowrap content-center items-center justify-start gap-1.5 sm:gap-3">
          <div className="h-6 w-6 bg-mcl-logo bg-contain bg-center bg-no-repeat sm:h-10 sm:w-10"></div>
          <h1 className="font-inter text-base font-semibold sm:text-xl">
            MYCHELIN
          </h1>
        </div>
        {/* right option */}
        <div className="flex flex-row items-center justify-end gap-0.5 sm:gap-2.5">
          <a href="#" className="block">
            <VscSearch className="text-sm sm:text-xl" />
          </a>
          <a href="#" className="block">
            <VscListFilter className="text-sm sm:text-xl" />
          </a>
          {/* login y/n */}
          {login ? (
            <>
              <a href="#" className="block">
                <VscBell className="text-sm sm:text-xl" />
              </a>
              <Link href="#" className="block">
                <div className="relative h-3.5 w-3.5 overflow-hidden rounded-full bg-mcl-ivory sm:h-5 sm:w-5">
                  <VscAccount className="absolute left-1/2 right-1/2 -translate-x-1/2 text-sm sm:text-xl" />
                </div>
              </Link>
            </>
          ) : (
            <>
              <Link href="/signup" className="block">
                <span
                  className={`box-border rounded-[4px] border border-solid border-transparent px-1 py-0.5 text-xs font-bold text-mcl-red transition duration-100 ease-in-out sm:text-base ${
                    navNow === 'signup' ? 'bg-mcl-red text-white' : ''
                  }`}
                >
                  Sign Up
                </span>
              </Link>
              <Link href="/signin" className="group block">
                <span
                  className={`box-border rounded-[4px] border border-solid border-mcl-red px-1 py-0.5 text-xs font-bold text-mcl-red transition duration-100 ease-in-out group-hover:bg-mcl-red group-hover:text-white sm:text-base ${
                    navNow === 'signin' ? 'bg-mcl-red text-white' : ''
                  }`}
                >
                  Sign In
                </span>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
