import * as api from '../api/backend.js';

export const getPerReccomendation = ( email ) => async ( dispatch ) => {
    try {
        const { watchCountData } = await api.createWatchCount( email );

        dispatch({type: "GET_PER_RECC", payload: watchCountData })
    } catch (error) {
        console.log(error)
    }
}