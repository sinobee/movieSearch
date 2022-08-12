import React from "react";
import "./bootstrap.min.css";
import "./App.css"
function SearchBox(props){
    return(
        <div className="col col-sm-4">
           <input type="text" 
           onChange={(event)=>props.setSearchValue(event.target.value)}
           placeholder="Search the movie"
           className="form-control"
           />
        </div>
    );
}

export default SearchBox;