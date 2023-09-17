import React from 'react';
import { withRouter } from 'react-router-dom';
import Ready from '../../utils/Ready';

function Health() {
  return <div><Ready /></div>;
}

export default withRouter(Health);
