import { NextPage } from 'next'
import {
  VscAccount,
  VscAdd,
  VscBookmark,
  VscChevronLeft,
  VscChevronRight,
  VscComment,
  VscEdit,
  VscEllipsis,
  VscHeart,
  VscHeartFilled,
  VscLink,
} from 'react-icons/vsc'
import React, { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'

import MenuNav from '@/components/menuNav'
import TopNav from '@/components/topNav'
import Layout from '@/components/layout'
import StarBoard from '@/components/starBoard'

const DiaryDetail: NextPage = () => {
  const router = useRouter()

  const photoArray = [0, 1, 2, 3, 4, 5]
  const menuArray = [
    { menu: '사루', taste: 7, amount: 5.7, price: 7.7 },
    { menu: '카메', taste: 8.8, amount: 9.7, price: 7 },
  ]
  const replyArray = [
    { user: { image: '', nickname: 'test1' }, reply: '안녕하세요', like: true },
    {
      user: { image: '', nickname: 'test2' },
      reply: '반갑습니다',
      like: false,
    },
    { user: { image: '', nickname: 'test3' }, reply: 'Hi~', like: false },
  ]

  const [nowPhoto, setNowPhoto] = useState(0)
  const [textareaValue, setTextareaValue] = useState('')

  const photoZero = useRef<null[] | HTMLDivElement[]>([])
  const photoBox = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement | null>(null)

  useEffect(() => {
    const width = Number(photoZero.current[0]?.clientWidth)
    photoBox.current?.style.setProperty(
      'transform',
      `translateX(-${nowPhoto * width}px)`,
    )
  }, [nowPhoto])

  // photo arrow fn
  const onPhotoArrow = (dir: string) => {
    if (dir === 'l' && nowPhoto === 0) return
    if (dir === 'r' && nowPhoto === photoArray.length - 1) return
    setNowPhoto((prev) => (prev += dir === 'r' ? 1 : -1))
  }
  // textarea auto height fn
  const onChangeTextarea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextareaValue(e.currentTarget.value)
    // textarea 높이 조절
    if (textareaRef && textareaRef.current) {
      textareaRef.current.style.height = '0px'
      const scrollHeight = textareaRef.current.scrollHeight
      textareaRef.current.style.height = scrollHeight + 'px'
    }
  }
  return (
    // diary detail page
    <div>
      <Layout>
        <div className="mx-auto my-0 w-full pt-6">
          <div className="flex w-full flex-col items-stretch justify-start gap-8 overflow-hidden">
            {/* profile */}
            <div className="flex w-full items-center justify-between">
              <div className="flex items-center justify-start gap-2.5">
                <div className="relative flex-none overflow-hidden rounded-full bg-mcl-ivory sm:h-10 sm:w-10">
                  <VscAccount className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 sm:text-[calc(10rem/4)]" />
                </div>
                <div className="flex items-center justify-between gap-1">
                  <span>nickname</span>
                  <span className="h-0.5 w-0.5 rounded-full bg-black"></span>
                  <span>date</span>
                </div>
              </div>
              <VscEllipsis />
            </div>
            {/* photos */}
            <div className="relative w-full overflow-hidden">
              <div
                className="relative flex w-auto flex-nowrap items-center justify-start transition-all duration-300 ease-in-out"
                ref={photoBox}
              >
                {photoArray.map((_, i) => (
                  <div
                    key={i}
                    className="pr-2"
                    ref={(el) => (photoZero.current[i] = el)}
                  >
                    <div className="relative h-0 w-80 flex-none overflow-hidden rounded bg-mcl-ccc pb-80">
                      <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">{`photo ${i}`}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="absolute left-1/2 top-1/2 flex h-full w-full -translate-x-1/2 -translate-y-1/2 items-center justify-between text-4xl text-mcl-orange">
                <VscChevronLeft
                  className={`fa-globe ${
                    nowPhoto === 0 ? 'invisible' : 'visible'
                  } ${nowPhoto}`}
                  onClick={() => onPhotoArrow('l')}
                />
                <VscChevronRight
                  className={`fa-globe ${
                    nowPhoto === photoArray.length - 1 ? 'invisible' : 'visible'
                  }`}
                  onClick={() => onPhotoArrow('r')}
                />
              </div>
            </div>
            {/* desc */}
            <div className="flex w-full items-baseline justify-start gap-2">
              <p className="flex-none text-sm">내용 : </p>
              <div className="flex w-full flex-col items-start justify-between gap-2">
                <div className="font-bold text-black">
                  홍대에 있는 사루카메에 방문을 하여 보았다. 역시 맛있는
                  집,언제나 실패가 없는 맛집이다. 합정에 방문한다면 무조건
                  고민해봐야할 엄청난 라멘
                </div>
                <div className="text-sm">
                  평소에 즐겨먹던 라멘 중에 카메 라멘이 땡겨서 방문을 하였다.
                  이번에는 사루 라멘을 시켜 보았다.
                </div>
              </div>
            </div>
            {/* icons */}
            <div className="flex h-auto items-center justify-start gap-3 text-xl">
              <VscHeart />
              <VscComment />
              <VscLink />
              <VscBookmark />
            </div>
            {/* info */}
            <div className="flex w-full items-baseline justify-start gap-2">
              <p className="flex-none text-sm">장소 : </p>
              <div className="flex w-full flex-col items-start justify-between gap-1">
                <div className="flex items-center justify-start gap-2">
                  <p className="w-16 text-sm font-black">사루카메</p>
                  <StarBoard
                    use={false}
                    name="restaurantTotal"
                    point={9.5}
                    act={false}
                  />
                </div>
                <div className="flex flex-col items-start justify-between gap-1 pl-2">
                  <StarBoard
                    use
                    name="restService"
                    showName="서비스"
                    point={9}
                    act={false}
                  />
                  <StarBoard
                    use
                    name="restHygiene"
                    showName="위생"
                    point={10}
                    act={false}
                  />
                  <StarBoard
                    use
                    name="restMood"
                    showName="분위기"
                    point={10}
                    act={false}
                  />
                  <StarBoard
                    use
                    name="restRecommend"
                    showName="추천"
                    point={10}
                    act={false}
                  />
                  <StarBoard
                    use
                    name="restRevisit"
                    showName="재방문의사"
                    point={8.5}
                    act={false}
                  />
                </div>
              </div>
            </div>
            {/* menus */}
            <div className="flex w-full items-baseline justify-start gap-2">
              <p className="flex-none text-sm">메뉴 : </p>
              <div className="flex w-full flex-wrap items-start justify-start gap-x-10 gap-y-5">
                {menuArray.map((menu, i) => (
                  <div
                    key={i}
                    className="flex flex-col items-start justify-between gap-1"
                  >
                    <div className="flex items-center justify-start gap-2">
                      <p className="w-16 text-sm font-black">{menu.menu}</p>
                      <StarBoard
                        use={false}
                        name={menu.menu}
                        point={Number(
                          ((menu.price + menu.amount + menu.taste) / 3).toFixed(
                            1,
                          ),
                        )}
                        act={false}
                      />
                    </div>
                    <div className="flex flex-col items-start justify-between gap-1 pl-2">
                      <StarBoard
                        use
                        name={`menuTaste${i}`}
                        showName="맛"
                        point={menu.taste}
                        act={false}
                      />
                      <StarBoard
                        use
                        name={`menuAmount${i}`}
                        showName="양"
                        point={menu.amount}
                        act={false}
                      />
                      <StarBoard
                        use
                        name={`menuPrice${i}`}
                        showName="가격"
                        point={menu.price}
                        act={false}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* reply */}
            <div className="flex w-full flex-col items-start justify-start gap-2.5">
              {replyArray.map((reply, i) => (
                <div
                  key={i}
                  className="flex w-full items-baseline justify-between "
                >
                  <div className="flex items-start justify-start gap-1">
                    <div className="flex items-center justify-between gap-1">
                      <div className="relative flex-none overflow-hidden rounded-full bg-mcl-ivory sm:h-5 sm:w-5">
                        {reply.user.image === '' ? (
                          <VscAccount className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 sm:text-[calc(5rem/4)]" />
                        ) : (
                          <>image</>
                        )}
                      </div>
                      <button className="text-sm font-bold">
                        {reply.user.nickname}
                      </button>
                    </div>
                    <p className="pt-0.5 text-xs text-mcl-999">{reply.reply}</p>
                  </div>
                  {reply.like ? (
                    <VscHeartFilled className={`flex-none fill-mcl-red`} />
                  ) : (
                    <VscHeart className={`flex-none`} />
                  )}
                </div>
              ))}
            </div>
            <div className="flex w-full items-stretch  justify-between gap-2 text-xs">
              <textarea
                placeholder="댓글 달기..."
                ref={textareaRef}
                value={textareaValue}
                onChange={onChangeTextarea}
                rows={1}
                className={`box-border w-full resize-none overflow-y-hidden rounded-sm border border-solid bg-transparent py-1 text-black outline-none transition-all duration-100 ease-in-out focus-within:border-mcl-orange hover:border-mcl-999 ${
                  textareaValue.length > 0
                    ? 'border-mcl-999'
                    : 'border-transparent'
                }`}
              />
              <button
                className={`flex-none rounded-sm bg-mcl-orange px-2 py-1 text-white ${
                  textareaValue !== '' ? 'visible' : 'invisible'
                }`}
              >
                게시
              </button>
            </div>
          </div>
        </div>
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
export default DiaryDetail
