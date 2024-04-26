import { VscEllipsis, VscHeart, VscComment } from 'react-icons/vsc'
import { useState } from 'react'
import StarBoard from './starBoard'
import ItemDiaryModal from './itemDiaryModal'

// interface ItemHomeProps {}

export default function ItemDiary() {
  const [restaurantPoint, setRestaurantPoint] = useState({
    name: '사루카메',
    point: 9,
  })
  const [menusPoint, setMenusPoint] = useState([
    { menu: '사루', taste: 3.9, amount: 5.7, price: 7.7 },
    { menu: '카메', taste: 8.8, amount: 9.7, price: 7 },
  ])
  const [modal, setModal] = useState(false)
  const onModal = () => {
    setModal((prev) => !prev)
  }
  return (
    <div className="relative box-border h-auto w-full border-t border-solid border-mcl-eee first:border-none">
      <div className="box-border flex h-auto w-full items-start justify-start gap-2 py-6">
        {/* contents card - pictures */}
        <div className=" relative h-0 w-1/2 flex-none overflow-hidden rounded pb-[calc(50%)] sm:w-52 sm:pb-52">
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
        <div className="flex h-40 w-full flex-col flex-nowrap items-start justify-between gap-1 sm:h-52 sm:gap-3">
          {/* contents card - texts - title */}
          <div className="flex w-full flex-col gap-0.5 sm:gap-2">
            <div className="relative flex items-center justify-between">
              <span className="text-ss sm:text-base">2023.09.7</span>
              <VscEllipsis
                onClick={() => onModal()}
                className="mr-1.5 text-xs sm:text-base"
              />
              <ItemDiaryModal view={modal} onModal={() => onModal()} />
            </div>
            <div className="flex w-full flex-col items-start justify-start gap-0.5 sm:gap-1">
              <h3 className="line-clamp-2 text-xs font-bold text-black sm:text-base">
                홍대에 있는 사루카메에 방문을 하여 보았다. 역시 맛있는 집,
                언제나 실패가 없는 맛집이다. 합정에 방문한다면 무조건 고민해
                봐야할 엄청난 라멘
              </h3>
              <p className="line-clamp-1 text-sm">
                평소에 즐겨먹던 라멘 중에 카메 라멘이 땡겨서 방문을 하였다.
                이번에는 사루 라멘을 시켜 보았다.
              </p>
            </div>
          </div>
          {/* contents card - texts - value */}
          <div className="flex h-full w-full flex-col items-stretch justify-between gap-1">
            <div className="flex flex-row items-start justify-start gap-2">
              <div className="w-6 flex-none text-ss sm:w-8 sm:text-sm">
                장소 :{' '}
              </div>
              <div className="flex-auto">
                <div className="flex flex-col gap-0.5 text-ss sm:flex-row sm:items-center sm:justify-stretch sm:gap-2 sm:text-sm">
                  <p className="text-black">{restaurantPoint.name}</p>
                  <div className="flex gap-0 text-mcl-orange">
                    <StarBoard
                      use={false}
                      act={false}
                      point={restaurantPoint.point}
                      name={restaurantPoint.name}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-row items-start justify-start gap-2">
              <div className="w-6 flex-none text-ss sm:w-8 sm:text-sm">
                메뉴 :{' '}
              </div>
              <div className="flex flex-auto flex-col items-start justify-start gap-1">
                {menusPoint.map((mp, i) =>
                  i < 2 ? (
                    <div
                      key={i}
                      className="flex flex-col gap-0.5 text-ss sm:flex-row sm:items-center sm:justify-stretch sm:gap-2 sm:text-sm"
                    >
                      <p className="text-black">{mp.menu}</p>
                      <div className="flex gap-0 text-mcl-orange">
                        <StarBoard
                          use={false}
                          act={false}
                          name={mp.menu}
                          point={Number(
                            ((mp.taste + mp.amount + mp.price) / 3).toFixed(1),
                          )}
                        />
                      </div>
                    </div>
                  ) : (
                    ''
                  ),
                )}
              </div>
            </div>
            {/* contents card - texts - icons */}
            <div className="flex h-auto items-center justify-between">
              <button
                className={`pl-8 text-ss text-mcl-999 sm:pl-10 sm:text-xs ${
                  menusPoint.length > 2 ? 'visible' : 'invisible'
                }`}
              >
                더보기
              </button>
              <div className="flex items-center justify-end gap-3 text-xs sm:text-lg">
                <span className="flex items-center justify-between gap-0.5">
                  <VscHeart />
                  <span className="text-ss text-mcl-999 sm:text-xs">20</span>
                </span>
                <span className="flex items-center justify-between gap-0.5">
                  <VscComment />
                  <span className="text-ss text-mcl-999 sm:text-xs">34</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
