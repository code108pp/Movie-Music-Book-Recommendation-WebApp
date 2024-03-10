import * as api from '../api/backend.js';

export const signin = ( profile, setIsLogged, navigate ) => async (dispatch) => {
    try {
        const { data } = await api.signIn( profile.email, profile.password );
        // console.log(profile)
        // const  watchCountData  = await api.doesWatchCountExist( profile.email );
        // console.log(watchCountData)

       
        // if( data.status === true && watchCountData.doesExist === false ) {
        //     var { watchCountUserData } = await api.createWatchCount( profile.email );
        // }

        if ( data.status === true ) {
            dispatch({ type: "AUTH", data });
            setIsLogged(true);
            // navigate('/');
            // window.location.reload();
        }
        
        // console.log(data)
        // console.log(watchCountUserData)

        // navigate('/home'); 

    } catch (error) {
        console.log(error); 
    }
}

export const signup = ( profile, navigate, setIsSignUp ) => async (dispatch) => {
    try {
        const { data } = await api.signUp( profile.userName, profile.email, profile.password );
        
        dispatch({ type: "AUTH", data });
        
        // navigate('/home');
        setIsSignUp(0);
        navigate('/');
        window.location.reload();
    } catch (error) {
        console.log(error);
    }
    
}



export const logout = ( setIsLogged, navigate ) => async (dispatch) => {
    try {
        dispatch({ type: "LOGOUT" });

        setIsLogged(false);
        // navigate('/');
        // window.location.reload();
    } catch (error) {
        console.log(error);
    }
}