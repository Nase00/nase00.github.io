import { WHITE, BLACK, DARK_GREY, PRIMARY_COLOR, SECONDARY_COLOR } from 'styles/colors';

const styles = {
  '.home-card': {
    textAlign: 'center',
    margin: '18% auto 0',
    maxWidth: '400px',
    color: WHITE,
    border: `1px solid ${PRIMARY_COLOR}`,
    borderRadius: '0 !important',
    backgroundColor: DARK_GREY,
    transition: 'all .25s ease-out'
  },
  '.home-card:hover': {
    transition: 'all .25s ease-out',
    border: `1px solid ${SECONDARY_COLOR}`
  },
  '.portfolio-link': {
    display: 'block',
    width: '100%',
    color: WHITE,
    backgroundColor: PRIMARY_COLOR,
    borderRadius: 0,
    transition: 'all .25s ease-out'
  },
  '.portfolio-link:hover': {
    transition: 'all .25s ease-out',
    color: BLACK,
    backgroundColor: SECONDARY_COLOR
  }
};

export default styles;
