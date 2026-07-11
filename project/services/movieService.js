import movieRepository from "../repositories/movieRepository.js";

async function getAllMovies()
{
    return movieRepository.getAllMovies;
}

const movieService = {
    getAllMovies
};