import { WHITE, secondary, DARK_GREY, LIGHT_GREY } from 'styles/colors';

const styles = {
  '.switch-active > span': {
    color: WHITE
  },

  '.switch-inactive > span': {
    color: LIGHT_GREY
  },

  '.operations-passcode-input': {
    width: '200px',
    margin: '40px auto 0'
  },

  'section.operations': {
    margin: 'auto',
    minHeight: '100%',
    width: '100%',
    color: WHITE,
    transition: 'background-color .75s ease'
  },
  '.submit-command': {
    margin: '20px 0',
    display: 'block',
    width: '100%',
    color: WHITE,
    backgroundColor: `${secondary} !important`,
    borderRadius: 0
  },
  '.status-indicator': {
    fontSize: '24px',
    transition: 'color .75s ease-in-out'
  },
  '.disabled': {
    backgroundColor: `${LIGHT_GREY} !important`
  },
  '.switches': {
    margin: 'auto',
    width: '200px',
    textAlign: 'left'
  }
};

export const statusColors = {
  200: {
    color: '#00FF00',
    backgroundColor: '#6CD86C',
    transition: 'background-color .75s ease'
  },
  401: {
    color: '#FF0000',
    backgroundColor: '#FF0000',
    transition: 'backgroundColor .75s ease'
  },
  404: {
    color: '#F27430',
    backgroundColor: '#F27430',
    transition: 'backgroundColor .75s ease'
  },
  undefined: {
    color: 'DARK_GREY'
  }
};

export default styles;
