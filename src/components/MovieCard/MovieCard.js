import React from 'react';
import { Modal } from 'react-bootstrap';


class MovieCard extends React.Component {
      constructor(props) {
            super(props);
            this.state = {
                  isSignedIn: false,
                  show: false
            }
      }

      // MODAL OPEN FUNCTION
      handleShow = () => {

            this.setState({
                  show: true
            })
      }
      // MODAL CLOSE FUNCTION
      handleClose = () => {
            this.setState({
                  show: false
            })
      }

      render() {
            let poster = `https://image.tmdb.org/t/p/w300/${this.props.poster_path}`;
            return (
                  <div class="row">

                        {/* MOVIE CARD */}

                        <a href="#" onClick={this.handleShow} className="card text-center m-4">
                              <div className="mt-2">
                                    <h3 className="text-white bg-dark card-title text-center">{this.props.original_title}</h3>
                                    <img src={poster} alt={this.props.poster_path} />
                                    <h4 className='bg-info my-2'> Top Rank: {this.props.imdbIndex} </h4>
                                    <p>Length: {this.props.genre_ids.length}</p>
                                    <p>Vote average: {this.props.vote_average}</p>
                                     <p>Total vote: {this.props.vote_count}</p>
           
                              </div>
                        </a>


                        {/* MODAL : MOVIE DETAILS */}

                        <Modal className='text-center' show={this.state.show} onHide={this.handleClose}>
                              <Modal.Header closeButton>
                                    <Modal.Title className='text-center' > {this.props.original_title} </Modal.Title>
                              </Modal.Header>
                              <Modal.Body>
                              <img src={poster} alt={this.props.poster_path} />
                              <p className='bg-secondary rounded text-light'>Title: {this.props.original_title}</p>
                              <p>Release Date: {this.props.release_date}</p>
                              <p>Language: {this.props.original_language}</p>
                              <p>Length: {this.props.genre_ids.length}</p>
                              <p>Id: {this.props.id}</p>
                              <p>Vote average: {this.props.vote_average}</p>
                              <p>Total vote: {this.props.vote_count}</p>
                              <p className='font-italic mt-2 bg-light rounded'>Summary: {this.props.overview}</p>

                              </Modal.Body>
                        </Modal>

                  </div>
            )
      }
}

export default MovieCard;