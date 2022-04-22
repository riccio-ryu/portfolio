import { motion } from 'framer-motion';
import styled from 'styled-components';

export const Slider = styled.div`
    position: relative;
    margin-top: 2.4rem;
    padding-bottom: calc(((100vw - 3.2rem - (1rem*3)) / 4 * 9/16) + 7rem);
    overflow: hidden;
`
export const SliderHeading = styled.h3`
    font-size: 3rem;
    font-weight: bold;
    line-height: 1.5;
`
export const SliderArrowBox = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    position: absolute;
    top: 0;
    right: 0;
    height: 4.5rem;
    font-size: 2rem;
    color: ${(props) => props.theme.logo.bk};
`
export const SliderRow = styled(motion.div)`
    display: flex;
    justify-content: center;
    align-items: flex-start;
    gap: 1rem;
    position: absolute;
    width: 100%;
`
export const SliderBox =styled(motion.div)`
    flex: 1 1 calc((100vw - 3.2rem - 3rem) / 4); 
    height: 100%;
    overflow: hidden;
`
export const SliderThumb = styled(motion.div)<{bgPhoto:string}>`
    background-color: black;
    background-image: url(${(props) => props.bgPhoto});
    background-size: cover;
    background-position: center center;
    height: calc((100vw - 3.2rem - (1rem*3)) / 4 * 9/16);
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
export const SliderUserImg = styled.span<{bgPhoto:string}>`
    flex: 0 auto;
    background-color: black;
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    background-image: url(${(props) => props.bgPhoto});
    background-size: cover;
    background-position: center center;
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
export const sliderOffset = 4;