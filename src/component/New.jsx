import React, { useState } from 'react';
import { connect } from "react-redux";

function New(props) {
    let { genres } = props;
    const [data, setData] = useState({
        title: "",
        genre: {_id:"", name:""},
        stock: '',
        rate: '',
    });
    const [success, setSuccess] = useState(null);

    const handleChange = (e) => {
        let id = e.currentTarget.id;
        let value = e.target.value.trim();

        if(id === "stock" || id === "rate"){
            value = Number(value);
        }

        if(id === "genre"){
            for (let i = 0; i < genres.length; i++) {
                if (genres[i].name === value) {
                    value = genres[i];
                    break;
                }
            }
        }
        console.log(id, value);
        let newObj = { ...data };
        newObj[id] = value;
        setData(newObj);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        props.addDataToMovies(data);

        setSuccess(true);
    }
    const handleSuccess = () => {
        setSuccess(null);
        setData({
            title: "",
            genre: "",
            stock: "",
            rate: ""
        })
    } 
    return (
        <>{success !== true
            ?
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input type="text" className="form-control" id="title"
                        value={data.title}
                        onChange={handleChange}
                        placeholder="Enter movie name" />
                </div>
                <div className="form-group">
                    <label className="form-control" htmlFor="genre">Genre</label>
                    <select name="genre" id="genre" value={data.genre.name} onChange={handleChange}>
                        <option value=""></option>
                        <option value="Action">Action</option>
                        <option value="Comedy">Comedy</option>
                        <option value="Thriller">Thriller</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="stock">Stock</label>
                    <input type="number" className="form-control" id="stock"
                        value={data.stock}
                        onChange={handleChange}
                        placeholder="Enter number of stocks" />
                </div>

                <div className="form-group">
                    <label htmlFor="rate">Rate</label>
                    <input type="number" className="form-control" id="rate"
                        placeholder="Enter rate of per movie"
                        value={data.rate}
                        onChange={handleChange}/>
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            : <div>
                <span>Data inserted SuccessFully !</span>
                <div>
                    <button onClick={handleSuccess}>Insert Another Movie</button>
                </div>
            </div>
        }
        </>
    )
}
const mapStateToProps = store => {
    return store.Genres
}
const mapDispatchProps = dispatch => {
    return {
        addDataToMovies: (data) => dispatch({ type: "Add_Movie", payload: data })
    }
}
export default connect(mapStateToProps, mapDispatchProps)(New);
