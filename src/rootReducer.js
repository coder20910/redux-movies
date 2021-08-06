import { combineReducers } from "redux";
import moviesReducer from "./redux/movies/moviesReducer";
import genresReducer from "./redux/genres/genresReducer";
// merged store 
const rootReducer = combineReducers({
    Movies: moviesReducer,
    Genres: genresReducer
})

export default rootReducer;