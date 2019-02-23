import { NASE_CRED } from 'constants';
import { handleAction } from 'utils';

export const EMIT_INPUT_UPDATE = 'EMIT_INPUT_UPDATE';
export const EMIT_HANDLE_TAB_CHANGE = 'EMIT_HANDLE_TAB_CHANGE';
export const EMIT_HT_SPEAKERS_TOGGLE = 'EMIT_HT_SPEAKERS_TOGGLE';
export const EMIT_SEND_EVENT = 'EMIT_SEND_EVENT';
export const EMIT_PROXY_RESPONSE = 'EMIT_PROXY_RESPONSE';
export const EMIT_PROXY_RESPONSE_RESET = 'EMIT_PROXY_RESPONSE_RESET';
export const EMIT_TOGGLE_DEADBOLT_INPUT = 'EMIT_TOGGLE_DEADBOLT_INPUT';
export const EMIT_TOGGLE_DESK_HEIGHT_INPUT = 'EMIT_TOGGLE_DESK_HEIGHT_INPUT';
export const EMIT_SEND_DEADBOLT_COM = 'EMIT_SEND_DEADBOLT_COM';
export const EMIT_HASHED_PASSWORD_UPDATE = 'EMIT_HASHED_PASSWORD_UPDATE';

export const emitInputUpdate = (key, value) => ({
  type: EMIT_INPUT_UPDATE,
  key,
  value
});

export const emitHandleTabChange = (tabsIndex) => ({
  type: EMIT_HANDLE_TAB_CHANGE,
  tabsIndex
});

export const emitHTSpeakersToggle = (useHTSpeakers) => ({
  type: EMIT_HT_SPEAKERS_TOGGLE,
  useHTSpeakers
});

export const emitSendEvent = (params) => ({
  type: EMIT_SEND_EVENT,
  ...params
});

export const emitToggleDeadboltInput = (deadboltInputDisabled) => ({
  type: EMIT_TOGGLE_DEADBOLT_INPUT,
  deadboltInputDisabled
});

export const emitToggleDeskHeightInput = (deskHeightInputDisabled) => ({
  type: EMIT_TOGGLE_DESK_HEIGHT_INPUT,
  deskHeightInputDisabled
});

export const emitSendDeadboltCom = (password) => ({
  type: EMIT_SEND_DEADBOLT_COM,
  password
});

export const emithashedPasswordUpdate = (hashedPassword) => ({
  type: EMIT_HASHED_PASSWORD_UPDATE,
  hashedPassword
});

const savedInputValuesFromLS = localStorage.getItem(NASE_CRED);
const savedInputValues = savedInputValuesFromLS ? JSON.parse(savedInputValuesFromLS) : {};
const initialState = {
  documentTitle: 'Admin',
  tabsIndex: 0,
  deadboltInputDisabled: true,
  deskHeightInputDisabled: true,
  useHTSpeakers: false,
  id: savedInputValues.id || '',
  password: savedInputValues.password || '',
  proxy: savedInputValues.proxy || '',
  hashedPassword: '',
  inputValues: {
    id: savedInputValues.id || '',
    password: savedInputValues.password || '',
    proxy: savedInputValues.proxy || ''
  }
};

const homeReducer = (state = initialState, action) => {
  const reducers = {
    [EMIT_INPUT_UPDATE]: () => ({
      ...state,
      inputValues: {
        ...state.inputValues,
        [action.key]: action.value
      }
    }),

    [EMIT_HANDLE_TAB_CHANGE]: () => ({
      ...state,
      tabsIndex: action.tabsIndex
    }),

    [EMIT_HT_SPEAKERS_TOGGLE]: () => ({
      ...state,
      useHTSpeakers: action.useHTSpeakers
    }),

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
    }),

    [EMIT_HASHED_PASSWORD_UPDATE]: () => ({
      ...state,
      hashedPassword: action.hashedPassword
    })
  };

  return handleAction(state, action, reducers);
};

export default homeReducer;
