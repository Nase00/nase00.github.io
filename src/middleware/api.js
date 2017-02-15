import sendEvent from './send-event';
import { EMIT_SEND_EVENT } from '../ducks/admin';

export default () => (next) => (action) => {
  switch (action.type) {
    case EMIT_SEND_EVENT:
      sendEvent(next, action);
  }

  next(action);
};
