import React from 'react';


function SearchBar({ input, inputChangeHandler, inputSubmitHandler }) {
    return (
        <div className="mx-auto mt-4 mb-4" style={{ width: '600px' }}>
            <input
                id="input"
                placeholder="Search for a movie"
                value={input}
                onChange={inputChangeHandler}
                className='rounded'
                style={{ height: '60px', width: '400px' }}
            />
            <button className="btn btn-light searchbar-btn ml-3" onClick={inputSubmitHandler}>Search</button>
        </div>
    )
}

export default SearchBar;