import React from 'react';
import styled from 'styled-components';//, { css }
import { Link } from 'react-router-dom';
import LeftSide from './LeftSide/LeftSide';
import RightSide from './RightSide/RightSide';
import { device } from '../../utils/Size';
import { motion, useAnimation } from 'framer-motion';
import { useRecoilState, useRecoilValue } from 'recoil';
import { isHamburgerClose, isHamburgerOpen, isTabletSize } from '../../../atoms';
import { ITableSize } from '../../../api';

const Nav = styled.nav<ITableSize>`
    z-index: 10;
    background-color: ${(props) => props.theme.light.darker};
    height: 56px;
    width: 100%;
    box-sizing: border-box;
    padding: 0 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #999;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.4);
    position: fixed;
`
const Home = styled.div`
    flex: 0;
    a{
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 10px;
    }
`
const Svg = styled.svg`
    width: 40px;
    height: 40px;
`
const Title = styled.p`
    color: ${(props) => props.theme.logo.brown};
    font-size: 36px;
    font-weight: bold;
`
const MenuBar = styled(motion.div)<{isOpen:boolean}>`
    display: ${(props) => props.isOpen ? 'block' : 'none'};
    position: absolute;
    top: 0;
    right: 0;
    margin-top: 5.6rem;
    background-color: ${props => props.theme.light.darker};
    height: calc(100vh - 5.6rem);
    width: 100%;

    @media ${device.tablet} {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-left: 3rem;
        background-color: transparent;
        margin-top: 0;
        position: relative;
        top: unset !important;
        opacity: 1 !important;
    }
`
const Hamburger = styled.button`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    font-size: 2.6rem;
    &:hover {
        color: ${props => props.theme.logo.pink};
    }

    @media ${device.tablet} {
        display: none;
    }
`
const HamSvg = styled(motion.svg)`
    width: 2.6rem;
    height: 2.6rem;
`

function NavBar() {
    const isTabletMode = useRecoilValue(isTabletSize)
    const [ hamAdd, setHamAdd ] = useRecoilState(isHamburgerClose);
    const [hamburgerOpen, setHamburgerOpen] = useRecoilState(isHamburgerOpen);
    const hamMenuAnimation = useAnimation();
    const toggleHamburger = () => {
        if(hamburgerOpen){
            //console.log('true', hamburgerOpen);
            hamMenuAnimation.start({
                top: `100vh`,
                opacity: 0,
            })
            setHamAdd(false);
        }else{
            //console.log('false', hamburgerOpen)
            hamMenuAnimation.start({
                top: 0,
                opacity: 1,
            })
            setHamAdd(true)
        }
        setHamburgerOpen(prev => !prev);
    }
    const closeHamburger = () => {
        if(hamAdd){
            setHamAdd(false)
        }else{
            setHamAdd(true)
        }
    }

    if(!hamAdd){
        setHamburgerOpen(false)
    }
    
  return (
      <Nav winSize={isTabletMode}>
          <Home>
            <Link to={`/`} onClick={() => closeHamburger()} >
                <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 199.97 187.79">
                    <path d="M100,200a99.87,99.87,0,0,0,83.16-44.46c-6.85-19.58-30.78-47.07-38-47.19-7.62-.13-14.87,14.37-16.87,17.62s-23.75,4-28.28,4-26.28-.75-28.28-4-9.25-17.75-16.87-17.62c-7.23.12-31.16,27.61-38,47.19A99.87,99.87,0,0,0,100,200Z" transform="translate(0 -12.21)" fill='#e0bd2b' />
                    <circle cx="126.98" cy="139.14" r="4.56"/>
                    <circle cx="73.02" cy="139.14" r="4.56"/>
                    <path d="M100,179.85v3.37c0,2.25,3.65,6.38,12.78,6.38" transform="translate(0 -12.21)" fill='none' stroke='#000' strokeMiterlimit={10} />
                    <path d="M100,179.85v3.37c0,2.25-3.65,6.38-12.78,6.38" transform="translate(0 -12.21)" fill='none' stroke='#000' strokeMiterlimit={10} />
                    <ellipse cx="100" cy="161.23" rx="11.43" ry="6.41" fill='#d3599c' />
                    <path d="M24.4,105.1C24,95,29.56,78.06,32,73.1,35,67.15,55.9,24,55.28,15.6a6.26,6.26,0,0,0-.74-2.34,2.2,2.2,0,0,0-2.95-.78A100.07,100.07,0,0,0,11.1,145.83C21.48,134.05,24.75,114.58,24.4,105.1Z" transform="translate(0 -12.21)" fill='#8e5f1a' />
                    <path d="M175.57,105.1c.37-10.13-5.16-27-7.63-32C165,67.15,144.07,24,144.69,15.6a6.26,6.26,0,0,1,.74-2.34,2.2,2.2,0,0,1,2.95-.78,100.07,100.07,0,0,1,40.49,133.35C178.49,134.05,175.22,114.58,175.57,105.1Z" transform="translate(0 -12.21)" fill='#8e5f1a' />
                    <circle cx="126.98" cy="52.47" r="4.79"/>
                    <circle cx="73.02" cy="52.47" r="4.79"/>
                    <ellipse cx="100" cy="98.39" rx="26.98" ry="12.5"/>
                </Svg>
                <Title>Petti</Title>
            </Link>
          </Home>
          <MenuBar 
          isOpen={hamburgerOpen} 
          animate={hamMenuAnimation}
          initial={isTabletMode ? { top: `0` } : {top: `100vh`}}
          transition={{ type: "linear" }}
          >
            <LeftSide />
            <RightSide />
          </MenuBar>
          <Hamburger id='hamburger' onClick={toggleHamburger}>
            {hamburgerOpen ? 
            <HamSvg layoutId='hambtn' viewBox="0 0 352 512" xmlns="http://www.w3.org/2000/svg"><path d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"></path></HamSvg> :
            <HamSvg layoutId='hambtn' viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg"><path d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"></path></HamSvg>}
          </Hamburger>
      </Nav>
  )
}

export default NavBar;
