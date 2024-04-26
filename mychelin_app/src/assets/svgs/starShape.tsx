interface StarProp {
  item: string
  idx: number
  w?: number
}

export default function StarShape({ item, idx, w = 20 }: StarProp) {
  // console.log(item, idx)
  return (
    <div className="m-0 flex items-center">
      <span className="star_icon mr-1 inline-flex">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={w}
          height={w}
          viewBox="0 0 14 13"
          fill="#ccc"
        >
          <clipPath id={`${item}StarClip`}>
            <rect width={`${idx}`} height="14" />
            {/* width 와 height는 14를 기준으로 100% 즉 반절을 채우고 싶다면 14 * 1/2, 1/3을 채우고 싶다면 14 * 1/3을 해준다 */}
          </clipPath>
          <path
            id={`${item}Star`}
            d="M9,2l2.163,4.279L16,6.969,12.5,10.3l.826,4.7L9,12.779,4.674,15,5.5,10.3,2,6.969l4.837-.69Z"
            transform="translate(-2 -2)"
          />
          <use
            clipPath={`url(#${item}StarClip)`}
            href={`#${item}Star`}
            fill="#FF5B00"
          />
        </svg>
      </span>
    </div>
  )
}
