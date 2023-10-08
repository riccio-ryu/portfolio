import type { NextPage } from 'next'
import { VscEdit } from 'react-icons/vsc'
import MenuNav from '@/components/menuNav'
import TopNav from '@/components/topNav'
import ItemHome from '@/components/itemHome'
import { useRouter } from 'next/router'
import Layout from '@/components/layout'

const Home: NextPage = () => {
  const router = useRouter()
  return (
    <div>
      {/* home - body */}
      <Layout>
        {/* contents card */}
        {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((_, i) => (
          <ItemHome key={i} />
        ))}
        {/* write button */}
        <div className="fixed bottom-5 right-1/2 translate-x-[480px]">
          <button className="flex h-10 w-10 items-center justify-center rounded-full bg-mcl-orange text-xl" onClick={() => router.push('/diary/upload')}>
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
