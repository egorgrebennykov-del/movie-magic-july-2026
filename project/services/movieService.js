import movieRepository from "../repositories/movieRepository.js";

async function getAllMovies(filter = {})
{
    return await movieRepository.getAll(filter);
}

function getById(movieId)
{
    const id = Number(movieId);
    return movieRepository.getById(id);
}

async function create(movieData, userId)
{
    movieData.rating = Number(movieData.rating);
    movieData.year = Number(movieData.year);
    movieData.userId = userId;

    return await movieRepository.create(movieData);
}

async function attachArtist(movieid, artistId)
{
    movieid = Number(movieid);
    artistId = Number(artistId);

    const result = await movieRepository.attachArtist(movieid, artistId);

    return result;
}

export async function remove(movieId, userId)
{
    movieId = Number(movieId);
    
    const movie = await movieRepository.getById(movieId);

    if(!movie)
    {
        throw new Error('Movie Not Found!');
    }

    if(userId !== movie.userId)
    {
        throw new Error('Unauthorized!');
    }

    await movieRepository.remove(movieId, userId);
}

export const movieService = {
    getAllMovies,
    getById,
    create,
    attachArtist,
    remove,
};