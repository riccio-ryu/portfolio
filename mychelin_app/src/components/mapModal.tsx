import { useEffect, useState } from 'react'
import { VscClose } from 'react-icons/vsc'
import ModalOne from './modalOne'
import Map from './map'

interface mapModal {
  onModal(): void
  onSelect?(txt: object): void
}

export default function MapModal({ onModal, onSelect }: mapModal) {
  // modal scroll block
  useEffect(() => {
    document.body.style.cssText = `
      position: fixed; 
      top: -${window.scrollY}px;
      overflow-y: scroll;
      width: 100%;`
    return () => {
      const scrollY = document.body.style.top
      document.body.style.cssText = ''
      window.scrollTo(0, parseInt(scrollY || '0', 10) * -1)
    }
  }, [])

  // 가게 데이터
  const [restaurantData, setRestaurantData] = useState(Object)
  // keyword empty modal
  const [noKeywordModal, setNoKeywordModal] = useState({
    show: false,
    wording: '',
    answer: '',
  })

  // 가게 데이터
  // useEffect(() => {
  //   console.log(restaurantData)
  // }, [restaurantData])

  return (
    <>
      <div className="fixed left-0 top-0 z-50 h-full w-full" id="map_modal">
        <div
          className="relative h-full w-full bg-black opacity-50"
          onClick={onModal}
        ></div>
        <div
          className="absolute left-1/2 top-1/2 flex h-screen min-h-[60%] w-full -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-between bg-white sm:h-3/4 sm:w-3/4 sm:gap-1 sm:rounded sm:px-5 sm:py-5"
          id="map_wrap"
        >
          <div className="flex w-full justify-end">
            <button type="button" onClick={onModal}>
              <VscClose className="text-xl" />
            </button>
          </div>
          <Map
            purpose="modal"
            onSelect={setRestaurantData}
            onKeywordModal={setNoKeywordModal}
          />
          <div className="fixed bottom-[calc(100%/3)] z-10 flex w-11/12 items-center justify-between gap-1 sm:relative sm:bottom-0 sm:z-0 sm:w-1/3 sm:gap-3">
            <input
              className="h-7 w-full rounded border border-mcl-yellow"
              type="text"
              readOnly
              value={restaurantData.length ? restaurantData[0].place_name : ''}
            />
            <button
              type="button"
              className="h-7 w-10 flex-none rounded bg-mcl-orange p-1 text-white"
              onClick={() => {
                onSelect?.(restaurantData[0])
                onModal()
              }}
            >
              확인
            </button>
          </div>
        </div>
      </div>
      {noKeywordModal.show && (
        <ModalOne
          wording={noKeywordModal.wording}
          answer={noKeywordModal.answer}
          onClose={() =>
            setNoKeywordModal({ show: false, wording: '', answer: '' })
          }
        />
      )}
    </>
  )
}
