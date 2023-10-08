import Link from 'next/link'
import { VscSearch, VscListFilter, VscBell } from 'react-icons/vsc'

interface TopNavProps {
  navNow?: string
}

export default function TopNav({ navNow }: TopNavProps) {
  //
  return (
    <div className="fixed top-0 h-10 w-full bg-white shadow-lg sm:h-16">
      <div className="flex h-full w-full max-w-7xl flex-row content-center items-center justify-between px-2">
        {/* left logo */}
        <div className="flex flex-nowrap content-center items-center justify-start gap-1.5 sm:gap-3">
          <div className="h-6 w-6 bg-mcl-logo bg-contain bg-center bg-no-repeat sm:h-10 sm:w-10"></div>
          <h1 className="font-inter text-xl font-semibold">MYCHELIN</h1>
        </div>
        {/* right option */}
        <div className="flex flex-row items-center justify-end gap-2.5">
          <a href="#" className="block">
            <VscSearch className="text-xl" />
          </a>
          <a href="#" className="block">
            <VscListFilter className="text-xl" />
          </a>
          {/* not login */}
          <Link href="/signup" className="block">
            <span
              className={`box-border rounded-[4px] border border-solid border-transparent px-1 py-0.5 text-base font-bold text-mcl-red transition duration-100 ease-in-out ${
                navNow === 'signup' ? 'bg-mcl-red text-white' : ''
              }`}
            >
              Sign Up
            </span>
          </Link>
          <Link href="/signin" className="group block">
            <span
              className={`box-border rounded-[4px] border border-solid border-mcl-red px-1 py-0.5 text-base font-bold text-mcl-red transition duration-100 ease-in-out group-hover:bg-mcl-red group-hover:text-white ${
                navNow === 'signin' ? 'bg-mcl-red text-white' : ''
              }`}
            >
              Sign In
            </span>
          </Link>
          {/* login */}
          {/*
            <a href="#" className="block">
              <VscBell className="text-xl" />
            </a>
            <a href="#" className="block">
              <p className="h-7 w-7 rounded-[50%] bg-gray-500"></p>
            </a>
             */}
        </div>
      </div>
    </div>
  )
}
