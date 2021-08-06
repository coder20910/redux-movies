import React, { useState } from 'react';
import Pagination from './Pagination';
import List from './List';
import { Link } from 'react-router-dom';
import {connect} from "react-redux";

function MoviesPage(props){
    let {movies, loading} = props;	

    const [searchinput, setSearchInput] = useState("");
    const [limit, setLimt] = useState(4);
    const [currPage, setCurrPage] = useState(1);
    const [cGenre, setCGenre] = useState("All Genres");
    const [sortedMovies, setSortedMovies] = useState([]);

    let fileteredArr = movies;

    const handleSearch = (ele) =>{
        let task = ele.target.value;
        setSearchInput(task);
    }
    const limitHandler = (e) =>{
        let currLimit = e.target.value;
        if (currLimit < 1){
            return ;
        }
        setLimt(currLimit);
    }
    const changeCurrPage = (pageNum) => {
        setCurrPage(pageNum);
    }

    const handleGenre = (genreName) => {
        setCGenre(genreName);
        setSearchInput("");
    }
    
    const sortMoviesRate =(e) => {
        let clsName = e.target.className.trim();
        let sortedMoviesByRate;
        if (clsName === "fas fa-sort-up"){
            sortedMoviesByRate = movies.sort(function(moviesObjA,moviesObjB){
                return (moviesObjA.dailyRentalRate - moviesObjB.dailyRentalRate)});
        }
        else{
            sortedMoviesByRate = movies.sort(function(moviesObjA,moviesObjB){
                return (moviesObjB.dailyRentalRate - moviesObjA.dailyRentalRate)});
        }
        setSortedMovies(sortedMoviesByRate);
        if (sortedMovies !== []){
            movies = sortedMovies;
            setSortedMovies([]);
        }
    }
    const sortMoviesStock =(e) => {
        let clsName = e.target.className.trim();
        
        let sortedMoviesbyStocks;
    
        if (clsName === "fas fa-sort-up"){
            sortedMoviesbyStocks = movies.sort(function(moviesObjA, moviesObjB){
                return (moviesObjA.numberInStock - moviesObjB.numberInStock)});
        }
        else{
            sortedMoviesbyStocks = movies.sort(function(moviesObjA, moviesObjB){
                return (moviesObjB.numberInStock - moviesObjA.numberInStock)});
            
        }
        setSortedMovies(sortedMoviesbyStocks);
        if(sortedMoviesbyStocks !== []){
            movies = sortedMovies;
            setSortedMovies([]);
        }
    }
    
    
    
    
    // Sort on the basis of genre
    if(cGenre !== "All Genres"){

        let fileteredArrbyGenre = fileteredArr.filter((moviesObj) => {
            return moviesObj.genre.name === cGenre;
        })
        fileteredArr = fileteredArrbyGenre;
    }
    
    // Search 
    if (searchinput !== ""){
       let fileteredArrbySearch = fileteredArr.filter((moviesObj) => {
            let title = moviesObj.title.trim().toLowerCase();
            return title.includes(searchinput.trim().toLowerCase());
        })   
        fileteredArr = fileteredArrbySearch;
    }
    
    // To calc total num of pages
    let pagesNumber = Math.ceil(fileteredArr.length / limit);
    
    // To calc num of contents in a single page
    let si = (currPage - 1) * limit;
    let ei = Number(si) + Number(limit);
    
    
    fileteredArr = fileteredArr.slice(si, ei);
    
    return (
        <>
        <div className="row">
            {/* Curr row will be divied into 12 parts in bootstrap */}
            <div className="col-3">
                {/* Here it containes 3 colunms */}
                <List    
                    handleGenre={handleGenre}>
                </List>
            </div>

            <div className="col-9">
                <div className="inputContainer">
                    <Link to="/new" className="active">New</Link>
                    <input type ="search" value={searchinput} 
                    onChange = {handleSearch}/>
                    < input type="number" className="limitHande" value ={limit} onChange={limitHandler}/>
                </div>
                {/* <div className="pageHandler">
                </div> */}
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Title</th>
                            <th scope="col">Genre</th>
                            
                            <th scope="col"><i className="fas fa-sort-up" onClick={sortMoviesStock}></i>
                                Stock
                                <i className="fas fa-sort-down" onClick={sortMoviesStock}></i></th>
                            <th scope="col"><i className="fas fa-sort-up" onClick={sortMoviesRate}></i>
                                Rate
                            <i className="fas fa-sort-down" onClick={sortMoviesRate}></i></th>
                            
                        </tr>
                    </thead>
                    <tbody>
                    {loading === true 
                        ? <tr><td>Loading....</td></tr>

                        : fileteredArr.map((moviesObj) => {
                        return (
                            <tr key={moviesObj._id}>
                                <td>{moviesObj.title}</td>
                                <td>{moviesObj.genre.name}</td>
                                <td>{moviesObj.numberInStock}</td>
                                <td>{moviesObj.dailyRentalRate}</td>
                                <td><button className="btn btn-danger" onClick = {()=> props.deleteMovie(moviesObj._id)}>Delete</button></td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
                <Pagination 
                    pagesNumber={pagesNumber} 
                    currPage= {currPage} 
                    changeCurrPage = {changeCurrPage}>
                </Pagination>
            </div>
        </div>
    </>
    )
}
function mapStateToProps(store){
    return store.Movies;
}
function mapDispatchToProps(dispatch){
    return {
        deleteMovie : (id) => dispatch({type:"Delete_Movie", payload: {id}})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MoviesPage);