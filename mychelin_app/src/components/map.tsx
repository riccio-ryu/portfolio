import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  VscAdd,
  VscBookmark,
  VscChromeMinimize,
  VscClose,
  VscLocation,
  VscPerson,
  VscSaveAs,
  VscSearch,
  VscTarget,
} from 'react-icons/vsc'
import { deviceSize, geoInfo } from '@/atoms'
import { useRecoilState, useRecoilValue } from 'recoil'
// import '../styles/mapModal.module.css'
// declare global {
//   interface Window {
//     kakao: any
//   }
// }
// head에 작성한 Kakao API 불러오기
// const { kakao } = window as any

interface mapProp {
  purpose: 'modal' | 'page'
  //modal
  onSelect?(o: object): void
  onKeywordModal?(o: object): void
  // page
}

interface keywordForm {
  keyword?: string
}

interface placeType {
  place_name: string
  road_address_name: string
  address_name: string
  phone: string
  place_url: string
  id: string
}

export default function MapKaKao({
  purpose,
  onSelect,
  onKeywordModal,
}: mapProp) {
  const { register, handleSubmit, reset } = useForm<keywordForm>()

  // 마커를 담는 배열
  let markers: any[] = []

  // 검색어 저장
  const [keyword, setKeyword] = useState('')
  // map lev
  const [mapLev, setMapLev] = useState(3)
  // map type
  const [mapType, setMapType] = useState('roadmap')
  // keyword 검색 없는 방문 확인
  const [first, setFirst] = useState(false)
  // select object
  const [selectId, sstSelectId] = useState('')
  //data's
  const [resultData, setResultData] = useState(Object)
  const [selectData, setSelectData] = useState(Object)
  //geo
  const [{ geoLat, geoLon }, setGeo] = useRecoilState(geoInfo)
  // current location state
  const [currentLocation, setCurrentLocation] = useState(true)
  // side list btn
  const [sideListShow, setSideListShow] = useState(true)

  // device size
  const device = useRecoilValue(deviceSize)

  // 검색어 삭제
  const deleteKeyword = () => {
    setKeyword('')
    reset()
    document.getElementById('placesList')?.replaceChildren()
    document.getElementById('pagination')?.replaceChildren()
  }

  // 가게 선택시에 state set
  const selectInfoBox = (id: string) => {
    sstSelectId(id)
  }

  //geo
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        setGeo({
          geoLat: position.coords.latitude,
          geoLon: position.coords.longitude,
        })
      })
    } else {
      //
    }
  }, [])

  // 검색어가 바뀔 때마다 재렌더링되도록 useEffect 사용
  useEffect(() => {
    window.kakao.maps.load(() => {
      const mapContainer = document.getElementById('map')
      const mapOption = {
        center: new window.kakao.maps.LatLng(geoLat, geoLon), // 지도의 중심좌표
        level: mapLev, // 지도의 확대 레벨
      }

      // 지도를 생성
      const map = new window.kakao.maps.Map(mapContainer!, mapOption)

      // map controller
      if (mapType === 'roadmap') {
        map.setMapTypeId(kakao.maps.MapTypeId.ROADMAP)
      } else {
        map.setMapTypeId(kakao.maps.MapTypeId.HYBRID)
      }
      map.setLevel(mapLev)

      //map controller
      // const width = window.innerWidth
      // console.log('ch ::', device, width)

      // const mapTypeControl = new window.kakao.maps.MapTypeControl()
      // const zoomControl = new window.kakao.maps.ZoomControl()

      // map.removeControl(window.kakao.maps.MapTypeControl)
      // map.removeControl(zoomControl)
      // if (device === 'pc' && width > 680) {
      //   map.addControl(
      //     mapTypeControl,
      //     window.kakao.maps.ControlPosition.TOPRIGHT,
      //   )
      //   map.addControl(
      //     zoomControl,
      //     window.kakao.maps.ControlPosition.BOTTOMRIGHT,
      //   )
      // }

      // // drag 가능
      // map.setDraggable(true)

      /* 현재위치 표시 */
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
          const lat = position.coords.latitude, // 위도
            lon = position.coords.longitude // 경도
          setGeo({ geoLat: lat, geoLon: lon })
          const locPosition = new kakao.maps.LatLng(lat, lon)
          displayMarker(locPosition)
        })
      } else {
        displayMarker(new kakao.maps.LatLng(geoLat, geoLon))
      }
      // 지도에 마커와 인포윈도우를 표시하는 함수입니다
      function displayMarker(locPosition: kakao.maps.LatLng) {
        // 마커를 생성합니다
        const marker = new kakao.maps.Marker({
          map: map,
          position: locPosition,
        })
        marker.setPosition(locPosition)
        // 지도 중심좌표를 접속위치로 변경합니다

        if (currentLocation) {
          map.panTo(locPosition)
          setCurrentLocation(false)
        }
      }
      /* 현재위치 표시 종료 */

      // 장소 검색 객체를 생성
      const ps = new window.kakao.maps.services.Places()

      // 검색 결과 목록이나 마커를 클릭했을 때 장소명을 표출할 인포윈도우를 생성
      const infowindow = new window.kakao.maps.InfoWindow({ zIndex: 1 })

      // 키워드로 장소를 검색합니다
      if (!first) {
        setFirst(true)
      } else {
        searchPlaces()
      }

      // 키워드 검색을 요청하는 함수
      function searchPlaces() {
        if (!keyword.replace(/^\s+|\s+$/g, '') && first) {
          return false
        }
        // 장소검색 객체를 통해 키워드로 장소검색을 요청
        ps.keywordSearch(keyword, placesSearchCB)
      }

      // 장소검색이 완료됐을 때 호출되는 콜백함수
      function placesSearchCB(data: object[], status: string, pagination: any) {
        if (status === window.kakao.maps.services.Status.OK) {
          // 정상적으로 검색이 완료됐으면
          // 검색 목록과 마커를 표출
          displayPlaces(data)
          setResultData(data)
          // 페이지 번호를 표출
          displayPagination(pagination)
        } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
          alert('검색 결과가 존재하지 않습니다.')
          return
        } else if (status === window.kakao.maps.services.Status.ERROR) {
          alert('검색 결과 중 오류가 발생했습니다.')
          return
        }
      }

      // 검색 결과 목록과 마커를 표출하는 함수
      function displayPlaces(places: string | any[]) {
        const listEl = document.getElementById('placesList'),
          resultEl = document.getElementById('search-result'),
          fragment = document.createDocumentFragment(),
          bounds = new window.kakao.maps.LatLngBounds()

        // 검색 결과 목록에 추가된 항목들을 제거
        listEl && removeAllChildNods(listEl)

        // 지도에 표시되고 있는 마커를 제거
        removeMarker()

        for (let i = 0; i < places.length; i++) {
          // 마커를 생성하고 지도에 표시
          const placePosition = new window.kakao.maps.LatLng(
              places[i].y,
              places[i].x,
            ),
            marker = addMarker(placePosition, i, undefined),
            itemEl = getListItem(i, places[i]) // 검색 결과 항목 Element를 생성

          // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
          // LatLngBounds 객체에 좌표를 추가
          bounds.extend(placePosition)

          // 마커와 검색결과 항목에 mouseover 했을때
          // 해당 장소에 인포윈도우에 장소명을 표시
          // mouseout 했을 때는 인포윈도우를 닫기
          ;(function (marker, title) {
            window.kakao.maps.event.addListener(
              marker,
              'mouseover',
              function () {
                displayInfowindow(marker, title)
              },
            )

            window.kakao.maps.event.addListener(
              marker,
              'mouseout',
              function () {
                infowindow.close()
              },
            )

            // marker click event
            window.kakao.maps.event.addListener(marker, 'click', function () {
              // console.log('mclick', marker, title, places[i])
              selectInfoBox(places[i].id)
            })

            itemEl.onmouseover = function () {
              displayInfowindow(marker, title)
            }

            itemEl.onmouseout = function () {
              infowindow.close()
            }
          })(marker, places[i].place_name)

          fragment.appendChild(itemEl)
        }

        // 검색결과 항목들을 검색결과 목록 Element에 추가
        listEl && listEl.appendChild(fragment)
        if (resultEl) {
          resultEl.scrollTop = 0
        }

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정
        map.setBounds(bounds)
      }

      // 검색결과 항목을 Element로 반환하는 함수
      // href="${places.place_url}"
      function getListItem(index: number, places: placeType) {
        const el = document.createElement('li')
        const itemStr = `
        <span class="marker marker_${index + 1}">
          ${index + 1}
        </span>
          <div class="info" id="${places.id}">
            <div class="info-box ${
              selectId === places.id ? 'info-box-selected' : ''
            }">
              <h5 class="info-item place-name">${places.place_name}</h5>
              ${
                places.road_address_name
                  ? `<span class="info-item road-address-name">
                    ${places.road_address_name}
                   </span>
                   <p class="info-item address-name">
                   <span class="jibun">지번</span>
                 	 <span class="gray">${places.address_name}</span>
               	   </p>`
                  : `<span class="info-item no-road-address-name">
             	     ${places.address_name}
                  </span>`
              }
              <span class="info-item tel">
                ${places.phone}
              </span>
            </div>
          </div>
          `
        // onclick="selectInfoBox(${places.id})"
        el.innerHTML = itemStr
        el.className = 'item'
        el.onclick = function () {
          selectInfoBox(places.id)
        }
        return el
      }

      // 마커를 생성하고 지도 위에 마커를 표시하는 함수
      function addMarker(position: any, idx: number, title: undefined) {
        const imageSrc =
            'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png', // 마커 이미지 url, 스프라이트 이미지
          imageSize = new window.kakao.maps.Size(36, 37), // 마커 이미지의 크기
          imgOptions = {
            spriteSize: new window.kakao.maps.Size(36, 691), // 스프라이트 이미지의 크기
            spriteOrigin: new window.kakao.maps.Point(0, idx * 46 + 10), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
            offset: new window.kakao.maps.Point(13, 37), // 마커 좌표에 일치시킬 이미지 내에서의 좌표
          },
          markerImage = new window.kakao.maps.MarkerImage(
            imageSrc,
            imageSize,
            imgOptions,
          ),
          marker = new window.kakao.maps.Marker({
            position: position, // 마커의 위치
            image: markerImage,
            clickable: true,
          })

        marker.setMap(map) // 지도 위에 마커를 표출
        markers.push(marker) // 배열에 생성된 마커를 추가

        return marker
      }

      // 지도 위에 표시되고 있는 마커를 모두 제거합니다
      function removeMarker() {
        for (let i = 0; i < markers.length; i++) {
          markers[i].setMap(null)
        }
        markers = []
      }

      // 검색결과 목록 하단에 페이지번호를 표시는 함수
      function displayPagination(pagination: {
        last: number
        current: number
        gotoPage: (arg0: number) => void
      }) {
        const paginationEl = document.getElementById(
          'pagination',
        ) as HTMLElement
        const fragment = document.createDocumentFragment()
        let i

        // 기존에 추가된 페이지번호를 삭제
        while (paginationEl.hasChildNodes()) {
          paginationEl.lastChild &&
            paginationEl.removeChild(paginationEl.lastChild)
        }

        for (i = 1; i <= pagination.last; i++) {
          const el = document.createElement('a') as HTMLAnchorElement
          el.href = '#'
          el.innerHTML = i.toString()

          if (i === pagination.current) {
            el.className = 'on'
          } else {
            el.onclick = (function (i) {
              return function () {
                pagination.gotoPage(i)
              }
            })(i)
          }

          fragment.appendChild(el)
        }
        paginationEl.appendChild(fragment)
      }

      // 검색결과 목록 또는 마커를 클릭했을 때 호출되는 함수
      // 인포윈도우에 장소명을 표시
      function displayInfowindow(marker: any, title: string) {
        const content =
          '<div style="padding:5px;z-index:1;" class="marker-title">' +
          title +
          '</div>'

        infowindow.setContent(content)
        infowindow.open(map, marker)
      }

      // 검색결과 목록의 자식 Element를 제거하는 함수
      function removeAllChildNods(el: HTMLElement) {
        while (el.hasChildNodes()) {
          el.lastChild && el.removeChild(el.lastChild)
        }
      }
    })
  }, [keyword, device, mapLev, mapType, currentLocation])

  // 선택된 가게
  useEffect(() => {
    if (selectId === '') return
    const result = resultData?.filter((t: { id: string }) => {
      return t.id === selectId
    })
    setSelectData(result)
  }, [selectId])

  // 선택된 가게의 정보 변경시에
  useEffect(() => {
    onSelect?.(selectData)
  }, [selectData])
  // keyword input search click
  const onValid = (data: keywordForm) => {
    if (data.keyword === '') {
      return onKeywordModal?.({
        show: true,
        wording: '검색어를 입력해주세요.',
        answer: '닫기',
      })
    }
    setKeyword(data.keyword!)
  }

  // current location click
  const onCurrentLocation = () => {
    setCurrentLocation(true)
  }

  // side list show click
  const onShowSideList = () => {
    setSideListShow((pre) => !pre)
  }

  return (
    <>
      {/* map output */}
      <div
        className={`relative h-full w-full overflow-hidden sm:rounded ${
          purpose === 'modal' && 'sm:border sm:border-solid sm:border-mcl-ivory'
        }`}
      >
        {/* map */}
        <div id="map" className="h-full w-full bg-gray-700"></div>
        {/* <!-- 지도타입 컨트롤 div 입니다 --> */}
        <div className="absolute right-2 top-2 z-[1] box-border hidden h-8 w-32 items-center justify-between overflow-hidden rounded-lg border border-solid border-mcl-ccc bg-mcl-eee text-center sm:flex">
          <span
            id="btnRoadmap"
            className={`h-full flex-1 content-center ${
              mapType === 'roadmap'
                ? 'bg-mcl-orange text-white hover:bg-orange-600'
                : 'hover:bg-zinc-200'
            }`}
            onClick={() => setMapType('roadmap')}
          >
            지도
          </span>
          <span
            id="btnSkyview"
            className={`h-full flex-1 content-center ${
              mapType === 'skyview'
                ? 'bg-mcl-orange text-white hover:bg-orange-600'
                : 'hover:bg-zinc-200'
            }`}
            onClick={() => setMapType('skyview')}
          >
            스카이뷰
          </span>
        </div>
        {/* <!-- 지도 확대, 축소 컨트롤 div 입니다 --> */}
        <div className="absolute bottom-8 right-2 z-[1] box-border hidden h-20 w-10 flex-col items-center justify-between divide-y divide-solid divide-mcl-ccc overflow-hidden rounded-lg border border-solid border-mcl-ccc bg-mcl-eee text-center sm:flex">
          <span
            className={`group flex h-full w-full flex-1 content-center items-center justify-center text-xl hover:bg-mcl-999`}
            onClick={() => setMapLev((pre) => (pre > 1 ? --pre : 1))}
          >
            <VscAdd className="group-hover:text-white" />
          </span>
          <span
            className={`group flex h-full w-full flex-1 content-center items-center justify-center text-xl hover:bg-mcl-999`}
            onClick={() => setMapLev((pre) => (pre < 14 ? ++pre : 14))}
          >
            <VscChromeMinimize className="group-hover:text-white" />
          </span>
        </div>
        {/* search list */}
        <div
          className={`absolute bottom-0 left-0 z-[1] flex h-1/3 w-full flex-col items-start justify-stretch bg-transparent transition-all duration-500 ease-in-out sm:top-0 sm:ml-16 sm:h-full sm:w-1/3 sm:flex-row-reverse sm:items-center ${
            sideListShow
              ? 'left-0'
              : '-bottom-[calc(33.33%-2rem)] sm:-left-[calc(33.33%-2rem)]'
          }`}
        >
          {/* btn list show */}
          <div className="relative flex items-start justify-start sm:flex-col sm:items-center sm:justify-center">
            <button
              className="flex h-6 w-20 flex-none items-center justify-center rounded-t-md border-2 border-b border-neutral-300 bg-white text-center sm:h-20 sm:w-8 sm:rounded-r-lg sm:rounded-tl-none sm:border-l sm:border-solid sm:border-l-neutral-200 sm:[writing-mode:vertical-lr]"
              onClick={onShowSideList}
            >{`${sideListShow ? '닫기↓' : '열기↑'}`}</button>
          </div>
          <div className="flex h-full w-full flex-1 flex-col items-start justify-start gap-0 overflow-y-auto rounded bg-white sm:rounded-none sm:shadow-[10px_0px_15px_-7px_rgba(0,0,0,0.3)]">
            <div className="hidden h-10 w-full flex-none sm:block">
              key blank
            </div>
            <div
              id="map_wrap"
              className="h-full w-full sm:border-t sm:border-solid sm:border-mcl-ccc"
            >
              <div id="search-result">
                {/* {keyword.length > 0 && (
                      <p className="result-text">
                        <span className="result-keyword">{keyword}</span>
                        검색 결과
                      </p>
                    )} */}
                <div className="scroll-wrapper">
                  <ul id="placesList"></ul>
                </div>
                <div id="pagination"></div>
              </div>
            </div>
          </div>
        </div>
        {/* keyword input */}
        <div
          className={`absolute left-1/2 top-2 z-[1] h-7 w-11/12  -translate-x-1/2 border-solid border-mcl-eee bg-transparent transition-all duration-500 ease-in-out sm:left-0 sm:top-0 sm:ml-16 sm:h-10 sm:w-1/3 sm:translate-x-0 sm:border sm:border-none sm:pr-8 ${
            sideListShow ? 'sm:left-0' : 'sm:-left-[calc(33.33%-2rem)]'
          }`}
        >
          <form
            onSubmit={handleSubmit(onValid)}
            className="relative flex h-full items-stretch justify-start gap-1 rounded bg-white px-2 py-1 sm:p-2"
          >
            {/* 키워드 : */}
            <input
              {...register('keyword')}
              type="text"
              defaultValue={keyword}
              id="keyword"
              className="flex-1 px-1"
              placeholder="음식점을 입력해주세요."
            />
            {keyword.length > 0 && (
              <button
                type="button"
                onClick={deleteKeyword}
                className="absolute right-9 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-mcl-333 text-sm"
              >
                <VscClose className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-ss text-white" />
              </button>
            )}
            <button type="submit">
              <VscSearch className="text-xl" />
            </button>
          </form>
        </div>
        {/* now position icon */}
        <div
          className={`absolute right-28 z-[1] flex items-center justify-center rounded-lg border border-solid border-mcl-ccc bg-mcl-eee shadow-lg transition-all duration-500 ease-in-out sm:bottom-32 sm:right-2 sm:h-10 sm:w-10 ${
            sideListShow ? 'bottom-[calc(33.33%-1.4rem)]' : '-bottom-10'
          }`}
        >
          <button className="text-2xl" onClick={onCurrentLocation}>
            <VscTarget />
          </button>
        </div>
        {/* left subject list */}
        <div
          className={`absolute right-0.5  z-[1] flex items-center justify-start divide-x border-solid border-mcl-eee bg-white transition-all duration-500 ease-in-out sm:bottom-auto sm:left-0 sm:right-auto sm:top-0 sm:h-full sm:w-16 sm:flex-col ${
            purpose === 'modal' ? 'hidden sm:border-r' : 'sm:border-r-2'
          } ${
            sideListShow
              ? 'bottom-[calc(33.33%-1.5rem)] border-2 sm:border-y-0 sm:border-l-0'
              : '-bottom-10'
          }`}
        >
          <button className="flex h-6 w-full flex-col items-center justify-center sm:h-16">
            <VscLocation className="text-2xl sm:text-4xl" />
            <p className="hidden sm:block sm:text-xs">지도 홈</p>
          </button>
          <button className="flex h-6 w-full flex-col items-center justify-center sm:h-16">
            <VscSaveAs className="text-2xl sm:text-4xl" />
            <p className="hidden sm:block sm:text-xs">방문</p>
          </button>
          <button className="flex h-6 w-full flex-col items-center justify-center sm:h-16">
            <VscBookmark className="text-2xl sm:text-4xl" />
            <p className="hidden sm:block sm:text-xs">북마크</p>
          </button>
          <button className="flex h-6 w-full flex-col items-center justify-center sm:h-16">
            <VscPerson className="text-2xl sm:text-4xl" />
            <p className="hidden sm:block sm:text-xs">팔로워</p>
          </button>
        </div>
      </div>
      {/* map output end */}
    </>
  )
}
