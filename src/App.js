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
      isPage: false
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


    //----console -----//

    console.log('myarray', myarray)
    console.log('myarray length', myarray.length)
    console.log('state movies length', this.state.movies)
  }


  //----function that sort objects by Ascending numbers (movie Index) -----//
  sortbyRankTop(inputArray) {
  
    return inputArray.sort((a, b) => {
      this.setState({ movies210 })
      return a.imdbIndex - b.imdbIndex
    })

  }

  //----function that sort objects by Descending numbers (movie Index) -----//
  sortbyRankLow(inputArray) {

    return inputArray.sort((a, b) => {
      this.setState({ movies210 })
      return b.imdbIndex - a.imdbIndex
    })

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

  //-------- function that change the State with the value typed in the input ---------//

  handleChange = (event) => {
    this.setState({ searchInputValue: event.target.value })
  }

  //-------- function that filter the movie with the value typed in the input---------//

  handleSubmit2 = () => {
    let searchInputValue = this.state.searchInputValue.toLowerCase();

    const filteredMovies = movies210.filter(function (item) {
      console.log('item.original_title', item.original_title)
      console.log('item.original_title.indexOf(searchInputValue) > - 1', item.original_title.indexOf(searchInputValue) > - 1)
      return item.original_title.toLowerCase().indexOf(searchInputValue) > - 1;

    })
    console.log('searchInputValue', searchInputValue)
    console.log('filtered movies', filteredMovies)
    this.setState({ movies: filteredMovies })
  }


  paginationNext = (array, page_size, page_number) => {
    let page = this.state.page;
    page++
    const paginated = array.slice((page_number - 1) * page_size, page_number * page_size);
    console.log('page +1', page)

    this.setState({ movies: paginated, page: page })
  }


  paginationBack = (array, page_size, page_number) => {
    let page = this.state.page;

    if (page <= 0) { return }
    const paginated = array.slice((page_number - 1) * page_size, page_number * page_size);
    console.log('page -1', page)
    page = page - 1;
    this.setState({ movies: paginated, page: page, isPage: true })

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

                <Button className='mb-5' variant="light" onClick={() => { this.paginationBack(movies210, perPage, page) }}> back </Button>
                <Button className='mb-5' variant="light" onClick={() => { this.paginationNext(movies210, perPage, page) }}> next </Button>

                <p className='Welcome'> Page {page - 1}</p>


              </div>
            </div>

            :
            <div className='welcome-container'>
              <img className="welcome-img" src={TomJerry} alt="tom and jerry logo" />
              <div>
                <div className='Welcome'>Szia! Üdvözölek a legjobb filmet oldalàn.</div>
                <div className='Welcome'> Ha szeretnéd tudni melyikek a legjobb 210 filmek az egész univerzumba, katincs ide</div>
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
