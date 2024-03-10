import { makeStyles } from '@material-ui/core/styles';

export default makeStyles({

    container: {
        // minWidth: '22.5%',
        // maxWidth: '22.5%',
        // backgroundColor: 'rgb(0 102 255 / 39%)',
        backgroundColor: 'transparent',
        // backgroundColor: 'rgb(136 182 251 / 98%)',
        height: '100%',
        // margin: '2%',
        // padding: '0.5rem',
        display: 'flex',
        flexDirection: 'row',
        // borderRadius: '0.75rem',
        '&:hover': {
            transform: 'scale(1.025, 1.025)'
        },
        '&:hover $info': {
            backgroundColor: '#3A3B3C'
        },
        transition: '200ms ease-in-out',
        
    },
    
    mediaContainer: {
        maxHeight: '100%',
        // margin: '0 0.5rem 0 0'
    },
    

    media: {
        maxHeight: '100%',
        borderRadius: '0.5rem',
    },
    
    info: {
        width: '100%',
        padding:'2.5rem 1rem 0.5rem 1rem',
        borderRadius: '0.5rem',
        color: 'white',
        // backgroundColor: 'rgb(255 255 255 / 12%)',
        // backgroundColor: '#282828',
        // backgroundColor: 'black',
        position: 'relative',
        background: ' linear-gradient(to bottom, #282828 50%, rgba(85, 121, 198, 0.3) 100%)',

    },

    title: {
        fontSize: '1.5rem',
        textDecoration:'none'
    },

    genreList: {
        display:'flex', 
        flexDirection:'row', 
        flexWrap:'wrap'
    },

    genreChip: {
        padding: '0.2rem',
        margin: '0.2rem 0.2rem',
        border: '1px solid white',
        borderRadius: '1rem',
        color: 'white',
        '&:hover': {
            backgroundColor: 'white',
            color: 'black'
        },
        textDecoration:'none', 
    },

    ratingChip:{
        width: '5rem',
        fontSize: '1rem',
        color: 'white',
        position: 'absolute',  
        right:'-2%',
        // bottom: '-2%',
        top: '-2%',
        backgroundColor: '#5579C6',
        // backgroundColor: 'rgb(255,215,0)',
        borderRadius: '2%',
        display: 'flex',
        flexDirection: 'row-reverse',
        // justifyContent: 'left'
    },

});