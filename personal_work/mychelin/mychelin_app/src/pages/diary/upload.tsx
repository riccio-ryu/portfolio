import { NextPage } from 'next'
import { VscAdd } from 'react-icons/vsc'
import React, { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import schemaUploadDiaryYup from '@/utils/validationUploadDiaryYup'

import MenuNav from '@/components/menuNav'
import TopNav from '@/components/topNav'
import Layout from '@/components/layout'
import InputUpload from '@/components/inputUpload'
import StarBoard from '@/components/starBoard'
import MapModal from '@/components/mapModal'
import { useDropzone } from 'react-dropzone'
interface menuObj {
  menu: string
  taste: number
  amount: number
  price: number
}

interface UploadForm {
  visit: string
  restaurant: string
  restaurantStar: object
  menus: menuObj[]
  title?: string
  review?: string
}

interface reStarForm {
  [key: string]: number // key 의 타입, value 의 타입만 정의
}

interface restaurantInfoFrom {
  address_name: string
  category_group_code: string
  category_group_name: string
  category_name: string
  distance: string
  id: string
  phone: string
  place_name: string
  place_url: string
  road_address_name: string
  x: string
  y: string
}

const DiaryUpload: NextPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
    watch,
    setValue,
    getValues,
  } = useForm<UploadForm>({
    resolver: yupResolver<any>(schemaUploadDiaryYup),
    defaultValues: { menus: [] },
    mode: 'onChange',
  })

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': [],
    },
    onDrop: (acceptedFiles: File[]) => {
      if (files.length) {
        acceptedFiles.forEach((f) => {
          files.forEach(
            (fs) => fs.name !== f.name && setFiles([...files, f]),
            setPrevImg((prev) => prev.concat(URL.createObjectURL(f))),
          )
        })
      } else {
        setFiles(acceptedFiles)
        acceptedFiles.forEach((file) => {
          setPrevImg((prev) => prev.concat(URL.createObjectURL(file)))
        })
      }
    },
  })

  // const [visitDate, setVisitDate] = useState<Date>(new Date())
  // useEffect(() => {
  //   console.log(visitDate)
  // }, [visitDate])
  const [files, setFiles] = useState<File[]>([])
  const [prevImg, setPrevImg] = useState<string[]>([])
  const [mapToggle, setMapToggle] = useState(false)
  const onMapModalClose = () => {
    setMapToggle(false)
  }
  const [getRestaurantInfo, setGetRestaurantInfo] = useState(Object)
  const onMapModalSelect = (obj: restaurantInfoFrom) => {
    setGetRestaurantInfo(obj)
    setValue('restaurant', obj.place_name)
  }
  const [restaurantStar, setRestaurantStar] = useState<reStarForm>({
    service: 0,
    hygiene: 0,
    mood: 0,
    recommend: 0,
    revisit: 0,
  })
  const changeRestaurantStar = (sub: string, num: number) => {
    setRestaurantStar((prev) => {
      const newCondition = { ...prev }
      newCondition[sub] = num
      setValue('restaurantStar', newCondition)
      return newCondition
    })
  }
  useEffect(() => {
    if (getValues('menus').length < 1) addMenus()
  }, [watch()])

  //menulist add obj
  const addMenus = () => {
    setValue('menus', [
      ...getValues('menus'),
      { menu: '', taste: 0, amount: 0, price: 0 },
    ])
  }
  //menulist subtract obj
  const subtractMenus = (num: number) => {
    setValue(
      'menus',
      getValues('menus').filter((obj, idx) => idx !== num),
    )
  }
  // menulist star point update
  const starPointUpdate = (idx: number, sub: string, num: number) => {
    //idx -> 순서, sub -> 맛양 등, num -> 점수
    const copyArr = getValues('menus')
    if (sub === 'taste') {
      copyArr[idx].taste = num
    } else if (sub === 'amount') {
      copyArr[idx].amount = num
    } else if (sub === 'price') {
      copyArr[idx].price = num
    } else {
      console.log('sub err')
    }
  }

  const onSubmit = (data: UploadForm) => {
    console.log(data)
    console.log(files)
  }

  return (
    // diary detail page
    <div>
      {mapToggle ? (
        <MapModal
          onModal={() => onMapModalClose()}
          onSelect={(obj: object) => onMapModalSelect(obj)}
        />
      ) : (
        ''
      )}
      <Layout>
        <div className="mx-auto my-0 w-full pt-6 sm:w-[720px]">
          <h2 className="pb-4 text-center font-inter text-xl">Diary Upload</h2>
          <form
            className="flex h-auto w-full flex-col items-center justify-start gap-6"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="relative box-border h-0 min-w-full overflow-hidden overflow-x-auto pb-[50%]">
              <div className="absolute flex h-full w-max min-w-full flex-nowrap items-center justify-start gap-3">
                {prevImg.length
                  ? prevImg.map((pi, i) => {
                      return (
                        <div
                          key={i}
                          className="relative h-full w-1/2 max-w-[360px] flex-none overflow-hidden rounded border border-solid border-mcl-orange"
                        >
                          <img
                            src={pi}
                            alt={pi}
                            className="absolute left-1/2 top-1/2 w-full -translate-x-1/2 -translate-y-1/2 object-cover"
                          />
                        </div>
                      )
                    })
                  : ''}
                <div
                  {...getRootProps()}
                  className={`dropzone group flex flex-none flex-col items-center justify-center gap-1 border border-solid border-mcl-orange ${
                    prevImg.length
                      ? 'prev-have h-12 w-12 rounded-full bg-mcl-orange'
                      : 'mx-auto my-0 h-full w-1/2 rounded'
                  }`}
                >
                  <input {...getInputProps()} />
                  <VscAdd className="text-5xl text-mcl-orange group-[.prev-have]:text-2xl group-[.prev-have]:text-white" />
                  <p
                    className={`text-center text-ss text-mcl-999 group-[.prev-have]:hidden sm:text-sm`}
                  >
                    Drag & drop some files here, or click to select files
                  </p>
                </div>
              </div>
            </div>
            <div className="w-full">
              <InputUpload
                label="날짜"
                name="visit"
                type="text"
                tag="date"
                required
                err={errors.visit && errors.visit.message}
                register={register('visit')}
              />
              {/* <DatePicker selectDate={setVisitDate} placeHolder="choose!" /> */}
              <InputUpload
                label="가게이름"
                name="restaurant"
                type="text"
                tag="map"
                required
                err={errors.restaurant && errors.restaurant.message}
                register={register('restaurant')}
                btnClick={() => setMapToggle(true)}
                value={getRestaurantInfo.place_name || ''}
              />
              <div className="flex items-start justify-start pb-3">
                <span className="h-full w-1/5 bg-transparent sm:w-1/6"></span>
                <div className="flex flex-col items-stretch justify-between gap-1 sm:gap-2">
                  <StarBoard
                    use
                    name="서비스"
                    act
                    width={20}
                    point={restaurantStar.service}
                    starChange={(num) => changeRestaurantStar('service', num)}
                  />
                  <StarBoard
                    use
                    name="위생"
                    act
                    width={20}
                    point={restaurantStar.hygiene}
                    starChange={(num) => changeRestaurantStar('hygiene', num)}
                  />
                  <StarBoard
                    use
                    name="분위기"
                    act
                    width={20}
                    point={restaurantStar.mood}
                    starChange={(num) => changeRestaurantStar('mood', num)}
                  />
                  <StarBoard
                    use
                    name="추천"
                    act
                    width={20}
                    point={restaurantStar.recommend}
                    starChange={(num) => changeRestaurantStar('recommend', num)}
                  />
                  <StarBoard
                    use
                    name="재방문의사"
                    act
                    width={20}
                    point={restaurantStar.revisit}
                    starChange={(num) => changeRestaurantStar('revisit', num)}
                  />
                </div>
              </div>

              {watch('menus').map((mn, i) => (
                <React.Fragment key={i}>
                  <InputUpload
                    label={`메뉴`}
                    name={`menu${i}`}
                    type="text"
                    required
                    err={errors.menus?.[i]?.menu && errors.menus?.[i]?.message}
                    add={`${i ? 'minus' : 'plus'}`}
                    register={register(`menus.${i}.menu`)}
                    btnClick={() => {
                      if (i) {
                        subtractMenus(i)
                      } else {
                        addMenus()
                      }
                    }}
                  />
                  <div className="flex items-start justify-start pb-3">
                    <span className="h-full w-1/5 bg-transparent sm:w-1/6"></span>
                    <div className="flex flex-col items-stretch justify-between gap-1 sm:gap-2">
                      <StarBoard
                        use
                        name="맛"
                        width={20}
                        point={mn.taste}
                        depth={i}
                        starChange={(num) => starPointUpdate(i, 'taste', num)}
                      />
                      <StarBoard
                        use
                        name="양"
                        width={20}
                        point={mn.amount}
                        depth={i}
                        starChange={(num) => starPointUpdate(i, 'amount', num)}
                      />
                      <StarBoard
                        use
                        name="가격"
                        width={20}
                        point={mn.price}
                        depth={i}
                        starChange={(num) => starPointUpdate(i, 'price', num)}
                      />
                    </div>
                  </div>
                </React.Fragment>
              ))}

              <InputUpload
                label="제목"
                name="title"
                type="text"
                register={register('title')}
              />
              <InputUpload
                label="리뷰 내용"
                name="review"
                type="text"
                tag="textarea"
                register={register('review')}
              />
            </div>
            <div className="w-full">
              <button
                className="mx-auto block w-full rounded-[4px] bg-mcl-orange px-9 py-2 text-xs text-white sm:w-32 sm:py-3 sm:text-base"
                type="submit"
              >
                저장
              </button>
            </div>
          </form>
        </div>
      </Layout>

      {/* top */}
      <TopNav />

      {/* nav - phone */}
      <MenuNav navNow="Diary" />
    </div>
  )
}
export default DiaryUpload
