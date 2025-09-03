import React from 'react';

function MovieItem({ movie, onSelectMovieId }) {
    return (
        <li onClick={() => onSelectMovieId(movie.imdbID)}>
            <img src={movie.Poster} alt={`${movie.Title} poster`} />
			<h3>{movie.Title} ({movie.Type})</h3>
            <h4><a href={`https://www.imdb.com/title/${movie.imdbID}`} target="_blank">IMDb Review</a></h4>
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