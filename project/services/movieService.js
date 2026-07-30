import movieRepository from "../repositories/movieRepository.js";

export async function getAllMovies(filter = {})
{
    return await movieRepository.getAll(filter);
}

export async function getById(movieId)
{
    const id = Number(movieId);
    return await movieRepository.getById(id);
}

export async function create(movieData, userId)
{
    movieData.userId = userId;

    return await movieRepository.create(movieData);
}

export async function attachArtist(movieid, artistId, character)
{
    movieid = Number(movieid);
    artistId = Number(artistId);

    const result = await movieRepository.attachArtist(movieid, artistId, character);

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

export async function edit(movieId, userId, movieData)
{
    movieData.rating = Number(movieData.rating);
    movieData.year = Number(movieData.year);
    movieData.userId = userId;

    const result = await movieRepository.edit(movieId, userId, movieData);

    return result;
}

export const movieService = {
    getAllMovies,
    getById,
    create,
    attachArtist,
    remove,
    edit,
};