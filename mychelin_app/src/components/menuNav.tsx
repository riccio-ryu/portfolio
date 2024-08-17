import Link from 'next/link'

import {
  VscHome,
  VscBook,
  VscMap,
  VscCommentDiscussion,
  VscPackage,
} from 'react-icons/vsc'

interface MenuNavProps {
  title?: boolean
  navNow?: string
}

export default function MenuNav({ title, navNow }: MenuNavProps) {
  const navList = ['Home', 'Diary', 'Map', 'Chat', 'Storage']
  return (
    <div className="fixed bottom-0 left-0 z-10 block h-10 w-full translate-x-0 overflow-hidden bg-white sm:left-1/2 sm:top-0 sm:h-16 sm:w-auto sm:-translate-x-1/2 sm:bg-transparent">
      <div className="flex h-full w-full flex-row flex-nowrap justify-around">
        {navList.map((navName, i) => (
          <Link
            href={`/${navName === 'Home' ? '' : navName.toLowerCase()}`}
            key={i}
            className="w-1/5 sm:w-auto"
          >
            <div
              className={`group hidden h-full w-16 flex-col items-center justify-between text-center sm:flex ${
                navName === navNow ? 'on' : ''
              }`}
            >
              <p className="h-0.5 w-full overflow-hidden bg-transparent indent-[-9999px]">
                line
              </p>
              <p
                className={`transition duration-300 ease-in-out group-hover:text-mcl-orange group-[.on]:text-mcl-orange`}
              >
                {navName}
              </p>
              <p className="h-0.5 w-10 overflow-hidden bg-transparent indent-[-9999px] transition duration-300 ease-in-out group-hover:bg-mcl-orange group-[.on]:bg-mcl-orange">
                line
              </p>
            </div>
            {/* w-[calc(100vw/5)] */}
            <div
              className={`group flex h-full flex-1 items-center justify-center text-center sm:hidden ${
                navName === navNow ? 'on' : ''
              }`}
            >
              {(() => {
                switch (navName) {
                  case 'Home':
                    return (
                      <VscHome className="text-xl text-mcl-404040 group-[.on]:text-mcl-orange" />
                    )
                    break
                  case 'Diary':
                    return (
                      <VscBook className="text-xl text-mcl-404040 group-[.on]:text-mcl-orange" />
                    )
                    break
                  case 'Map':
                    return (
                      <VscMap className="text-xl text-mcl-404040 group-[.on]:text-mcl-orange" />
                    )
                    break
                  case 'Chat':
                    return (
                      <VscCommentDiscussion className="text-xl text-mcl-404040 group-[.on]:text-mcl-orange" />
                    )
                    break
                  case 'Storage':
                    return (
                      <VscPackage className="text-xl text-mcl-404040 group-[.on]:text-mcl-orange" />
                    )
                    break

                  default:
                    break
                }
              })()}
              {/* <VscHome className="bg-mcl-404040 group-[.on]:bg-mcl-orange" /> */}
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
