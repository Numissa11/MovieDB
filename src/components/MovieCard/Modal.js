import React from 'react';
import Card from 'react-bootstrap/Card';

function MovieCardRecto(props) {
      console.log('props', props)
      let poster = `https://image.tmdb.org/t/p/w300/${props.poster_path}`;
      return (
            <div class="row">
             
                  <div className="card text-center m-4">
                        <div className="mt-2">
                              <h3 className="text-white bg-dark card-title text-center">{props.original_title}</h3>
                              <img src={poster} alt={props.poster_path} />

                              <h4 className='bg-light my-2'> Fuuuuck: </h4>

                              <p>Length: {props.genre_ids.length}</p>
                              <p>Vote average: {props.vote_average}</p>
                              <p>Total vote: {props.vote_count}</p>
                        </div>
                  </div>
                 
            </div>
      )
}

export default MovieCardRecto;