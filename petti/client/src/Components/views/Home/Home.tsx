import React from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import { getMovies, IGetMoviesResult } from '../../../api';
import { makeImagePath } from '../../../util';
import HomeRecentGallery from './HomeRecentGallery';
import HomePopularGallery from './HomePopularGallery';
import HomeRecommendGallery from './HomeRecommendGallery';
import { withRouter } from 'react-router-dom';

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
    border-top: 4rem solid ${props => props.theme.light.darker};
    /* border-bottom: 2.4rem solid ${props => props.theme.light.darker}; */
`

function Home() {
    const { data, isLoading } = useQuery<IGetMoviesResult>(["movies", "nowPlaying"], getMovies)//나중에 node생성시에 확인하고 바꿔 줘야함
  return (
      <Wrapper>{isLoading ? 
        (<Loader>Loading...</Loader>) : 
        <>
            {/* <Banner bgPhoto={makeImagePath(data?.results[0].backdrop_path || "")}>Banner</Banner> */}
            <HomeRecentGallery />
            <MiddleLine />
            <HomePopularGallery />
            <MiddleLine />
            <HomeRecommendGallery />
            <MiddleLine />
            <>
                해야 할 일, 굿즈추가
                board 추가
            </>
        </>
        }</Wrapper>
  );
}

export default withRouter(Home);
