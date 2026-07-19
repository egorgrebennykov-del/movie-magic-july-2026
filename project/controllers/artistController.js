import { Router } from "express";
import artistService from "../services/artistService.js";

const artistsController = Router();

artistsController.get('/create', (req, res) => {
    res.render('artists/create');
});

artistsController.post('/create', async (req, res) => {
    const artistData = req.body;
    artistData.age = Number(artistData.age);

    await artistService.create(artistData);

    res.redirect('/');
});

export default artistsController;