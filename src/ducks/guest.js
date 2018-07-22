import cookies from 'js-cookie';

import { handleAction } from '../utils';

export const EMIT_BUZZ_CODE_UPDATE = 'EMIT_BUZZ_CODE_UPDATE';
export const EMIT_SPOTIFY_URI_UPDATE = 'EMIT_SPOTIFY_URI_UPDATE';
export const EMIT_RGB_UPDATE = 'EMIT_RGB_UPDATE';
export const EMIT_SEND_EVENT = 'EMIT_SEND_EVENT';
export const EMIT_PROXY_RESPONSE = 'EMIT_PROXY_RESPONSE';
export const EMIT_PROXY_RESPONSE_RESET = 'EMIT_PROXY_RESPONSE_RESET';

export const emitPasswordUpdate = password => ({
  type: EMIT_BUZZ_CODE_UPDATE,
  password
});

export const emitSendEvent = (password, proxy, events) => ({
  type: EMIT_SEND_EVENT,
  password,
  proxy,
  events
});

export const emitSpotifyURIUpdate = spotifyURI => ({
  type: EMIT_SPOTIFY_URI_UPDATE,
  spotifyURI
});

export const emitRGBUpdate = color => ({
  type: EMIT_RGB_UPDATE,
  color
});

const initialState = {
  documentTitle: 'Guest',
  spotifyURI: '',
  rgb: { r: 255, g: 0, b: 255 },
  password: cookies.get('password') || ''
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
      password: action.password
    }),

    [EMIT_SPOTIFY_URI_UPDATE]: () => ({
      ...state,
      spotifyURI: action.spotifyURI
    }),

    [EMIT_RGB_UPDATE]: () => ({
      ...state,
      rgb: action.color.rgb
    })
  };

  return handleAction(state, action, reducers);
};

export default homeReducer;
