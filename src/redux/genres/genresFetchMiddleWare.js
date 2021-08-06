export async function genresFetchMiddleWare(dispatch){
    try{
        const respGenres = await fetch("https://react-backend101.herokuapp.com/genres");
        const jsonGneres = await respGenres.json();
        dispatch({
            type: "SUCCESS_GENRES",
            payload: jsonGneres
        })
    }
    catch(err){
        dispatch({type: "ERROR_GENRES", payload: err.message})
    }
}