import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '100%',
    overflow: 'hidden',
    '&:hover $handle':{
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    '&:hover $leftHandleArrow, &:hover $rightHandleArrow, &:hover $titleArrow': {
      opacity: '1'
    },
  },

  titleContainer: {
    margin: '0 5rem 0 0',
    // color: "black",
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    '&:hover $viewMore': {
      transform: 'translateX(230px)',
      opacity: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',

    }
  },

  carouselTitle: {
    // width: '330px',
    // width: '25%',
    // color:"black",
    margin: '5px 3.3%',
    padding: '0.34rem 0.47rem 0 0.47rem',
    display: 'flex',
    flexDirection: 'row',
    
  },
  
  listName: {
    color: 'black'
  },

  titleArrow: {
    margin: '0 5px',
    strokeWidth: 2,
    opacity: 0
  },

  viewMore: {
    alignSelf: 'center',
    position: 'absolute',
    margin: '0 10px',
    fontSize: '1.2rem',
    color: 'white',
    opacity: 0,
    transition: '500ms ease-in-out, opacity 300ms ease-in-out',
    backgroundColor: 'rgba(0, 0, 0, 0)',
    border: 'none',
    cursor: 'pointer',
  },

  progressBar: {
    padding: '0 2rem',
    display: 'flex',
    gap: '1rem',
    // backgroundColor: 'red',
    alignItems: 'center'
  },

  progressItem: {
    flex: '0 0 2rem',
    minWidth: '3rem',
    height: '0.1rem',
    borderRadius: '2rem',
    backgroundColor: 'rgba(140, 140, 140, 1)',
  },

  active:{
    backgroundColor: '#5579C6',
  },

  slider: {
    display: 'flex',
    flexDirection: 'row'
  },

  moviesList: {
    // '--slider-index': 2,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '93.4%',
    margin: '6px 0.32rem',
    perspective: 100,
    // overflow: 'auto',
    transform: 'translateX(calc(var(--slider-index) * -100%))',
    // transform: 'translateX(-00%)'
    transition: '750ms ease-in-out',
    // transition: '0.75s cubic-bezier(0.72,-0.01, 0.12, 1)';
  },

  handle: {
    width: '3.2815rem',
    // width: 'calc(0.38 * calc(100% / 10.77))',
    // height: '199px',
    aspectRatio: '50.069 / 199',
    border: 'none',
    borderRadius: '5px',
    backgroundColor: 'rgba(0, 0, 0, 0)',
    alignSelf: 'center',
    zIndex: 10,
    cursor: 'pointer',
    // opacity: 0.5,
    // '&:hover': {
    //   backgroundColor: 'rgba(0, 0, 0, 0.5)',
    // },
    flexGrow: 0,
    flexShrink: 0
  },

  leftHandle: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '&:hover $leftHandleArrow': {
      transform: 'scale(1.5)'
    },   
  },
  rightHandle: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '&:hover $rightHandleArrow': {
      transform: 'scale(1.5)'
    },
  },

  leftHandleArrow: {
    color: 'white',
    transition: '150ms ease-in-out',
    opacity: '0'
    // transitionTimingFunction: 'ease-in-out'
  },
  rightHandleArrow: {
    color: 'white',
    transition: '150ms ease-in-out',
    opacity: '0'
    // transitionTimingFunction: 'ease-in-out'
  }
}));