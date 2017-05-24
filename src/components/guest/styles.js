import { WHITE, PRIMARY_COLOR, LIGHT_GREY } from 'styles/colors';

const styles = {
  '.operations-help': {
    padding: '20px 0',
    fontSize: '16px'
  },

  '.operations-header': {
    padding: '20px',
    fontSize: '16px',
    textAlign: 'left'
  },

  a: {
    color: PRIMARY_COLOR
  },

  '.operations-input': {
    width: '260px',
    margin: '0 auto 0'
  },

  '.operations-table': {
    padding: '0 20px'
  },

  'section.operations': {
    overflow: 'hidden',
    position: 'absolute',
    left: '0',
    margin: '30px auto',
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
  },

  coloredText: color => ({
    textShadow: `-1px 0 ${color}, 0 1px ${color}, 1px 0 ${color}, 0 -1px ${color}`
  })
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
