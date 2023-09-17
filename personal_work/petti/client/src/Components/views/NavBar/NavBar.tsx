import React, { useEffect } from 'react';
import styled from 'styled-components';//, { css }
import { Link } from 'react-router-dom';
import LeftSide from './LeftSide/LeftSide';
import RightSide from './RightSide/RightSide';
import { device } from '../../utils/Size';
import { motion, useAnimation } from 'framer-motion';
import { useRecoilState, useRecoilValue } from 'recoil';
import { isHamburgerClose, isHamburgerOpen, isLoginUser, isTabletSize } from '../../../atoms';
import { fetchAuth, IAuth, ITableSize } from '../../../api';
import { useQuery } from 'react-query';
import Petti from '../../utils/Petti'
import Logo from '../../utils/Logo';

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
const NavLogo = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    svg{
        width: auto;
        height: 4rem;
    }
`
const Title = styled.p`
    color: ${(props) => props.theme.logo.brown};
    display: flex;
    justify-content: center;
    align-items: center;
    svg{
        height: 2.4rem;
    }
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

function getCookie(id:string) {
    var value = document.cookie.match('(^|;) ?' + id + '=([^;]*)(;|$)');
    return value? unescape(value[2]) : null;
}

function NavBar() {
    const { isLoading: authLoading, data: authData, refetch } = useQuery<IAuth>("auth", fetchAuth)
    const [freshAuth, setFreshAuth] = useRecoilState(isLoginUser)
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
    //console.log(authData, authLoading);
    //console.log(getCookie('petti_auth'));

    // useEffect(() => {
    //   if(getCookie('petti_auth') !== null){
    //       setFreshAuth(authData?._id || freshAuth)
    //       refetch()
    //   }
    // },[freshAuth])
    
    
  return (
      <Nav winSize={isTabletMode}>
          <Home>
            <Link to={`/`} onClick={() => closeHamburger()} >
                <NavLogo><Logo /></NavLogo>
                <Title><Petti /></Title>
            </Link>
          </Home>
          <MenuBar 
          isOpen={hamburgerOpen} 
          animate={hamMenuAnimation}
          initial={isTabletMode === "pc" ? { top: `0` } : {top: `100vh`}}
          transition={{ type: "linear" }}
          >
            <LeftSide />
            <RightSide userImage={authData?.image} />
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
