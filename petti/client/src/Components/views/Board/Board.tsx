import React from 'react';
import { withRouter } from 'react-router-dom';
import Ready from '../../utils/Ready';

function Board() {
  return <div><Ready /></div>;
}

export default withRouter(Board);
