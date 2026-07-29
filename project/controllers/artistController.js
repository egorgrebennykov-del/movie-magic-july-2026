import * as z from 'zod';
import { Router } from "express";
import { artistService } from "../services/artistService.js";
import { isAuth } from "../middlewares/authMiddleware.js";
import { createArtistSchema } from "../schemas/artistSchema.js";

const artistsController = Router();

artistsController.get('/create', isAuth, (req, res) => {
    res.render('artists/create', { pageTitle: 'Create' });
});

artistsController.post('/create', isAuth, async (req, res) => {
    const newArtist = req.body;

    try {
        const artistData = createArtistSchema.parse(newArtist);

        await artistService.create(artistData);

        res.redirect('/');
    } catch (error) {
        if (error instanceof z.ZodError) {
            const errors = z.flattenError(error).fieldErrors;

            return res.status(400).render('artists/create', {
                artist: req.body,
                errors,
                pageTitle: 'Create'
            });
        }

        throw error;
    }
});

export default artistsController;