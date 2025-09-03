const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
app.use(cors());

app.get('/api/movie', async (req, res) => {
    const movieTitle = req.query.title;
    const apiKey = process.env.OMDB_API_KEY;
    
    const safeMovieTitle = encodeURIComponent(movieTitle);
    const baseUrl = `https://www.omdbapi.com/?s=${safeMovieTitle}&apikey=${apiKey}`;

    try {
        const firstPageResponse = await axios.get(baseUrl);
        const initialData = firstPageResponse.data;

        if (initialData.Response === 'False') {
            return res.json(initialData);
        }

        let allMovies = initialData.Search;
        const totalResults = parseInt(initialData.totalResults, 10);
        
        const totalPages = Math.ceil(totalResults / 10);
        const pagesToFetch = Math.min(totalPages, 3);

        if (pagesToFetch > 1) {
            const pagePromises = [];
            for (let page = 2; page <= pagesToFetch; page++) {
                pagePromises.push(axios.get(`${baseUrl}&page=${page}`));
            }

            const additionalResponses = await Promise.all(pagePromises);

            additionalResponses.forEach(response => {
                if (response.data.Search) {
                    allMovies = allMovies.concat(response.data.Search);
                }
            });
        }
        
        res.json({
            Search: allMovies,
            totalResults: initialData.totalResults,
            Response: 'True',
        });

    } catch (error) {
        console.error('Error fetching data from OMDB:', error);
        res.status(500).send('Error fetching data');
    }
});

module.exports = app;