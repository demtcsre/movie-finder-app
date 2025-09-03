import { useEffect, useState } from "react";
import "./App.css";

import { NavBar } from "./components/NavBar";
import { Main } from "./components/Main";
import { BoxMovies } from "./components/BoxMovies";
import { MovieList } from "./components/MovieList";
import { Loader } from "./components/Loader";
import { ErrorMessage } from "./components/ErrorMessage";

export default function App() {
    const [movies, setMovies] = useState([]);
    const [query, setQuery] = useState("");
    const [selectedMovieId, setSelectedMovieId] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    function handleSelectMovieId(id) {
        setSelectedMovieId((selectedId) => (selectedId === id ? null : id));
    }

    useEffect(() => {
        const controller = new AbortController();

        async function fetchMovies() {
            try {
                setIsLoading(true);
                setError("");

                const res = await fetch(`/api/movie?title=${query}`, {
                    signal: controller.signal,
                });

                if (!res.ok) {
                    throw new Error("Something went wrong with fetching movies");
                }
                const data = await res.json();
                if (data.Response === "False") {
                    throw new Error("Movie not found");
                }
                setMovies(data.Search);
                setError("");
            } catch (err) {
                if (err.name !== "AbortError") {
                    setError(err.message);
                }
            } finally {
                setIsLoading(false);
            }
        }

        if (query.length < 3) {
            setMovies([]);
            setError("");
            return;
        }

        const timer = setTimeout(() => {
            fetchMovies();
        }, 500);

        return function () {
            clearTimeout(timer);
            controller.abort();
        };
    }, [query]);

    return (
        <>
            <NavBar movies={movies} query={query} setQuery={setQuery} />
            <Main>
                <BoxMovies>
                    {isLoading && <Loader />}
                    {!isLoading && !error && (
                        <MovieList movies={movies} onSelectMovieId={handleSelectMovieId} />
                    )}
                    {error && <ErrorMessage message={error} />}
                </BoxMovies>
            </Main>
        </>
    );
}