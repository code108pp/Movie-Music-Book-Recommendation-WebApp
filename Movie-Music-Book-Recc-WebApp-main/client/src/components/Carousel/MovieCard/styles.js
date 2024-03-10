import { makeStyles } from '@material-ui/core/styles';

export default makeStyles({

  container: {
    padding: '0 0.32rem',
    minWidth: 'calc(100% / 10)',

  },

  media: {
    // height: '115px',
    // height: '100%',
    // width: '132px', 
    margin: '0.32rem',
    aspectRatio: '185 / 278',
    borderRadius: '5px',
    // maxHeight: '100%',
    // maxWidth: '185px',
    // paddingTop: '56.25%',
    backgroundColor: 'rgba(0, 0, 0, 0.15)',
    backgroundBlendMode: 'darken',
  },

  card: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    background: 'transparent',
    // padding: '0.32rem',
    // maxWidth: 132,
    // minWidth: 132,
    minWidth: 'calc(100% / 10)',
    // flex: 'calc(100% / 10.77)',
    borderRadius: '5px',
    boxShadow: 'none', 
    // height: '70%',
    // margin: '0.32rem',
    position: 'relative',
    overflow: 'hidden',
    transition: '0.5s',
    '&:hover': {
      transform: 'scale(1.075, 1.075)'
    },
    '&:hover $media': {
      backgroundColor: 'rgba(0, 0, 0, 0.0)',
    },
  },

  title: {
    margin: '3px 0 0 0',
    padding: '3px 7px 0 7px',
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'center',
    alignItems: 'center',
    minHeight: '43.03px',
    maxHeight: '43.03px',
    overflow: 'hidden'
  },

  overlay2: {
    position: 'absolute',
    top: '2px',
    right: '-14px',
    // color: 'white',
  },
  
  addToWatchlistBtn: {
    color: '#9e9e9e',
    '&:hover': {
      color: 'white',
    } 
  }
  
});