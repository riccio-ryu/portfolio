import { AnimatePresence } from 'framer-motion';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { actGetGalleryRecent } from '../../../api';
import { FaChevronCircleLeft, FaChevronCircleRight } from 'react-icons/fa'
import { Slider, SliderTitle, SliderArrowBox, SliderRow, SliderBox, sliderOffset, sliderVariants, SliderDesc, SliderHeading, SliderUser, SliderUserImg, SliderUserName, SliderThumb, SliderUserImgBox, SliderThumbBox } from './HomeCommon'
import UserIcon from '../../utils/UserIcon';

function HomeRecentGallery() {
    const { data:homeRecentData, isLoading:homeRecentLoading } = useQuery<any>(["home", "recentGallery"], actGetGalleryRecent)
    
    const [recentIndex, setRecentIndex] = useState(0);
    const [sliderDirection, setSliderDirection] = useState(false);
    const [leaving, setLeaving] = useState(false);
    const increaseRecent = () => {
        if(homeRecentData){
            if(leaving) return;
            toggleLeaving();
            setSliderDirection(false);
            const maxDataIndex = Math.ceil(homeRecentData.data.gallerys.length / sliderOffset) -1
            setRecentIndex((prev) => ( prev===maxDataIndex? 0 : prev+1));
        }
    }
    const decreaseRecent = () => {
        if(homeRecentData){
            if(leaving) return;
            toggleLeaving();
            setSliderDirection(true);
            const maxDataIndex = Math.ceil(homeRecentData.data.gallerys.length / sliderOffset) -1
            setRecentIndex((prev) => ( prev===0 ? maxDataIndex : prev -1));
        }
    }
    const toggleLeaving =() => setLeaving((prev) => !prev);
  return (
    <Slider>
        <SliderHeading>Recent Gallery</SliderHeading>
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
                {homeRecentData?.data.gallerys.slice(sliderOffset * recentIndex, sliderOffset * recentIndex + sliderOffset).map((post:any) => (
                    <SliderBox>
                        <SliderThumbBox href={`/gallery/${post._id}`} >
                        <SliderThumb key={post.id} thumbPhoto={`http://localhost:4000/${post.thumbnail}`}>
                        </SliderThumb></SliderThumbBox>
                        <SliderDesc>
                            <SliderTitle><a href={`/gallery/${post._id}`} >{post.title}</a></SliderTitle>
                            <SliderUser>
                                <SliderUserImgBox>
                                    {post.writer.image ?
                                    <SliderUserImg src={`http://localhost:4000/${post.writer.image}`} alt='userImage'></SliderUserImg>
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

export default HomeRecentGallery;
