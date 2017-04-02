import cookies from 'js-cookie';

import { handleAction } from '../utils';

export const EMIT_HANDLE_TAB_CHANGE = 'EMIT_HANDLE_TAB_CHANGE';
export const EMIT_BUZZ_CODE_UPDATE = 'EMIT_BUZZ_CODE_UPDATE';
export const EMIT_HT_SPEAKERS_TOGGLE = 'EMIT_HT_SPEAKERS_TOGGLE';
export const EMIT_SEND_EVENT = 'EMIT_SEND_EVENT';
export const EMIT_PROXY_RESPONSE = 'EMIT_PROXY_RESPONSE';
export const EMIT_PROXY_RESPONSE_RESET = 'EMIT_PROXY_RESPONSE_RESET';
export const EMIT_TOGGLE_DEADBOLT_INPUT = 'EMIT_TOGGLE_DEADBOLT_INPUT';
export const EMIT_TOGGLE_DESK_HEIGHT_INPUT = 'EMIT_TOGGLE_DESK_HEIGHT_INPUT';
export const EMIT_SEND_DEADBOLT_COM = 'EMIT_SEND_DEADBOLT_COM';

export const emitHandleTabChange = (tabsIndex) => ({
  type: EMIT_HANDLE_TAB_CHANGE,
  tabsIndex
});

export const emitHTSpeakersToggle = (useHTSpeakers) => ({
  type: EMIT_HT_SPEAKERS_TOGGLE,
  useHTSpeakers
});

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

export const emitToggleDeadboltInput = (deadboltInputDisabled) => ({
  type: EMIT_TOGGLE_DEADBOLT_INPUT,
  deadboltInputDisabled
});

export const emitToggleDeskHeightInput = (deskHeightInputDisabled) => ({
  type: EMIT_TOGGLE_DESK_HEIGHT_INPUT,
  deskHeightInputDisabled
});

export const emitSendDeadboltCom = (passcode) => ({
  type: EMIT_SEND_DEADBOLT_COM,
  passcode
});

const initialState = {
  documentTitle: 'Admin',
  tabsIndex: 0,
  deadboltInputDisabled: true,
  deskHeightInputDisabled: true,
  useHTSpeakers: false,
  passcode: cookies.get('passcode') || ''
};

const homeReducer = (state = initialState, action) => {
  const reducers = {
    [EMIT_HANDLE_TAB_CHANGE]: () => ({
      ...state,
      tabsIndex: action.tabsIndex
    }),

    [EMIT_HT_SPEAKERS_TOGGLE]: () => ({
      ...state,
      useHTSpeakers: action.useHTSpeakers
    }),

    [EMIT_BUZZ_CODE_UPDATE]() {
      cookies.set('passcode', action.passcode);

      return {
        ...state,
        passcode: action.passcode
      };
    },

    [EMIT_TOGGLE_DEADBOLT_INPUT]: () => ({
      ...state,
      deadboltInputDisabled: action.deadboltInputDisabled
    }),

    [EMIT_TOGGLE_DESK_HEIGHT_INPUT]: () => ({
      ...state,
      deskHeightInputDisabled: action.deskHeightInputDisabled
    }),

    [EMIT_PROXY_RESPONSE]: () => ({
      ...state,
      proxyResponseStatus: action.status
    }),

    [EMIT_PROXY_RESPONSE_RESET]: () => ({
      ...state,
      proxyResponseStatus: undefined
    })
  };

  return handleAction(state, action, reducers);
};

export default homeReducer;
