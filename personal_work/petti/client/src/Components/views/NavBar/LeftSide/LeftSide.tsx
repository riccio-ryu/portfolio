import React from 'react';
import styled from 'styled-components';
import { Link, useRouteMatch } from 'react-router-dom';
import { motion } from 'framer-motion';
import { device } from '../../../utils/Size';
import { useRecoilState } from 'recoil';
import { isHamburgerClose } from '../../../../atoms';

const LeftMenu = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: flex-start;
    gap: .4rem;
    a{
        font-size: 2rem;
        font-weight: 500;
        padding: .6rem .6rem;
        &:hover {
            color: ${props => props.theme.logo.pink};
        }
    }

    @media ${device.tablet} {
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
        a{
            padding: 1.6rem 0.5rem;
            position: relative;
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
    hover: { borderBottom: `3px solid #d3599c`, opacity: 1 }
}

function LeftSide() {
    //const homeMatch = useRouteMatch("/");
    const galleryMatch = useRouteMatch("/gallery");
    const healthMatch = useRouteMatch("/health");
    const goodsMatch = useRouteMatch("/goods");
    const togetherMatch = useRouteMatch("/together");
    const boardMatch = useRouteMatch("/board");

    const [ hamAdd, setHamAdd ] = useRecoilState(isHamburgerClose);
    const closeHamburger = () => {
        if(hamAdd){
            setHamAdd(false)
        }else{
            setHamAdd(true)
        }
    }
    
  return (
      <LeftMenu>
          <Link to={`/gallery`} onClick={() => closeHamburger()} >Gallery{galleryMatch && <NavStick layoutId='stick' whileHover="hover" variants={NavStickVars} />}</Link>
          {/* <Link to={`/health`} onClick={() => closeHamburger()} >Health{ healthMatch && <NavStick layoutId='stick' whileHover="hover" variants={NavStickVars} />}</Link> */}
          <Link to={`/goods`} onClick={() => closeHamburger()} >Goods{goodsMatch && <NavStick layoutId='stick' whileHover="hover" variants={NavStickVars} />}</Link>
          {/* <Link to={`/together`} onClick={() => closeHamburger()} >Together{togetherMatch && <NavStick layoutId='stick' whileHover="hover" variants={NavStickVars} />}</Link>
          <Link to={`/board`} onClick={() => closeHamburger()} >Board{boardMatch && <NavStick layoutId='stick' whileHover="hover" variants={NavStickVars} />}</Link> */}
      </LeftMenu>
  );
}

export default LeftSide;
