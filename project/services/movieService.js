import movieRepository from "../repositories/movieRepository.js";

async function getAllMovies()
{
    return movieRepository.getAllMovies;
}

function getById(movieId)
{
    return movieRepository.getById(movieId);
}

function create(movieData)
{
    return movieRepository.create(movieData);
}

export const movieService = {
    getAllMovies,
    getById,
    create
};