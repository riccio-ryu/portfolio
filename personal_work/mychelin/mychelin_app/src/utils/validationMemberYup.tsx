import * as yup from 'yup'

const schemaMemberYup = yup.object().shape({
  email: yup
    .string()
    .email('이메일 형식을 맞춰서 입력해주세요.')
    .required('이메일을 필수로 입력해주세요.'),
  password: yup
    .string()
    .min(8, '비밀번호를 8~16글자로 입력해주세요.')
    .max(16, '비밀번호를 8~16글자로 입력해주세요.')
    .matches(
      /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[~!@#$%^*+=-])/,
      '비밀번호에 영문, 숫자, 특수문자를 포함해주세요.',
    )
    .required('비밀번호를 필수로 입력해주세요.'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], '비밀번호가 일치하지 않습니다.'),
  nickname: yup
    .string()
    .min(2, '닉네임을 2~16글자 이상으로 입력해주세요.')
    .max(16, '닉네임을 2~16글자로 입력해주세요.')
    .required('닉네임을 필수로 입력해주세요.'),
  name: yup.string().max(16, '이름을 16글자 이하로 입력해주세요.'),
  interest: yup
    .string()
    .max(100, '관심있는 음식을 100글자 이하로 입력해주세요.'),
})

export default schemaMemberYup

export const schemaSignInYup = yup.object().shape({
  email: yup
    .string()
    .email('이메일 형식을 맞춰서 입력해주세요.')
    .required('이메일을 필수로 입력해주세요.'),
  password: yup
    .string()
    .min(8, '비밀번호를 8~16글자로 입력해주세요.')
    .max(16, '비밀번호를 8~16글자로 입력해주세요.')
    .matches(
      /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[~!@#$%^*+=-])/,
      '비밀번호에 영문, 숫자, 특수문자를 포함해주세요.',
    )
    .required('비밀번호를 필수로 입력해주세요.'),
})
