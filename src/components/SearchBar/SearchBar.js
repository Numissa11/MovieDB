import React from 'react';


function SearchBar({ input, inputChangeHandler, inputSubmitHandler }) {
    return (
        <div className="mx-auto mt-4 mb-4" style={{ width: '300px' }}>
            <input
                id="input"
                placeholder="Search for a movie"
                value={input}
                onChange={inputChangeHandler}
            />
            <button className="btn btn-info searchbar-btn" onClick={inputSubmitHandler}>Search</button>
        </div>
    )
}

export default SearchBar;