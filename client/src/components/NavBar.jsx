import React from 'react';

function Logo() {
    return (
        <div className="logo">
            <span role="img">🎬</span>
            <h1>Movie</h1>
        </div>
    );
}

function Search({ query, setQuery }) {
    return (
        <input
            type="text"
            className="search"
            placeholder="Search movies by title"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
        />
    );
}

function NumResults({ movies }) {
    return (
        <p className="num-results">
            Found <strong>{movies?.length || 0}</strong> results
        </p>
    );
}

export function NavBar({ movies, query, setQuery }) {
    return (
        <nav className="nav-bar">
            <Logo />
            <Search query={query} setQuery={setQuery} />
            <NumResults movies={movies} />
        </nav>
    );
}