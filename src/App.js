import React from 'react';
import axios from 'axios';
import MovieCard from './components/MovieCard/MovieCard';
import SearchBar from './components/SearchBar/SearchBar';
import { Container, Row, Col, Button, Dropdown, DropdownButton } from 'react-bootstrap';
import TomJerry from '../src/assets/tomjerry.jpg';
import './App.css';

let movies210 = []

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      isDisplayed: false,
      searchInputValue: '',
      page: 1,
      perPage: 50,
      maxPage: 5
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

    movies210 = myarray.slice(0, 210);

    this.setState({ movies: movies210, isDisplayed: true })

  }




  //----function that sort objects by Ascending numbers (movie Index) -----//
  sortbyRankTop(inputArray) {
    const sortedMovies = inputArray.sort((a, b) => {
      return a.imdbIndex - b.imdbIndex
    })
    this.setState({ movies: sortedMovies })
  }

  //----function that sort objects by Descending numbers (movie Index) -----//
  sortbyRankLow(inputArray) {

    const sortedMovies = inputArray.sort((a, b) => {
      return b.imdbIndex - a.imdbIndex
    })

    this.setState({ movies: sortedMovies })
  }

  //----function that sort objects Alphabetically (by movie title) -----//
  sortAlphabeticallyUp(inputArray) {

    const sortedMovies = inputArray.sort((a, b) => {
      if (a.original_title > b.original_title) {
        return 1
      } else {
        return -1
      }
    })
    this.setState({ movies: sortedMovies })
  }

  //----function that sort objects Descending Alphabetically (by movie title) -----//
  sortAlphabeticallyDown(inputArray) {

    const sortedMovies = inputArray.sort((a, b) => {
      if (a.original_title < b.original_title) {
        return 1
      } else {
        return -1
      }
    })

    this.setState({ movies: sortedMovies })
  }

  //-------- function that change the State with the value typed in the input ---------//

  handleChange = (event) => {
    this.setState({ searchInputValue: event.target.value })
  }

  //-------- function that filter the movie with the value typed in the input---------//

  handleSubmit2 = () => {
    let searchInputValue = this.state.searchInputValue.toLowerCase();

    const filteredMovies = movies210.filter(function (item) {
      return item.original_title.toLowerCase().indexOf(searchInputValue) > - 1;
    })
   
    this.setState({ movies: filteredMovies })
  }

  //----function that select x movies in the array and display it by page (next)-----//

  paginationNext = (array, page_size, page_number) => {
   
    let page = page_number;

    if (page >= this.state.maxPage) { return }

    if (!(this.state.movies.length === 210)) {
      page++
    }

    const paginated = array.slice((page - 1) * page_size, page * page_size);

    this.setState({ movies: paginated, page })
  }


  //----function that select x movies in the array and display it by page (back)-----//

  paginationBack = (array, page_size, page_number) => {

    let page = page_number;
    if (page === 1) {
      this.setState({ movies: movies210 })
      return
    }
    page = page - 1;
    if (page < 1) { return }
    const paginated = array.slice((page - 1) * page_size, page * page_size);
    this.setState({ movies: paginated, page })
  }


  render() {
    let { perPage, page } = this.state;
    return (
      <div className="App">

        {/* BUTTON & DROPDOWNS */}
        <div className='home-container'>

          {this.state.isDisplayed ?
            <div>
              <img className="welcome-img2" src='https://thumbs.dreamstime.com/b/astronaut-draw-planets-design-spaceman-galaxy-cosmonaut-universe-space-science-technology-theme-vector-illustration-149679239.jpg' alt="tom and jerry logo" />

              <div className='myDropdown'>

                <h1 className='Welcome'>WELCOME TO TOP 210 MOVIES</h1>
                <DropdownButton variant="dark" className='my-3' id="dropdown-basic-button" title="Filter Movie By">
                  <Dropdown.Item onClick={() => { this.sortbyRankTop(movies210) }}>Top to Low Rank</Dropdown.Item>
                  <Dropdown.Item onClick={() => { this.sortbyRankLow(movies210) }}>Low to Top Rank</Dropdown.Item>
                  <Dropdown.Item onClick={() => { this.sortAlphabeticallyUp(movies210) }}>Title Ascending</Dropdown.Item>
                  <Dropdown.Item onClick={() => { this.sortAlphabeticallyDown(movies210) }}>Title Descending</Dropdown.Item>
                </DropdownButton>

                <SearchBar
                  input={this.state.searchInputValue}
                  inputChangeHandler={this.handleChange}
                  inputSubmitHandler={this.handleSubmit2}
                />

                <Button className='mb-3' variant="light" onClick={() => { this.paginationBack(movies210, perPage, page) }}> back </Button>
                <Button className='mb-3' variant="light" onClick={() => { this.paginationNext(movies210, perPage, page) }}> next </Button>

                <p className='Welcome'> {this.state.movies.length === 210 ? 'All movies' : `Page ${page}`}</p>
              </div>
            </div>
            :
            <div className='welcome-container'>
              <img className="welcome-img" src={TomJerry} alt="tom and jerry logo" />
              <div>
                <div className='Welcome'>Szia! Üdvözölek a legjobb filmet oldalàn.</div>
                <div className='Welcome'> Ha szeretnéd tudni melyek a legjobb 210 filmek az egész univerzumba, katincs ide</div>
                <Button className='mb-5' variant="dark" size="lg" onClick={this.handleSubmit} >Show movies</Button>

              </div>
            </div>
          }

        </div>

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
