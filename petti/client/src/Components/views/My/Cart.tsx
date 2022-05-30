import React from 'react'
import { useRouteMatch } from 'react-router-dom';
import Ready from '../../utils/Ready'

function Cart() {
  const galleryMatch = useRouteMatch("/gallery");
  return (
    <div><Ready /></div>
  )
}

export default Cart