import movieRepository from "../repositories/movieRepository.js";

async function getAllMovies()
{
    return movieRepository.getAllMovies;
}

function create(movieData)
{
    return movieRepository.create(movieData);
}

export const movieService = {
    getAllMovies,
    create
};