let initialState = {
    movies:[],
    error: "",
    loading: true,
}
function moviesReducer(state = initialState, action){
    switch (action.type){
        case "success_movies":
            return{
                ...state,
                movies: [...action.payload.movies],
                loading: false
            }
        case "error_movies":
            return{
                ...state,
                error: action.payload,
                loading: false
            }
        case "Add_Movie":
                let {title, genre, stock, rate} = action.payload;
            
                let moviesObj = {
                  _id: Date.now(),
                  title,
                  genre, 
                  numberInStock: stock,
                  dailyRentalRate: rate
                }
                return {
                    ...state,
                    movies: [...state.movies, moviesObj]
                }
                
        case "Delete_Movie":
            let moviesNotTobedeleted = state.movies.filter( (moviesObj) =>{
                return moviesObj._id !== action.payload.id;
            })
            
            return {
                ...state,
                movies: moviesNotTobedeleted,
            }
        default:
            return state;
    }
}
export default moviesReducer;