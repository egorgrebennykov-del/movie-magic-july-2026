import { Router } from "express";
import { movieService } from "../services/movieService.js";
import { artistService } from '../services/artistService.js';
import { isAuth } from "../middlewares/authMiddleware.js";

const movieController = Router();

movieController.get('/create', isAuth, (req, res) => {
    res.render('movies/create', { pageTitle: 'Create' });
});

movieController.post('/create', isAuth, async (req, res) => {
    const newMovie = req.body;
    const userId = req.user.id;

    await movieService.create(newMovie, userId);

    res.redirect('/');
});

movieController.get('/search', async (req, res) => {
    const filter = req.query;

    const movies = await movieService.getAllMovies(filter);
    res.render('movies/search', { movies, filter, pageTitle: 'Search' });
});

movieController.get('/:movieId', async (req, res) => {
    const movieId = req.params.movieId;
    const userId = req?.user.id;
    
    if (!movieId || isNaN(Number(movieId)) || Number(movieId) <= 0) {
        return res.status(404).render('404');
    }

    const movie = await movieService.getById(movieId);

    const isOwner = movie.userId && movie.userId === userId;

    res.render('movies/details', { movie, isOwner, pageTitle: 'Details' });
});

movieController.get('/:movieId/attach', isAuth, async (req, res) => {
    const movieId = req.params.movieId;
    const movie = await movieService.getById(movieId);

    const artists = await artistService.getAll({ exclude: movie.cast.map(artist => artist.id) });

    res.render('movies/attach', { movie, artists, pageTitle: 'Attach Movie' });
});

movieController.post('/:movieId/attach', isAuth, async (req, res) => {
    const movieId = req.params.movieId;
    const artistId = req.body.artist;

    if (!artistId) {
        return res.redirect(`/movies/${movieId}/attach`);
    }

    await movieService.attachArtist(movieId, artistId);

    res.redirect(`/movies/${movieId}`);
});

movieController.get('/:movieId/delete', isAuth, async (req, res) => {
    const movieId = Number(req.params.movieId)
    const userId = req.user.id;

    await movieService.remove(movieId, userId);

    res.redirect('/');
});

export default movieController;