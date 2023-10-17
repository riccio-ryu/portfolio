import type { NextPage } from 'next'
import {} from 'react-icons/vsc'

import MenuNav from '@/components/menuNav'
import TopNav from '@/components/topNav'
import Layout from '@/components/layout'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import schemaMemberYup from '@/components/validationMemberYup'
import InputJoin from '@/components/inputJoin'
import BtnJoin from '@/components/btnJoin'
import { useState } from 'react'
import { useRouter } from 'next/router'

interface SignInForm {
  email: string
  password: string
}
const SignIn: NextPage = () => {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
    watch,
  } = useForm<SignInForm>({
    resolver: yupResolver(schemaMemberYup),
    mode: 'onChange',
  })

  const [failVisible, setFailVisible] = useState(false) // sign in fail -> true:visible

  const onSubmit = (data: SignInForm) => {
    console.log(data)
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
              ></InputJoin>
              <InputJoin
                label="Password"
                name="password"
                type="password"
                goal="sign-in"
                err={errors.password && errors.password.message}
                required={false}
                register={register('password')}
              />
              <div
                className={`w-full py-5 font-bold text-mcl-red ${
                  failVisible ? 'visible' : 'invisible'
                }`}
              >
                이메일과 비밀번호가 일치하지 않습니다.
              </div>
            </div>
            <div className="w-full overflow-hidden">
              <BtnJoin
                name="SIGN IN"
                type="button"
                onClick={() => {
                  console.log('logggg')
                  // setFailVisible(true)
                  router.push('/')
                }}
              />
            </div>
          </div>
        </form>
      </Layout>
      {/* top */}
      <TopNav navNow="signin" />

      {/* nav - phone */}
      <MenuNav />
    </div>
  )
}
export default SignIn
