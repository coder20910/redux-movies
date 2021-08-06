import React from 'react';
import { connect } from "react-redux";
function List({ genres, handleGenre }) {
    return (
        <div>
            <ul className="list-group">
                {genres.map((genreObj) => {
                    
                    return (
                    <li key={(genreObj._id)} className="list-group-item"> 
                        <span aria-current="true" onClick={() => handleGenre(genreObj.name)}>{genreObj.name}</span>
                    </li>)
                })}
            </ul>
        </div>
    )
}
function mapDisptachToProps(store) {
    return (store.Genres);
}
export default connect(mapDisptachToProps)(List);

