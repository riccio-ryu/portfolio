import { AnimatePresence } from 'framer-motion';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { getMovies, IGetMoviesResult } from '../../../api';
import { makeImagePath } from '../../../util';
import { FaChevronCircleLeft, FaChevronCircleRight } from 'react-icons/fa'
import { Slider, SliderTitle, SliderArrowBox, SliderRow, SliderBox, sliderOffset, sliderVariants, SliderDesc, SliderHeading, SliderUser, SliderUserImg, SliderUserName, SliderThumb } from './HomeCommon'

function HomePopularGallery() {
    const { data, isLoading } = useQuery<IGetMoviesResult>(["movies", "nowPlaying"], getMovies)//나중에 node생성시에 확인하고 바꿔 줘야함
    const [recentIndex, setRecentIndex] = useState(0);
    const [sliderDirection, setSliderDirection] = useState(false);
    const [leaving, setLeaving] = useState(false);
    const increaseRecent = () => {
        if(data){
            if(leaving) return;
            toggleLeaving();
            setSliderDirection(false);
            const maxDataIndex = Math.ceil(data.results.length / sliderOffset) -1
            setRecentIndex((prev) => ( prev===maxDataIndex? 0 : prev+1));
        }
    }
    const decreaseRecent = () => {
        if(data){
            if(leaving) return;
            toggleLeaving();
            setSliderDirection(true);
            const maxDataIndex = Math.ceil(data.results.length / sliderOffset) -1
            setRecentIndex((prev) => ( prev===0 ? maxDataIndex : prev -1));
        }
    }
    const toggleLeaving =() => setLeaving((prev) => !prev);
  return (
    <Slider>
        <SliderHeading>Popular Gallery</SliderHeading>
        <SliderArrowBox>
            <FaChevronCircleLeft onClick={decreaseRecent} /><FaChevronCircleRight onClick={increaseRecent} />
        </SliderArrowBox>
        <AnimatePresence 
            initial={false} 
            custom={sliderDirection}
            onExitComplete={toggleLeaving}
            >
            <SliderRow 
                custom={sliderDirection}
                variants={sliderVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ type: "tween", duration: 1 }}
                key={recentIndex}
            >
                {data?.results.slice(sliderOffset * recentIndex, sliderOffset * recentIndex + sliderOffset).map((movie) => (
                    <SliderBox>
                        <SliderThumb key={movie.id} bgPhoto={makeImagePath(movie.backdrop_path, "w500")}>
                        </SliderThumb>
                        <SliderDesc>
                            <SliderTitle>{movie.overview}</SliderTitle>
                            <SliderUser>
                                <SliderUserImg bgPhoto={makeImagePath(movie.poster_path, "w500")}></SliderUserImg>
                                <SliderUserName>
                                    {movie.title}
                                </SliderUserName>
                            </SliderUser>
                        </SliderDesc>
                    </SliderBox>
                ))}
            </SliderRow>
        </AnimatePresence>
    </Slider>
  );
}

export default HomePopularGallery;
