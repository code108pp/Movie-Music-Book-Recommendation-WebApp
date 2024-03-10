
export default (reccList = { genreList: [], movieList: [] }, action) => {
    switch (action.type) {
        case "RECC_OBJECT":
            return { ...reccList, genreList: action.payload.reccGenres , movieList: action.payload.reccMovies };

        default:
            return reccList;
    }
}

// export default genreSelectorReducer;