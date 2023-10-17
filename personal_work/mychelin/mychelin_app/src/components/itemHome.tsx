import { useRef, useState } from 'react'

import {
  VscAccount,
  VscEllipsis,
  VscHeart,
  VscComment,
  VscLink,
  VscBookmark,
  VscStarEmpty,
  VscStarFull,
  VscStarHalf,
} from 'react-icons/vsc'

// interface ItemHomeProps {}

export default function ItemHome() {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null)
  const [textareaValue, setTextareaValue] = useState('')

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
    <div className="relative box-border h-auto w-full sm:w-1/2">
      <div className="box-border flex h-auto w-full flex-col items-start justify-start gap-2 px-0 py-4 sm:p-6">
        {/* contents card - head */}
        <div className="flex w-full items-center justify-between">
          <div className="flex flex-row items-center justify-start gap-2.5">
            <div className="relative h-8 w-8 overflow-hidden rounded-full bg-mcl-ivory sm:h-10 sm:w-10">
              {/* <img src="" alt="" /> */}
              <VscAccount className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[32px] sm:text-[calc(1rem*5/2)]" />
            </div>
            <div className="flex items-center justify-start gap-1 text-sm">
              <div>name</div>
              <span className="h-0.5 w-0.5 rounded-full bg-black"></span>
              <div>time</div>
            </div>
          </div>
          <VscEllipsis />
        </div>
        {/* contents card - pictures */}
        <div className="relative h-0 w-full overflow-hidden rounded pb-[100%]">
          <div className="absolute left-0 top-0 h-full w-full bg-gray-400">
            <img src="" alt="" />
          </div>
          <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 items-center justify-center gap-1">
            {/* dots */}
            <p className="h-1 w-1 rounded-full bg-mcl-ivory"></p>
            <p className="h-1 w-1 rounded-full bg-mcl-ivory"></p>
            <p className="h-1 w-1 rounded-full bg-black"></p>
          </div>
        </div>
        {/* contents card - texts */}
        <div className="flex w-full flex-col gap-2.5">
          {/* contents card - texts - title */}
          <div className="flex flex-col gap-1">
            <h3 className="line-clamp-2 text-xs font-bold text-black sm:text-base">
              오레노 라멘 본점(합정)에 방문을 하여 보았다. 역시 맛있는 집,
              언제나 실패가 없는 맛집이다. 합정에 방문한다면 무조건 고민해
              봐야할 엄청난 라멘
            </h3>
            <p className="line-clamp-1 text-ss sm:text-sm">
              평소에 즐겨먹던 라멘 중에 토리 파이탄이 땡겨서 방문을 하였다.
              이번에는 카라파이탄을 시켜 보았다.
            </p>
          </div>
          {/* contents card - texts - icons */}
          <div className="flex h-auto items-center justify-start gap-3 text-lg">
            <VscHeart />
            <VscComment />
            <VscLink />
            <VscBookmark />
          </div>
          {/* contents card - texts - value */}
          <div className="flex flex-col items-stretch justify-start  font-noto_sans_kr">
            <div className="flex flex-row items-start justify-start gap-2">
              <div className="text-ss sm:text-sm">장소 : </div>
              <div className="flex-auto">
                <div className="flex flex-row items-center justify-stretch gap-2 text-sm">
                  <p className="text-ss text-black sm:text-base">오레노 라멘</p>
                  <div className="flex gap-0 text-mcl-orange">
                    <VscStarFull />
                    <VscStarFull />
                    <VscStarHalf />
                    <VscStarEmpty />
                    <VscStarEmpty />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-row items-start justify-start gap-2">
              <div className="text-ss sm:text-sm">메뉴 : </div>
              <div className="flex-auto">
                <div className="flex flex-row items-center justify-stretch gap-2 text-sm">
                  <p className="text-ss text-black sm:text-base">
                    토리 파이탄 라멘
                  </p>
                  <div className="flex gap-0 text-mcl-orange">
                    <VscStarFull />
                    <VscStarFull />
                    <VscStarHalf />
                    <VscStarEmpty />
                    <VscStarEmpty />
                  </div>
                </div>
                <div className="flex flex-row items-center justify-stretch gap-2 text-sm">
                  <p className="text-ss text-black sm:text-base">
                    카라 파이탄 라멘
                  </p>
                  <div className="flex gap-0 text-mcl-orange">
                    <VscStarFull />
                    <VscStarFull />
                    <VscStarEmpty />
                    <VscStarEmpty />
                    <VscStarEmpty />
                  </div>
                </div>
                <div className="flex flex-row items-center justify-stretch gap-2 text-sm">
                  <p className="text-ss text-black sm:text-base">차슈 추가</p>
                  <div className="flex gap-0 text-mcl-orange">
                    <VscStarFull />
                    <VscStarFull />
                    <VscStarFull />
                    <VscStarFull />
                    <VscStarEmpty />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* reply */}
          <div className="flex flex-col items-start justify-stretch gap-2">
            <div className="flex w-full flex-row items-center justify-start gap-1">
              <div className="relative h-5 w-5 flex-none overflow-hidden rounded-full bg-mcl-ivory text-[calc(1rem*5/4)]">
                {/* <img src="" alt="" /> */}
                <VscAccount className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
              </div>
              <p className="flex-none text-xs font-bold sm:text-sm">
                라멘 메니아
              </p>
              <pre className="line-clamp-1 text-ss text-mcl-999 sm:text-xs">
                {`아 여기 가보고 싶었는데... 아 여기 가보고 싶었는데... 아 여기 가보고 싶었는데... 
좋은 정보 잘 보고 갑니다. 
저도 한번 방문해 보겠습니다.`}
              </pre>
            </div>
          </div>
          <div>
            <button className="text-sm font-medium text-mcl-999">
              댓글 N개 모두 보기
            </button>
          </div>
          <div className="bg-red flex w-full items-stretch  justify-between gap-2 text-xs">
            <textarea
              placeholder="댓글 달기..."
              ref={textareaRef}
              value={textareaValue}
              onChange={onChangeTextarea}
              rows={1}
              className="box-border w-full resize-none bg-transparent py-1 text-black outline-none"
            />
            <button
              className={`flex-none p-1 text-mcl-orange ${
                textareaValue !== '' ? 'block' : 'hidden'
              }`}
            >
              게시
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
