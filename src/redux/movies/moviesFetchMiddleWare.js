export async function moviesFetchMiddleWare(dispatch) {
    try{
        const resp = await fetch("https://react-backend101.herokuapp.com/movies");
        const movies = await resp.json();
        dispatch({
            type: "success_movies",
            payload: movies
        })
    
    }

    catch (err){
        dispatch({
            type:"error_users",
            payload: err.message
        })
    }
}
