import type { NextPage } from 'next'
import MenuNav from '@/components/menuNav'
import TopNav from '@/components/topNav'
import Layout from '@/components/layout'
import Map from '@/components/map'
// import { useEffect, useState } from 'react'
// import { geoInfo } from '@/atoms'

/*
개발 예상 목록
1. 검색, 결과 표시
2. 갔던곳 표시(로그인되었을 경우)
3. 팔로워 갔던곳 표시
4. 가게 클릭시, 작성된 글 내용 보기
*/

const MapPage: NextPage = () => {
  return (
    <div>
      {/* home - body */}
      <Layout>
        {/* contents card */}
        <Map purpose="page" />
      </Layout>

      {/* top */}
      <TopNav navNow="map" />

      {/* nav - phone */}
      <MenuNav navNow="Map" />
    </div>
  )
}

export default MapPage
