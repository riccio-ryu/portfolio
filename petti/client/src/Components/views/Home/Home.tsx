import React from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import HomeRecentGallery from './HomeRecentGallery';
import HomePopularGallery from './HomePopularGallery';
import HomeMostViewGallery from './HomeMostViewGallery';
import { withRouter } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { isTabletSize } from '../../../atoms';
import { device } from '../../utils/Size';

const Wrapper = styled.div`
    width: 100%;
`

const Loader = styled.div`
    height: 20vh;
    display: flex;
    justify-content: center;
`

const Banner = styled.div<{bgPhoto:string}>`
    height: 100vh;
    display: flex;
    background-image: url( ${(props) => props.bgPhoto} );
    background-size: cover;
`

const MiddleLine = styled.div`
    width: 100%;
    background-color: #ccc;
    padding-top: .1rem;
    box-sizing: border-box;
    border-top: 1.6rem solid ${props => props.theme.light.darker};
    /* border-bottom: 2.4rem solid ${props => props.theme.light.darker}; */
    @media ${device.mobileL}{
        border-top: 4rem solid ${props => props.theme.light.darker};
    }
`

function Home() {
    const tableSize = useRecoilValue(isTabletSize)
    
    let changeOffset = 0;
    if(tableSize === 'pc'){
        changeOffset = 4;
    }else if(tableSize === "tablet"){
        changeOffset = 2;
    }else{
        changeOffset = 1;
    }
    
  return (
      <Wrapper>
          {/* {isLoading ? 
        (<Loader>Loading...</Loader>) :  */}
        <>
            {/* <Banner bgPhoto={makeImagePath(data?.results[0].backdrop_path || "")}>Banner</Banner> */}
            <HomeRecentGallery sliderOffset={changeOffset} />
            <MiddleLine />
            <HomePopularGallery sliderOffset={changeOffset} />
            <MiddleLine />
            <HomeMostViewGallery sliderOffset={changeOffset} />
            <MiddleLine />
            <>
                {/* 해야 할 일, 굿즈추가
                board 추가 */}
            </>
        </>
        {/* } */}
      </Wrapper>
  );
}

export default withRouter(Home);
