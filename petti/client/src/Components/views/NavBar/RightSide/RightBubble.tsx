import React from 'react'
import { actLogout } from '../../../../api';
import { useMutation } from 'react-query';
import styled from 'styled-components';
import { device } from '../../../utils/Size';
import { isLoginUser, isProfileOpen } from '../../../../atoms';
import { useRecoilState } from 'recoil';

const BubbleWrap = styled.div`
    background-color: transparent;
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
`
const BubbleContainer = styled.div`
    border-radius: .4rem;
    border: 1px solid ${props => props.theme.dark.lighter};
    position: absolute;
    top: 5rem;
    right: 3rem;
`
const BubbleBox = styled.div`
    border-radius: .4rem;
    background-color: ${props => props.theme.light.darker};
    display: flex;
    flex-direction: column;
    justify-content: baseline;
    align-items: baseline;
    padding: .4rem;
    box-sizing: border-box;
    position: relative;
`
const BubbleAnk = styled.a`
    height: auto !important;
    padding: .4rem 1rem !important;
    font-size: 1.4rem !important;
    :hover{
        cursor: pointer;
    }
`
const BubbleTri = styled.span`
    /* width: 0px;
    height: 0px;
    border-bottom: calc( .4rem * 1.732 ) solid ${props => props.theme.dark.lighter};
    border-left: .4rem solid transparent;
    border-right: .4rem solid transparent; */
    width: 1rem;
    height: 1rem;
    background-color: ${props => props.theme.light.darker};
    border: 1px solid ${props => props.theme.dark.lighter};
    position: absolute;
    top: -0.5rem;
    right: 0.8rem;
    transform: rotate(45deg);
`

function RightBubble(props:any) {
    
    const [ loginUser, setLoginUser ] = useRecoilState(isLoginUser)
    const [ profileOpen, setProfileOpen ] = useRecoilState(isProfileOpen)
    const logoutMutation = useMutation( () => actLogout() )
    const logoutSubmit = () => {
        logoutMutation.mutateAsync()
            .then(res => {
                console.log(res)
                if(res.data.success){
                    setLoginUser("")
                    window.location.reload()
                }else{
                    alert(`logout error`)
                }
            })
    }

    const toggleBubble = () => {
        setProfileOpen(false)
    }

  return (
    <BubbleWrap onClick={toggleBubble}>
        <BubbleContainer>
            <BubbleTri />
            <BubbleBox>
                <BubbleAnk>Profile</BubbleAnk>
                <BubbleAnk href='#' onClick={logoutSubmit} >Sign Out</BubbleAnk>
            </BubbleBox>
        </BubbleContainer>
    </BubbleWrap>
  )
}

export default RightBubble