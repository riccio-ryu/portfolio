import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import getAccessToken from '@/pages/api/users/getAccessToken'

import MenuNav from '@/components/menuNav'
import TopNav from '@/components/topNav'
import ItemHome from '@/components/itemHome'
import Layout from '@/components/layout'

import { VscEdit } from 'react-icons/vsc'
import { reissue } from '../utils/reissue'

const Home: NextPage = (props: any) => {
  const router = useRouter()
  reissue(props.tokenData)

  return (
    <div>
      {/* home - body */}
      <Layout>
        {/* contents card */}
        {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((_, i) => (
          <ItemHome key={i} />
        ))}
        {/* write button */}
        <div className="fixed bottom-11 right-1 translate-x-0 sm:bottom-5 sm:right-1/2 sm:translate-x-[480px]">
          <button
            className="flex h-8 w-8 items-center justify-center rounded-full bg-mcl-orange text-base sm:h-10 sm:w-10 sm:text-xl"
            onClick={() => router.push('/diary/upload')}
          >
            <VscEdit className="text-white" />
          </button>
        </div>
      </Layout>

      {/* top */}
      <TopNav />

      {/* nav - phone */}
      <MenuNav navNow="Home" />
    </div>
  )
}

export default Home

export const getServerSideProps = async (ctx: any) => {
  const { req, res } = ctx
  const data = req.cookies.refreshToken

  if (data === undefined) {
    // 아직 로그인을 안한 경우
    return {
      props: {
        tokenData: { ongoing: true, member: { email: '', accessToken: '' } },
      },
    }
  } else {
    // 로그인을 하고 새로고침을 한 경우
    const result = await getAccessToken(req, res)
    const {
      ok: resultOk,
      case: resultCase,
      data: resultData,
      error: resultErr,
    } = result

    // console.log(resultCase);

    return {
      props: {
        tokenData: { ongoing: resultOk, member: resultData },
      },
    }
  }
}
