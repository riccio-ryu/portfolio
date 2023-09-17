import { AnimatePresence } from 'framer-motion';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { actGetGalleryPopular } from '../../../api';
import { FaChevronCircleLeft, FaChevronCircleRight } from 'react-icons/fa'
import { Slider, SliderTitle, SliderArrowBox, SliderRow, SliderBox, sliderVariants, SliderDesc, SliderHeading, SliderUser, SliderUserImg, SliderUserName, SliderThumb, SliderUserImgBox, SliderThumbBox } from './HomeCommon'
import UserIcon from '../../utils/UserIcon';
import { Mode } from '../../utils/Mode';

function HomePopularGallery(props:any) {
    const { data:homePopularData, isLoading:homePopularLoading } = useQuery<any>(["home", "popularGallery"], actGetGalleryPopular)
    //console.log(homePopularData);
    const sliderOffset = props.sliderOffset;
    
    const [recentIndex, setRecentIndex] = useState(0);
    const [sliderDirection, setSliderDirection] = useState(false);
    const [leaving, setLeaving] = useState(false);
    const increaseRecent = () => {
        if(homePopularData){
            if(leaving) return;
            toggleLeaving();
            setSliderDirection(false);
            const maxDataIndex = Math.ceil(homePopularData.data.popular.length / sliderOffset) -1
            setRecentIndex((prev) => ( prev===maxDataIndex? 0 : prev+1));
        }
    }
    const decreaseRecent = () => {
        if(homePopularData){
            if(leaving) return;
            toggleLeaving();
            setSliderDirection(true);
            const maxDataIndex = Math.ceil(homePopularData.data.popular.length / sliderOffset) -1
            setRecentIndex((prev) => ( prev===0 ? maxDataIndex : prev -1));
        }
    }
    const toggleLeaving =() => setLeaving((prev) => !prev);
  return (
    <Slider>
        <SliderHeading>Most Liked Gallery</SliderHeading>
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
                {homePopularData?.data.popular.slice(sliderOffset * recentIndex, sliderOffset * recentIndex + sliderOffset).map((post:any) => (
                    <SliderBox>
                        <SliderThumbBox href={`/gallery/${post._id}`} >
                        <SliderThumb key={post.id} thumbPhoto={`${Mode.add}${post.thumbnail}`}>
                        </SliderThumb></SliderThumbBox>
                        <SliderDesc>
                            <SliderTitle><a href={`/gallery/${post._id}`}>{post.title}</a></SliderTitle>
                            <SliderUser>
                                <SliderUserImgBox>
                                    {post.writer.image ?
                                    <SliderUserImg src={`${Mode.add}${post.writer.image}`} alt='userImage'></SliderUserImg>
                                    :
                                    <UserIcon />
                                    }
                                </SliderUserImgBox>
                                <SliderUserName>
                                    {post.writer.nick}
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
