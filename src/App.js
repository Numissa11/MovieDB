import React from 'react';
import axios from 'axios';
import MovieCard from './components/MovieCard/MovieCard';
import { Container, Row, Col, Button, } from 'react-bootstrap';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: []
    }
  }
 

  //--------------- API call  ---------------
  handleSubmit = () => {

    let page_num = [0]
    for (let pas = 0; pas < 9; pas++) {
      page_num += 1;
   

    let url = `http://api.themoviedb.org/3/movie/top_rated?api_key=bfc0457756fa66d19984d27258047997&language=en-US/page=${page_num}`

    axios.get(url)
      .then(response => this.setState({ movies: response.data.results }))
      .then(console.log(this.state))
  }
}


  render() {

    return (
      <div className="App">

        <Button variant="outline-info" onClick={this.handleSubmit} >Show movies</Button>

        <Container className="card-template">
          <Row>

            {this.state.movies.map(movie => (
            
              <Col sm={6} lg={4}>
                <MovieCard
                  {...movie}
                  key={movie.id}
                />
              </Col>
             
            ))}
          </Row>
        </Container>

      
      </div>
    );
  }


}

export default App;
