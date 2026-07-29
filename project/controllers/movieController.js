import * as z from 'zod';
import { Router } from "express";
import { movieService } from "../services/movieService.js";
import { artistService } from '../services/artistService.js';
import { isAuth } from "../middlewares/authMiddleware.js";
import { createMovieSchema } from "../schemas/movieSchema.js";
import { getErrorMessage } from "../utils/errorUtils.js";

const movieController = Router();

movieController.get('/create', isAuth, (req, res) => {
    const categoryOptions = prepareCategoryViewData({ category: '' });
    res.render('movies/create', { pageTitle: 'Create', categoryOptions });
});

movieController.post('/create', isAuth, async (req, res) => {
    const newMovie = req.body;
    const userId = req.user.id;

    try {
        const movieData = createMovieSchema.parse(newMovie);

        await movieService.create(movieData, userId);

        res.redirect('/');
    } catch (error) {
        if (error instanceof z.ZodError) {
            const errors = z.flattenError(error).fieldErrors;
            const categoryOptions = prepareCategoryViewData(newMovie);

            return res.status(400).render('movies/create', {
                movie: req.body,
                errors,
                categoryOptions,
                pageTitle: 'Create'
            });
        }

        const message = getErrorMessage(error);
        return res.status(500).send(message);
    }
});

movieController.get('/search', async (req, res) => {
    const filter = req.query;

    const movies = await movieService.getAllMovies(filter);
    res.render('movies/search', { movies, filter, pageTitle: 'Search' });
});

movieController.get('/:movieId', async (req, res) => {
    const movieId = req.params.movieId;
    const userId = req?.user?.id;

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

function prepareCategoryViewData(movie) {
    const categories = ['TV Show', 'Animation', 'Movie', 'Documentary', 'Short Film'];

    const categoryOptions = categories.map(category => {
        const value = category.toLowerCase().replaceAll(' ', '-');

        const option = {
            value,
            label: category,
            selected: movie.category === value
        };

        return option;
    });

    return categoryOptions;
}

movieController.get('/:movieId/edit', isAuth, async (req, res) => {
    const movieId = Number(req.params.movieId);
    const userId = req.user.id;

    const movie = await movieService.getById(movieId);

    if(userId !== movie.userId)
    {
        return res.status(404).send('Unauthorized');
    }

    const categoryOptions = prepareCategoryViewData(movie);

    res.render('movies/edit', { movie, categoryOptions, pageTitle: 'Edit' });
});

movieController.post('/:movieId/edit', isAuth, async (req, res) => {
    const movieId = Number(req.params.movieId);
    const userId = req.user.id;

    const movieData = req.body;

    try {
        const moviePayload = createMovieSchema.parse(movieData);

        await movieService.edit(movieId, userId, moviePayload);

        res.redirect(`/movies/${movieId}`);
    } catch (error) {
        if (error instanceof z.ZodError) {
            const errors = z.flattenError(error).fieldErrors;
            const categoryOptions = prepareCategoryViewData(movieData);

            return res.status(400).render('movies/edit', {
                movie: movieData,
                errors,
                categoryOptions,
                pageTitle: 'Edit'
            });
        }

        throw error;
    }
});

export default movieController;