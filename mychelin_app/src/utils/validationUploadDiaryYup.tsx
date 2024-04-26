import * as yup from 'yup'

const schemaUploadDiaryYup = yup.object().shape({
  visit: yup.string().required('방문 날짜를 필수로 입력해주세요.'),
  restaurant: yup
    .string()
    .min(1, '가게 이름이 너무 짧습니다 1자 이상은 적어주세요.')
    .max(40, '가게 이름이 너무 깁니다. 40자 이내로 줄여주세요.')
    .required('가게 이름을 필수로 입력해주세요.'),
  restaurantStar: yup.object(),
  menus: yup
    .array()
    .of(
      yup.object().shape({
        menu: yup
          .string()
          .min(1, '메뉴 이름이 너무 짧습니다 1자 이상은 적어주세요.')
          .max(40, '메뉴 이름이 너무 깁니다. 40자 이내로 줄여주세요.')
          .required('메뉴 이름을 필수로 입력해주세요.'),
        taste: yup.number(),
        amount: yup.number(),
        price: yup.number(),
      }),
    )
    .required('메뉴가 비어있습니다. 메뉴를 입력해 주세요.'),
  title: yup
    .string()
    .max(100, '제목이 너무 깁니다. 100자 이내로 입력해 주세요.'),
  review: yup.string(),
})

export default schemaUploadDiaryYup
/*
objList: yup.array().of(
            yup.object().shape({
                name: yup.string().required('아이디를 입력해주세요.'), 
                age: yup.number().min(3, '3이상 값을 입력해주세요.').max(10, '10이하 값을 입력해주세요.'),
            })
        )
*/
