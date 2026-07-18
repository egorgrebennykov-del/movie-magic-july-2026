import { Router } from "express";

const artistsController = Router();

artistsController.get('/create', (req, res) => {
    res.render('artists/create');
});

export default artistsController;