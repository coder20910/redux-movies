import React, {useEffect} from 'react'
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";

import MoviesPage from "./component/MoviesPage";
import Navbar from "./component/Navbar";
import Login from "./component/Login";
import New from "./component/New";

import {moviesFetchMiddleWare} from './redux/movies/moviesFetchMiddleWare';
import {genresFetchMiddleWare} from './redux/genres/genresFetchMiddleWare';
import {connect} from "react-redux";

function App(props) {
  let {fetchMovies, fetchGenres} = props; 
  // To avoid warning of useEffect

  useEffect(() => {
    fetchMovies();
  },[fetchMovies]);
  
  useEffect(()=>{
    fetchGenres();
  }, [fetchGenres])
  return (
      <Router>
        <Navbar></Navbar>
        <Switch>
          <Route path="/new" component={New}></Route>
          <Route path="/login" component={Login}></Route>
          <Route path="/" exact component={MoviesPage}></Route>
        </Switch>
      </Router>
  )
}
function mapDispatchToProps(dispatch) {
  return {
    fetchMovies: () => {
      return dispatch(moviesFetchMiddleWare);
    },
    fetchGenres : () => {
      return dispatch(genresFetchMiddleWare);
    }
  }
}
export default connect(null, mapDispatchToProps)(App);
