import { WHITE, PRIMARY_COLOR, LIGHT_GREY } from 'styles/colors';

const styles = {
  '.tabs': {
    margin: '0 auto',
    width: '200px'
  },

  '.tab': {
    color: WHITE,
    width: '100px'
  },

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
    overflow: 'hidden',
    position: 'absolute',
    left: '0',
    margin: 'auto',
    minHeight: '100%',
    height: '1000px',
    width: '100%',
    color: WHITE,
    transition: 'background-color .75s ease'
  },
  '.submit-command': {
    margin: '20px 0',
    display: 'block',
    width: '100%',
    color: WHITE,
    backgroundColor: `${PRIMARY_COLOR} !important`,
    borderRadius: '0'
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
    width: '300px',
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
