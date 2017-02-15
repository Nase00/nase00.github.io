import { handleAction } from '../utils';

const initialState = {};

const homeReducer = (state = initialState, action) => {
  const reducers = {};

  return handleAction(state, action, reducers);
};

export default homeReducer;
