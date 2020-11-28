import React from 'react';
import axios from 'axios';
import MovieCard from './components/MovieCard/MovieCard';
import { Container, Row, Col, Button, Dropdown, DropdownButton } from 'react-bootstrap';
import './App.css';

let movies210 = []
   


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: []
    }
  }



  //--------------------------- API call & Set the State to the incoming movies results -----------------------//
  handleSubmit = async () => {

    let myarray = []
    let movieIndex = 1

    //----API call from page 1 to 11 ----// 
    for (let i = 1; i < 12; i++) {

      let url = `http://api.themoviedb.org/3/movie/top_rated?api_key=bfc0457756fa66d19984d27258047997&language=en-US&page=${i}`

      const response = await axios.get(url)

      const cleanArray = response.data.results

      //----push arriving data to myarray -----//
      cleanArray.forEach(element => {

        element.imdbIndex = movieIndex
        movieIndex++
        myarray.push(element)
      });

    }

    //----cut myarray to 210 movies-----//

    movies210 = myarray.slice(0, 211);
    this.setState({ movies: movies210 })

    //----console -----//

    console.log('myarray', myarray)
    console.log('myarray length', myarray.length)
    console.log('state movies length', this.state.movies)
  }

 
       //----function that sort objects by Ascending numbers (movie Index) -----//
       sortbyRankTop(inputArray) {
      
     console.log('inputarray', this.inputArray)

     return inputArray.sort((a, b) =>{
      this.setState({ movies210 })
       return b.imdbIndex + a.imdbIndex})
     
      }

        //----function that sort objects by Descending numbers (movie Index) -----//
        sortbyRankLow(inputArray) {
      
          return inputArray.sort((a, b) =>{
           this.setState({ movies210 })
            return b.imdbIndex - a.imdbIndex})
          
           }

     //----function that sort objects Alphabetically (by movie title) -----//
     sortAlphabeticallyUp(inputArray) {
     
      return inputArray.sort((a, b) => {
        this.setState({ movies210 })
        if (a.original_title > b.original_title) {
          return 1
        } else {
          return -1
        }
        })
    }  

 //----function that sort objects Descending Alphabetically (by movie title) -----//
 sortAlphabeticallyDown(inputArray) {
     
  return inputArray.sort((a, b) => {
    this.setState({ movies210 })
    if (a.original_title < b.original_title) {
      return 1
    } else {
      return -1
    }
    })
} 


  render() {

       return (
      <div className="App">


        {/* BUTTON & DROPDOWNS */}

        <Button variant="outline-info" onClick={this.handleSubmit} >Show movies</Button>

        <DropdownButton id="dropdown-basic-button" title="Filter Movie By">
          <Dropdown.Item onClick={() =>{this.sortbyRankTop(movies210)}}>Top to Low Rank</Dropdown.Item>
          <Dropdown.Item onClick={() =>{this.sortbyRankLow(movies210)}}>Low to Top Rank</Dropdown.Item>
          <Dropdown.Item  onClick={() => {this.sortAlphabeticallyUp(movies210)}}>Title Ascending</Dropdown.Item>
          <Dropdown.Item  onClick={() => {this.sortAlphabeticallyDown(movies210)}}>Title Descending</Dropdown.Item>

        </DropdownButton>

        {/* MOVIE CARD */}
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
