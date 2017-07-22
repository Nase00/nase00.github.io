import React from 'react';
import PropTypes from 'prop-types';
import { StyleRoot, Style } from 'radium';

import { base } from '../config/composition';
import styles from './styles';

const Body = props => {
  const isProd = process.env.NODE_ENV === 'production';
  const DevTools = isProd ? null : require('./dev-tools').default;

  return (
    <StyleRoot>
      <Style rules={styles}/>
      {isProd ? null : <DevTools/>}
      <div className='body-container'>
        {props.children}
      </div>
    </StyleRoot>
  );
};

Body.propTypes = {
  children: PropTypes.node.isRequired
};

export default base(Body);
