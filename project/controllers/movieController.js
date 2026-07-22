import { Router } from "express";
import { movieService } from "../services/movieService.js";
import { artistService } from '../services/artistService.js';

const movieController = Router();

movieController.get('/create', (req, res) => {
    res.render('movies/create', { pageTitle: 'Create' });
});

movieController.post('/create', async (req, res) => {
    const newMovie = req.body;

    await movieService.create(newMovie);

    res.redirect('/');
});

movieController.get('/search', async (req, res) => {
    const filter = req.query;

    const movies = await movieService.getAllMovies(filter);
    res.render('movies/search', { movies, filter, pageTitle: 'Search' });
});

movieController.get('/:movieId', async (req, res) => {
    const movieId = req.params.movieId;
    const movie = await movieService.getById(movieId);

    res.render('movies/details', { movie, pageTitle: 'Details' });
});

movieController.get('/:movieId/attach', async (req, res) => {
    const movieId = req.params.movieId;
    const movie = await movieService.getById(movieId);

    const artists = await artistService.getAll({ exclude: movie.cast.map(artist => artist.id) });

    res.render('movies/attach', { movie, artists, pageTitle: 'Attach Movie' });
});

movieController.post('/:movieId/attach', async (req, res) => {
    const movieId = req.params.movieId;
    const artistId = req.body.artist;

    if (!artistId) {
        return res.redirect(`/movies/${movieId}/attach`);
    }

    await movieService.attachArtist(movieId, artistId);

    res.redirect(`/movies/${movieId}`);
});

export default movieController;