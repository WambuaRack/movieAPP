import React,{useState} from 'react'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import MovieList from './components/MovieList';
const App =()=>
{
  const [movies, setMovies]= useState([ ]);
  return<div><MovieList/></div>
}
export default App