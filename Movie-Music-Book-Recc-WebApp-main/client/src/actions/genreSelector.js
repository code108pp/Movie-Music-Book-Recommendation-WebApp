import * as api from "../api/backend.js";
// import * as api from "../api/tmdb.js";

// export const getMovies = (page, id, name) => async(dispatch) => {
//     try {
//         await api.fetchMovies( id);

//         dispatch({type: "GENRE_CHANGE", payload: {name: name, id: id}})
//     } catch (error) {
//         console.log(error.message);
//     }
// }

export const getReccGenreCall = ( email ) => async (dispatch) => {
    try {
        const { data } = await api.getReccGenre(email);

        // console.log(data.reccGenres);

        // setReccGenres(data.reccGenres);

        dispatch({ type: "RECC_OBJECT", payload: data });

        return data.reccMovies;
    } catch (error) {
        console.log(error)
    }
}