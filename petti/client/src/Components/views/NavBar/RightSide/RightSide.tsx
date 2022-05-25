import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useRouteMatch, withRouter } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import { motion, useAnimation } from 'framer-motion';
import { device } from '../../../utils/Size';
import { useRecoilState} from 'recoil';
import { isHamburgerClose, isLoginUser, isProfileOpen } from '../../../../atoms';
import UserIcon from '../../../utils/UserIcon';
import RightBubble from './RightBubble';

const RightMenu = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: flex-start;
    gap: .4rem;
    a{
        font-size: 1.6rem;
        font-weight: 400;
        padding: .6rem .6rem;
        position: relative;
        height: auto;
        &:hover {
            color: ${props => props.theme.logo.pink}
        }
        &#onNav{
            color: ${props => props.theme.logo.pink};
            span{
                border-bottom: 2px solid ${props => props.theme.logo.pink};
                opacity: 1;
            }
        }
    }

    @media ${device.tablet} {
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
        a{
            padding: 1.8rem 0.5rem;
            height: 5.6rem;
        }
    }
`
const NavStick = styled(motion.span)`
    width: 100%;
    height: 0rem;
    display: block;
    background-color: transparent;
    border-bottom: 3px solid #181818;

    @media ${device.tablet} {
        width: calc(100% - 1rem);
        height: 100%;
        position: absolute;
        bottom: 0;
        left: 0.5rem;
        box-sizing: border-box;
        opacity: 1;
    }
`
const NavStickVars = {
    hover: { borderBottom: `2px solid #d3599c`, opacity: 1 }
}
const SearchContainer = styled.span`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
`
const SearchIcon = styled(motion.span)`
    font-size: 2rem;
    font-weight: 500;
    padding: 0.6rem 0.6rem;
    display: flex;
    z-index: 1;
    &:hover {
        color: ${props => props.theme.logo.pink};
    }
    @media ${device.tablet}{
        font-size: 1.8rem;
        padding: 1.6rem 0.5rem;
    }
`
const SearchInput = styled(motion.input)`
    transform-origin: right center;
    color: #181818;
    font-size: 16px;
    background-color: transparent;
    border: 1px solid #181818;
    width: calc(100vw - 1.2rem);
    position: absolute;
    right: 0;
    padding: 5px 5px 5px 30px;
    margin: 0 .6rem;
    @media ${device.tablet}{
        width: 18rem;
        margin: 0;
    }
`
const ProfileContainer = styled.span`
    background-color: black;
    width: 2.8rem;
    height: 2.8rem;
    border-radius: 50%;
    position: relative;
    overflow: hidden;
    border: 1px solid #999;
    svg{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 50%;
    }
`
const ProfileIcon = styled.img`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: auto;
`
const ProfileIconIamge = styled.img``

function RightSide(props:any) {
    const signinMatch = useRouteMatch("/signin");
    const [searchOpen, setSearchOpen] = useState(false);
    const [windowSize, setWindowSize] = useState(false);
    const searchInputAnimation = useAnimation();
    const toggleSearch = () => {
        const tabSize = +device.tablet.replace(/[^0-9]/g, "")
        const winSize= window.outerWidth;
        if (searchOpen) {
            searchInputAnimation.start({
                scaleX: 0,
                opacity: 0,
            })
        }else{
            searchInputAnimation.start({
                scaleX: 1,
                opacity: 1,
            })
        }

        if(tabSize > winSize){//tab보다 작으면
            setWindowSize(!windowSize)
        }else{
            setWindowSize(windowSize)
        }
        setSearchOpen((prev) => !prev);
    }
    const [ loginUser, setLoginUser ] = useRecoilState(isLoginUser)
    const [ hamAdd, setHamAdd ] = useRecoilState(isHamburgerClose)
    const closeHamburger = () => {
        if(hamAdd){
            setHamAdd(false)
        }else{
            setHamAdd(true)
        }
    }
    const [ profileOpen, setProfileOpen ] = useRecoilState(isProfileOpen)
    const toggleProfile = () => {
        setProfileOpen(prev => !prev)
    }

  return (
    <RightMenu>
        <SearchContainer>
            <SearchIcon
                onClick={toggleSearch}
                animate={{ x: (searchOpen ? (windowSize ? `calc(-100vw + 3.7rem)` : -150) : 0)  }}
                transition={{ type: "linear" }}
            >
                <FaSearch />
            </SearchIcon>
            <SearchInput
            animate={searchInputAnimation}
            initial={{ scaleX: 0 }}
            transition={{ type: "linear" }}
            placeholder="Search for fet..." 
            />
        </SearchContainer>
        {loginUser.length > 0 ?
        <ProfileContainer onClick={toggleProfile}>
            {props.userImage ? 
            <ProfileIcon>
            </ProfileIcon>
            :
            <UserIcon />
            }
        </ProfileContainer>
        :
        <Link to={`/signin`} onClick={() => closeHamburger()} >Sign In{signinMatch && <NavStick whileHover="hover" variants={NavStickVars} />}</Link>
        }
        {profileOpen &&
            <RightBubble />
        }
    </RightMenu>
  );
}

export default withRouter(RightSide);
