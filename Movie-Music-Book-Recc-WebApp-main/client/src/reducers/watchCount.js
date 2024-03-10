
const authReducer = ( watchCount = [], action ) => {
    switch (action.type) {
        case "CREATE":
            localStorage.setItem('watchCount', JSON.stringify( action?.payload ));
            return [ ...watchCount, action.payload ];
            // return [ ...watchCount, action?.payload ];
        case "GET_PER_RECC":
            localStorage.clear();
            return { ...watchCount, watchCount: null };
        default:
            return watchCount;
    }
}

export default authReducer;