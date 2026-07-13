import { Router } from "express";
import { movieService } from "../services/movieService.js";

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

export default movieController;