import { Router } from "express";
import { getAll } from "../repositories/movieRepository.js";

const homeController = Router();

homeController.get('/', async (req, res) => {
    const movies = await getAll();
    res.render('home', { movies, pageTitle: 'Home' });
});

homeController.get('/about', (req, res) => {
  res.render('about', { pageTitle: 'About' });
});

export default homeController;