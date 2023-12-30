import type { NextPage } from 'next'
import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import useMutation from '@/libs/client/useMutation'
import { loginInfo } from '@/atoms'
import { useRecoilState } from 'recoil'
import { setCookie } from 'cookies-next'

import MenuNav from '@/components/menuNav'
import TopNav from '@/components/topNav'
import Layout from '@/components/layout'
import InputJoin from '@/components/inputJoin'
import BtnJoin from '@/components/btnJoin'
import LoadingFull from '@/components/loadingFull'

import { yupResolver } from '@hookform/resolvers/yup'
import { schemaSignInYup } from '@/utils/validationMemberYup'

interface SignInForm {
  email: string
  password: string
}
interface mutationResult {
  ok: boolean
  userId?: string
  accessToken?: string
}

const SignIn: NextPage = () => {
  const submitRef = useRef<HTMLButtonElement>(null)
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    watch,
    setError,
    setFocus,
  } = useForm<SignInForm>({
    resolver: yupResolver(schemaSignInYup),
    mode: 'onChange',
  })

  const router = useRouter()

  const [failVisible, setFailVisible] = useState(false) // sign in fail -> true:visible
  const [submitting, setSubmitting] = useState(false) // loading
  const [nowFocus, setNowFocus] = useState('')

  const [loginIn, setLoginIn] = useRecoilState(loginInfo) //{email, token}

  const [
    signInAction,
    { loading: signInLoading, data: signInData, error: signInError },
  ] = useMutation<mutationResult>('/api/users/signin')

  useEffect(() => {
    setSubmitting(false)
    if (!signInData) return
    if (signInData?.ok) {
      setLoginIn(true)
      setCookie('email', signInData.userId!, {
        path: '/',
      })
      setCookie('accessToken', signInData.accessToken!, {
        path: '/',
      })
      // router.push('/')
    } else {
      setFailVisible(true)
    }
  }, [signInData, router])

  const onFocusNow = (str: string) => {
    setNowFocus(str)
  }
  const enterDown = () => {
    if (
      watch('email') !== '' &&
      !errors.email &&
      watch('password') !== '' &&
      !errors.password
    )
      triggerLogin()

    if (nowFocus === 'email') setFocus('password')
    if (nowFocus === 'password') setFocus('email')
  }
  const triggerLogin = () => {
    submitRef.current?.click()
  }

  const onSubmit = (data: SignInForm) => {
    setSubmitting(true)
    if (signInLoading) return
    signInAction(data)
  }
  return (
    <div>
      <Layout width={360}>
        <div className="flex h-auto w-full flex-col items-center justify-start gap-2">
          <h3 className="text-xl font-bold text-mcl-orange">SIGN IN</h3>
          <p className="text-center text-xs text-mcl-999">
            환영합니다. <br />
            여러분의 미식의 세계를 기록해주세요!!
          </p>
        </div>
        <form
          className="flex w-full flex-nowrap items-start justify-start pt-5 sm:pt-10"
          onSubmit={handleSubmit(onSubmit)}
          onChange={() => setFailVisible(false)}
        >
          <div className="flex h-auto w-full flex-col justify-between gap-14 overflow-hidden px-2 sm:w-[360px] sm:px-0">
            <div className="flex w-full flex-col items-start justify-start gap-2.5 overflow-hidden">
              <InputJoin
                label="E-mail"
                name="email"
                type="text"
                goal="sign-in"
                err={errors.email && errors.email.message}
                required={false}
                register={register('email')}
                focusPre={() => onFocusNow('email')}
                enterDown={() => enterDown()}
              ></InputJoin>
              <InputJoin
                label="Password"
                name="password"
                type="password"
                goal="sign-in"
                err={errors.password && errors.password.message}
                required={false}
                register={register('password')}
                focusPre={() => onFocusNow('password')}
                enterDown={() => enterDown()}
              />
              <div
                className={`w-full py-5 text-xs font-bold text-mcl-red ${
                  failVisible ? 'visible' : 'invisible'
                }`}
              >
                E-mail혹은 password가 일치하지 않습니다.
              </div>
            </div>
            <div className="w-full overflow-hidden">
              <BtnJoin name="SIGN IN" type="submit" />
              <button type="submit" className="hidden" ref={submitRef}></button>
            </div>
          </div>
        </form>
      </Layout>
      {/* top */}
      <TopNav navNow="signin" />

      {/* nav - phone */}
      <MenuNav />

      {/* loading view */}
      {submitting && <LoadingFull />}
    </div>
  )
}
export default SignIn
