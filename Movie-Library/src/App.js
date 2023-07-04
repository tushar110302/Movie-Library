import { useEffect, useState } from 'react';
import './App.css';
import SearchIcon from './search.svg'
import MovieCard from './components/MovieCard';

const API_URL ='http://www.omdbapi.com?apikey=7c089c88'
function App() {
  const [movies, setMovies] = useState([]);
  const [searchParam,setSearchParam] = useState('');

  const searchMovies =  async(title)=>{
    let response = await fetch(`${API_URL}&s=${title}`)
    let data = await response.json()

    console.log(data.Search)
    setMovies(data.Search)
  }
  useEffect(() => {
    searchMovies('ho')
  },[])
  
  return (
    <div className="app">

      <h1>MOVIES</h1>

      <div className='search'>
        <input placeholder='Search with Names'
        value={searchParam}
        onChange={(e) => {setSearchParam(e.target.value)}}
        />
        <img src={SearchIcon}
          alt='search'
          onClick={() => searchMovies(searchParam)} 
        />
      </div>

      {movies?.length > 0 ? 
        ( 
            <div className='container'>
              { movies.map((movie)=> {
              return <MovieCard movie = {movie} /> }) }
            </div>
        ) 
        : 
        ( 
          <div className='empty'>
            <h2>No Movies Found</h2>
          </div> 
        ) 
      }

    </div>
  );
}

export default App;
