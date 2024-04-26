import type { NextPage } from 'next'
import MenuNav from '@/components/menuNav'
import TopNav from '@/components/topNav'
import Layout from '@/components/layout'
import NotYet from '@/components/notYet'

const Profile: NextPage = () => {
  return (
    <div>
      {/* home - body */}
      <Layout>
        {/* contents card */}
        <NotYet />
      </Layout>

      {/* top */}
      <TopNav />

      {/* nav - phone */}
      <MenuNav />
    </div>
  )
}

export default Profile
