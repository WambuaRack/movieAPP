import React, { useEffect, useState } from "react";
import './MovieList.css'; // Import the external CSS file

const MovieList = () => {
  const [movies, setMovies] = useState([]); // Store movie data
  const [loading, setLoading] = useState(true); // To track loading state
  const [error, setError] = useState(null); // To track errors
  const [searchTerm, setSearchTerm] = useState(""); // To store user input (search term)

  // Fetch default movies (e.g., a popular movie list) when the component mounts
  useEffect(() => {
    // Fetch popular movies (this is just an example, you can adjust as needed)
    fetch(`http://www.omdbapi.com/?s=batman&apikey=263d22d8`)
      .then((response) => response.json()) // Parse the response as JSON
      .then((data) => {
        if (data.Response === "True") {
          setMovies(data.Search); // Set default movies
        } else {
          setError("No default movies found");
        }
        setLoading(false); // Set loading to false once data is fetched
      })
      .catch((error) => {
        setError("Error fetching data");
        setLoading(false);
      });
  }, []); // Empty dependency array means this runs once when the component mounts

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value); // Update search term state
  };

  const handleSearchClick = () => {
    if (!searchTerm) return; // If there's no search term, do nothing

    setLoading(true); // Start loading
    setError(null); // Clear any previous errors
    fetch(`http://www.omdbapi.com/?s=${searchTerm}&apikey=263d22d8`)
      .then((response) => response.json()) // Parse the response as JSON
      .then((data) => {
        if (data.Response === "True") {
          setMovies(data.Search); // Set the fetched movie data
        } else {
          setError("No movies found for this search term");
        }
        setLoading(false); // Set loading to false when data is fetched
      })
      .catch((error) => {
        setError("Error fetching data");
        setLoading(false);
      });
  };

  return (
    <div className="container">
      <h1>Search Movies</h1>

      {/* Search Input and Button */}
      <div className="searchBox">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Enter movie name"
        />
        <button onClick={handleSearchClick}>Search</button>
      </div>

      {/* Loading state */}
      {loading && <div className="loading">Loading...</div>}

      {/* Error state */}
      {error && <div className="error">{error}</div>}

      {/* Movie results */}
      <div className="movieList">
        {movies &&
          movies.map((movie) => (
            <div key={movie.imdbID} className="movieCard">
              <img
                src={movie.Poster}
                alt={movie.Title}
                className="moviePoster"
              />
              <h2 className="movieTitle">{movie.Title}</h2>
              <p className="movieYear">Year: {movie.Year}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default MovieList;
