import { NextPage } from 'next'
import { VscAdd } from 'react-icons/vsc'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import schemaUploadDiaryYup from '@/components/validationUploadDiaryYup'

import MenuNav from '@/components/menuNav'
import TopNav from '@/components/topNav'
import Layout from '@/components/layout'
import InputUpload from '@/components/inputUpload'
import StarBoard from '@/components/starBoard'

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
    resolver: yupResolver(schemaUploadDiaryYup),
    defaultValues: { menus: [] },
    mode: 'onChange',
  })

  // const [visitDate, setVisitDate] = useState<Date>(new Date())
  // useEffect(() => {
  //   console.log(visitDate)
  // }, [visitDate])
  const [restaurantStar, setRestaurantStar] = useState({
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
  }
  return (
    // diary detail page
    <div>
      <Layout>
        <div className="mx-auto my-0 pt-6 sm:w-[720px]">
          <form
            className="flex h-auto w-full flex-col items-center justify-start gap-6"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="relative box-border h-0 w-1/2 overflow-hidden rounded border border-solid border-mcl-orange pb-[50%]">
              <label
                htmlFor="fileUpload"
                className="absolute left-1/2 top-1/2 flex h-full w-full -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-2.5"
              >
                <VscAdd className="text-5xl text-mcl-orange" />
                <p className="text-sm text-mcl-999">
                  Add your images or short videos...
                </p>
                <input type="file" id="fileUpload" className="hidden" />
              </label>
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
                required
                err={errors.restaurant && errors.restaurant.message}
                register={register('restaurant')}
              />
              <div className="flex items-start justify-start pb-3">
                <span className="h-full w-1/6 bg-transparent"></span>
                <div className="flex flex-col items-stretch justify-between gap-2">
                  <StarBoard
                    use
                    name="서비스"
                    width={20}
                    point={restaurantStar.service}
                    starChange={(num) => changeRestaurantStar('service', num)}
                  />
                  <StarBoard
                    use
                    name="위생"
                    width={20}
                    point={restaurantStar.hygiene}
                    starChange={(num) => changeRestaurantStar('hygiene', num)}
                  />
                  <StarBoard
                    use
                    name="분위기"
                    width={20}
                    point={restaurantStar.mood}
                    starChange={(num) => changeRestaurantStar('mood', num)}
                  />
                  <StarBoard
                    use
                    name="추천"
                    width={20}
                    point={restaurantStar.recommend}
                    starChange={(num) => changeRestaurantStar('recommend', num)}
                  />
                  <StarBoard
                    use
                    name="재방문의사"
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
                    <span className="h-full w-1/6 bg-transparent"></span>
                    <div className="flex flex-col items-stretch justify-between gap-2">
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
            <div>
              <button
                className="w-32 rounded-[4px] bg-mcl-orange px-9 py-3 text-white"
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
