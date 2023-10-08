import { memo, useEffect, useRef, useState } from 'react'

interface StarProps {
  use: boolean // star point use :: total(false) or personal(true)
  cnt?: number // 0 act star, 1~5 show star
  width: number // star width
  name: string
  depth?: number // stars group depth
  setNumber(r: string): void
}

export default memo(function StarPoint({
  use,
  cnt = 0,
  width,
  name,
  depth,
  setNumber,
}: StarProps) {
  const [rate, setRate] = useState(cnt)

  const starIdx = ['first', 'second', 'third', 'fourth', 'last']
  const [starRate, setStarRate] = useState([0, 0, 0, 0, 0])
  const calcStarRates = () => {
    const starRatesArr = [0, 0, 0, 0, 0]
    let starVerScore = (rate * 70) / 100
    let idx = 0
    while (starVerScore > 14) {
      starRatesArr[idx] = 14
      idx += 1 // 인덱스 0부터 첫번째 별
      starVerScore -= 14
    }
    starRatesArr[idx] = starVerScore
    return starRatesArr // 평균이 80이라면 [14, 14, 14, 14, 0]
  }
  useEffect(() => {
    setStarRate(calcStarRates) // 별점 리스트는 첫 렌더링 때 한번만 상태를 설정해줍니다.
    const fx = Number(Number(rate / 10).toFixed(1))

    setNumber(rate ? String(fx) : '0')
  }, [rate])

  useEffect(() => {
    setRate(cnt * 10)
  }, [cnt])

  const refPoints = useRef<HTMLDivElement>(null)
  const clickPoint = (e: Event | undefined) => {
    const mouseEvent = e as MouseEvent
    const rect = refPoints.current
      ? refPoints.current.getBoundingClientRect().x
      : 0

    setRate(mouseEvent.clientX - rect)
  }

  return (
    <div
      className="flex flex-wrap items-center justify-between gap-0"
      onClick={() => use && clickPoint(event)}
      ref={refPoints}
    >
      {starIdx.map((star, i) => {
        return (
          <div key={i} className="m-0 flex items-center">
            <span className="star_icon inline-flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={width}
                height={width}
                viewBox="0 0 14 13"
                fill="#ccc"
              >
                <clipPath id={`${name + (depth ? depth : '') + star}StarClip`}>
                  <rect width={`${starRate[i]}`} height="14" />
                  {/* width 와 height는 14를 기준으로 100% 즉 반절을 채우고 싶다면 14 * 1/2, 1/3을 채우고 싶다면 14 * 1/3을 해준다 */}
                </clipPath>
                <path
                  id={`${name + (depth ? depth : '') + star}Star`}
                  d="M9,2l2.163,4.279L16,6.969,12.5,10.3l.826,4.7L9,12.779,4.674,15,5.5,10.3,2,6.969l4.837-.69Z"
                  transform="translate(-2 -2)"
                />
                <use
                  clipPath={`url(#${
                    name + (depth ? depth : '') + star
                  }StarClip)`}
                  href={`#${name + (depth ? depth : '') + star}Star`}
                  fill="#FF5B00"
                />
              </svg>
            </span>
          </div>
        )
      })}
    </div>
  )
})
