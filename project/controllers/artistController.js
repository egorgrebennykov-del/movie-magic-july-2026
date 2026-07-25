import { Router } from "express";
import { artistService }  from "../services/artistService.js";
import { isAuth } from "../middlewares/authMiddleware.js";

const artistsController = Router();

artistsController.get('/create', isAuth, (req, res) => {
    res.render('artists/create');
});

artistsController.post('/create', isAuth, async (req, res) => {
    const artistData = req.body;
    artistData.age = Number(artistData.age);

    await artistService.create(artistData);

    res.redirect('/');
});

export default artistsController;