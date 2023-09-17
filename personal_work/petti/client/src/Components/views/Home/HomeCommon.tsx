import { motion } from 'framer-motion';
import styled from 'styled-components';
import { device } from '../../utils/Size';


export const Slider = styled.div`
    position: relative;
    margin-top: 2.4rem;
    overflow: hidden;
    padding-bottom: calc(((100vw - 3.2rem - (1rem*3)) * 9/16) + 7rem);
    @media ${device.mobileL}{
        padding-bottom: calc(((100vw - 3.2rem - (1rem*3)) / 2 * 9/16) + 7rem);
    }
    @media ${device.tablet}{
        padding-bottom: calc(((100vw - 3.2rem - (1rem*3)) / 4 * 9/16) + 7rem);
    }
`
export const SliderHeading = styled.h3`
    font-size: 2.6rem;
    font-weight: bold;
    line-height: 1.5;
    @media ${device.mobileL}{
        font-size: 3rem;
    }
`
export const SliderArrowBox = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    position: absolute;
    top: 0;
    right: 0;
    height: 3.4rem;
    font-size: 2rem;
    color: ${(props) => props.theme.logo.bk};
    @media ${device.mobileL}{
        height: 4.5rem;
    }
`
export const SliderRow = styled(motion.div)`
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 1rem;
    position: absolute;
    width: 100%;
`
export const SliderBox =styled(motion.div)`
    flex: 1;
    height: 100%;
    overflow: hidden;
    @media ${device.mobileL}{
        flex: 1 calc((100vw - 3.2rem - 3rem) / 2);
    }
    @media ${device.tablet} {
        flex: 0 calc((100vw - 3.2rem - 3rem) / 4);
    }
`
export const SliderThumbBox = styled.a`
    width: 100%;
    height: 100%;
`
export const SliderThumb = styled(motion.div)<{thumbPhoto:string}>`
    background-color: black;
    background-image: url(${(props) => props.thumbPhoto});
    background-size: cover;
    background-position: center center;
    height: calc((100vw - 3.2rem - (1rem*3)) * 9/16);
    @media ${device.mobileL}{
        height: calc((100vw - 3.2rem - (1rem*3)) / 2 * 9/16);
    }
    @media ${device.tablet} {
        height: calc((100vw - 3.2rem - (1rem*3)) / 4 * 9/16);
    }
`
export const SliderDesc = styled.div`
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    flex-direction: column;
    margin-top: .6rem;
    gap: .4rem;
`
export const SliderTitle = styled.p`
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2; 
    -webkit-box-orient: vertical;
    white-space: normal;
    word-break: keep-all;
    font-size: 1.6rem;
    font-weight: 700;
`
export const SliderUser = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    gap: calc(.6rem);
    width: 100%;
`
export const SliderUserImgBox = styled.span`
    flex: 0 auto;
    background-color: black;
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    background-size: cover;
    background-position: center center;
    position: relative;
    overflow: hidden;
    svg{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 50%;
    }
`
export const SliderUserImg = styled.img`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: auto;
`
export const SliderUserName = styled.span`
    flex: 1;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
`

export const sliderVariants = {
    hidden: (direction:boolean) => ({
        x: direction? -window.outerWidth + 20 : window.outerWidth - 20
    }),
    visible: {
        x: 0
    },
    exit: (direction:boolean) => ({
        x: direction? window.outerWidth - 20 : -window.outerWidth + 20
    })
}
// export const sliderOffset = 4;
//export const sliderOffset = 4;