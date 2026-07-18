import { Router } from "express";

import homeController from "./controllers/homeController.js";
import movieController from "./controllers/movieController.js";
import artistsController from'./controllers/artistController.js';

const routes = Router();

routes.use('/', homeController);
routes.use('/movies', movieController);
routes.use('/artists', artistsController);

routes.get('/*splat', (req, res) => {
    res.render('404');
});

export default routes;