import movieRepository from "../repositories/movieRepository.js";

async function getAllMovies(filter = {})
{
    return await movieRepository.getAll(filter);
}

function getById(movieId)
{
    movieId = Number(movieId);
    return movieRepository.getById(movieId);
}

function create(movieData)
{
    movieData.rating = Number(movieData.rating);
    movieData.year = Number(movieData.year);
    return movieRepository.create(movieData);
}

export const movieService = {
    getAllMovies,
    getById,
    create
};