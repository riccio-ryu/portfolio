import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { VscAccount, VscEdit, VscEllipsis } from 'react-icons/vsc'
import MenuNav from '@/components/menuNav'
import TopNav from '@/components/topNav'
import Layout from '@/components/layout'
import ItemDiary from '@/components/itemDiary'

const OtherProfile: NextPage = () => {
  const router = useRouter()
  return (
    <div>
      {/* home - body */}
      <Layout>
        {/* user profile */}
        <div className="flex w-full items-start justify-between gap-10 py-7">
          <div className="relative flex-none overflow-hidden rounded-full bg-mcl-ivory sm:h-44 sm:w-44">
            <VscAccount className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 sm:text-[calc(44rem/4)]" />
          </div>
          <div className="flex flex-auto flex-col items-start justify-start">
            <div className="flex w-full items-start justify-between">
              <div className="flex items-center justify-start gap-4">
                <span className="text-black">id_test</span>
                <button className="w-14 rounded-xl border border-solid border-mcl-orange px-1 py-0.5 text-sm text-mcl-orange ">
                  팔로우
                </button>
                <span className="text-sm">관심음식리스트</span>
              </div>
              <VscEllipsis />
            </div>
            <div className="mb-6 mt-4 flex items-center justify-start gap-6">
              {['diaryCount', 'followerCount', 'followCount'].map(
                (title, i) => (
                  <div key={i} className="flex gap-2">
                    <span className="text-sm">
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
                    <span className="text-sm font-bold">10</span>
                  </div>
                ),
              )}
            </div>
            <div className="flex w-full flex-col items-center justify-start gap-1">
              <div className="text-sm">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illum,
                eaque? Minus adipisci, asperiores nam dolor repudiandae vel
                distinctio ad totam inventore voluptatem id fuga, quas suscipit.
                Maxime reprehenderit provident animi!
              </div>
              <button className={`hidden`}>더보기</button>
            </div>
          </div>
        </div>
        {/* contents card */}
        {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((_, i) => (
          <ItemDiary key={i} />
        ))}
        {/* write button */}
        <div className="fixed bottom-5 right-1/2 translate-x-[480px]">
          <button
            className="flex h-10 w-10 items-center justify-center rounded-full bg-mcl-orange text-xl"
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
