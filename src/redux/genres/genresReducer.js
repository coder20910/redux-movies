let initialState = {
    genres: [{id:1, name:"All Genres"}],
    loading: true,
    error : ""
}
function genresReducer(state = initialState, action){
    switch (action.type) {
        case "SUCCESS_GENRES":
            return {
                ...state,
                genres: [...state.genres, ...action.payload.genres],
                loading: false
            }
        case "ERROR_GENRES":
            return{
                ...state,
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}
export default genresReducer;