import { loginInfo } from '@/atoms'
import { setCookie } from 'cookies-next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useRecoilState } from 'recoil'

interface dataForm {
  ongoing: boolean
  member: { email: string; accessToken: string }
}

const reissue = (data: dataForm) => {
  const router = useRouter()

  const [loginIn, setLoginIn] = useRecoilState(loginInfo)

  useEffect(() => {
    if (data.ongoing && data.member.email.length) {
      setLoginIn(true)
    }
  }, [])

  if (!data.ongoing) {
    // /signin page로 이동
    router.push('/signin')
    setLoginIn(false)
  } else if (data.member.email.length) {
    //case 2,3,4
    setCookie('accessToken', data.member.accessToken, { path: '/' })
    // !loginIn && setLoginIn(true)
  } else {
    //not login
    loginIn && setLoginIn(false)
  }
}

export { reissue }
