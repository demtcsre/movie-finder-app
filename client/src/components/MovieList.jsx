import React from 'react';

function MovieItem({ movie, onSelectMovieId }) {
    return (
        <li onClick={() => onSelectMovieId(movie.imdbID)}>
            <img src={movie.Poster} alt={`${movie.Title} poster`} />
            <h3>{movie.Title}</h3>
            <h4><span><a href={`https://www.imdb.com/title/${item._id}`}>IMDb Review</a></span></h4>
            <div>
                <p>
                    <span>📅</span>
                    <span>{movie.Year}</span>
                </p>
            </div>
        </li>
    );
}

export function MovieList({ movies, onSelectMovieId }) {
    return (
        <ul className="list list-movies">
            {movies?.map((movie) => (
                <MovieItem
                    key={movie.imdbID}
                    movie={movie}
                    onSelectMovieId={onSelectMovieId}
                />
            ))}
        </ul>
    );
}