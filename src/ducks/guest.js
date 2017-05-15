import cookies from 'js-cookie';

import { handleAction } from '../utils';

export const EMIT_BUZZ_CODE_UPDATE = 'EMIT_BUZZ_CODE_UPDATE';
export const EMIT_SPOTIFY_URI_UPDATE = 'EMIT_SPOTIFY_URI_UPDATE';
export const EMIT_SEND_EVENT = 'EMIT_SEND_EVENT';
export const EMIT_PROXY_RESPONSE = 'EMIT_PROXY_RESPONSE';
export const EMIT_PROXY_RESPONSE_RESET = 'EMIT_PROXY_RESPONSE_RESET';

export const emitPasscodeUpdate = (passcode) => ({
  type: EMIT_BUZZ_CODE_UPDATE,
  passcode
});

export const emitSendEvent = (passcode, proxy, events) => ({
  type: EMIT_SEND_EVENT,
  passcode,
  proxy,
  events
});

export const emitSpotifyURIUpdate = (spotifyURI) => ({
  type: EMIT_SPOTIFY_URI_UPDATE,
  spotifyURI
});

const initialState = {
  documentTitle: 'Guest',
  spotifyURI: '',
  passcode: cookies.get('passcode') || ''
};

const homeReducer = (state = initialState, action) => {
  const reducers = {
    [EMIT_PROXY_RESPONSE]: () => ({
      ...state,
      proxyResponseStatus: action.status
    }),

    [EMIT_PROXY_RESPONSE_RESET]: () => ({
      ...state,
      proxyResponseStatus: undefined
    }),

    [EMIT_BUZZ_CODE_UPDATE]: () => ({
      ...state,
      passcode: action.passcode
    }),

    [EMIT_SPOTIFY_URI_UPDATE]: () => ({
      ...state,
      spotifyURI: action.spotifyURI
    })
  };

  return handleAction(state, action, reducers);
};

export default homeReducer;
