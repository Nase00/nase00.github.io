import React from 'react';
import PropTypes from 'prop-types';
import { Input, Button } from 'react-toolbox';

import { NASE_CRED } from 'constants';

const AuthOperations = (props) => {
  const { actions, inputValues } = props;
  const setLocalStorage = () => {
    localStorage.setItem(NASE_CRED, JSON.stringify(inputValues));
  };

  return (
    <section className='operations'>
      <div className='inputs'>
        <Input
          type='text'
          value={inputValues.id}
          label='ID'
          onChange={(value) => actions.emitInputUpdate('id', value)}/>
        <Input
          type='text'
          label='Password'
          value={inputValues.password}
          onChange={(value) => actions.emitInputUpdate('password', value)}/>
        <Input
          type='text'
          label='Proxy'
          value={inputValues.proxy}
          onChange={(value) => actions.emitInputUpdate('proxy', value)}/>
      </div>
      <Button className='submit-command' onClick={setLocalStorage} raised>
        Update
      </Button>
    </section>
  );
};

AuthOperations.propTypes = {
  inputValues: PropTypes.shape({
    id: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    proxy: PropTypes.string.isRequired
  }).isRequired,
  actions: PropTypes.shape({
    emitInputUpdate: PropTypes.func.isRequired
  }).isRequired
};

export default AuthOperations;
