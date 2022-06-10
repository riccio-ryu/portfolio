import React from 'react'
import styled from 'styled-components'

const ReadyWrap = styled.div`
  font-size: 3rem;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
    height: calc(100vh - 5.6rem);
    text-align: center;
`

function Ready() {
  return (
    <ReadyWrap>Not ready yet. Please wait for an update soon...</ReadyWrap>
  )
}

export default Ready