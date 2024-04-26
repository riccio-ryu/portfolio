import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { VscAccount, VscEdit, VscEllipsis } from 'react-icons/vsc'
import MenuNav from '@/components/menuNav'
import TopNav from '@/components/topNav'
import Layout from '@/components/layout'
import ItemDiary from '@/components/itemDiary'
import { deviceSize } from '@/atoms'
import { useRecoilValue } from 'recoil'

const OtherProfile: NextPage = () => {
  const router = useRouter()
  const device = useRecoilValue(deviceSize)
  return (
    <div>
      {/* home - body */}
      <Layout>
        {/* user profile */}
        <div className="flex w-full flex-col gap-2 pb-4 sm:gap-0 sm:pb-0">
          <div className="flex w-full items-start justify-between gap-2 py-0.5 sm:gap-10 sm:py-7">
            <div className="relative h-12 w-12 flex-none overflow-hidden rounded-full bg-mcl-ivory sm:h-44 sm:w-44">
              <VscAccount className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[calc(12rem/4)] sm:text-[calc(44rem/4)]" />
            </div>
            <div className="flex flex-auto flex-col items-start justify-start gap-2 sm:gap-0">
              <div className="flex w-full items-start justify-between">
                <div className="flex items-center justify-start gap-4">
                  <span className="text-xs text-black sm:text-base">
                    id_test
                  </span>
                  <button className="w-10 rounded-xl border border-solid border-mcl-orange px-1 py-0.5 text-ss text-mcl-orange sm:w-14 sm:text-sm ">
                    팔로우
                  </button>
                  {device === 'pc' && (
                    <span className="text-sm">관심음식리스트</span>
                  )}
                </div>
                <VscEllipsis />
              </div>
              {device !== 'pc' && (
                <span className="text-ss">관심음식리스트</span>
              )}
              <div className="flex items-center justify-start gap-2 sm:mb-6 sm:mt-4 sm:gap-6">
                {['diaryCount', 'followerCount', 'followCount'].map(
                  (title, i) => (
                    <div key={i} className="flex gap-0.5 sm:gap-2">
                      <span className="text-ss sm:text-sm">
                        {(() => {
                          if (title === 'diaryCount') {
                            return '게시된 다이어리'
                          } else if (title === 'followerCount') {
                            return '팔로워'
                          } else {
                            return '팔로우'
                          }
                        })()}
                      </span>
                      <span className="text-ss font-bold sm:text-sm">10</span>
                    </div>
                  ),
                )}
              </div>
              {device === 'pc' && (
                <div className="flex w-full flex-col items-center justify-start gap-1">
                  <div className="text-sm">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Illum, eaque? Minus adipisci, asperiores nam dolor
                    repudiandae vel distinctio ad totam inventore voluptatem id
                    fuga, quas suscipit. Maxime reprehenderit provident animi!
                  </div>
                  <button className={`hidden`}>더보기</button>
                </div>
              )}
            </div>
          </div>
          {device !== 'pc' && (
            <div className="flex w-full flex-col items-center justify-start gap-1">
              <div className="line-clamp-4 text-xs">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Provident error, reprehenderit possimus sapiente minima enim
                vero quam. Autem nam rerum dolores modi, consequatur eligendi
                quae porro velit. Ut, ex numquam?
              </div>
              <button className={`hidden`}>더보기</button>
            </div>
          )}
        </div>
        {/* contents card */}
        {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((_, i) => (
          <ItemDiary key={i} />
        ))}
        {/* write button */}
        <div className="fixed bottom-11 right-1 translate-x-0 sm:bottom-5 sm:right-1/2 sm:translate-x-[480px]">
          <button
            className="flex h-8 w-8 items-center justify-center rounded-full bg-mcl-orange text-base sm:h-10 sm:w-10 sm:text-xl"
            onClick={() => router.push('/diary/upload')}
          >
            <VscEdit className="text-white" />
          </button>
        </div>
      </Layout>

      {/* top */}
      <TopNav />

      {/* nav - phone */}
      <MenuNav navNow="Diary" />
    </div>
  )
}

export default OtherProfile
