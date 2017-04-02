import { WHITE, PRIMARY_COLOR, SECONDARY_COLOR } from 'styles/colors';

const styles = {
  '.home-card': {
    margin: '18% auto 0',
    maxWidth: '400px',
    color: WHITE,
    backgroundColor: SECONDARY_COLOR
  },
  '.portfolio-link': {
    display: 'block',
    width: '100%',
    color: WHITE,
    backgroundColor: `${PRIMARY_COLOR} !important`,
    borderRadius: 0
  }
};

export default styles;
