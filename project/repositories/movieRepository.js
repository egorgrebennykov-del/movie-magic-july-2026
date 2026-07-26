import fs from 'fs/promises';
import prisma from '../lib/prisma.js';

export async function getAll(filter = {}) {
    const movies = await prisma.movie.findMany({
        where: {
            year: filter.year || undefined,
            genre: {
                equals: filter.genre || undefined,
                mode: 'insensitive',
            },
            title: {
                contains: filter.search || undefined,
                mode: 'insensitive',
            },
        }
    });

    return movies;
}

export async function getById(movieId) {
    const movie = await prisma.movie.findUnique({
        where: { id: movieId },
        include: { cast: true }
    });

    if (!movie) {
        throw new Error('No movie found!');
    }

    return movie;
}

export async function create(movieData) {
    const movie = await prisma.movie.create({
        data: movieData,
    });

    return movie;
}

export async function attachArtist(movieId, artistId)
{
    const result = await prisma.movie.update({
        where: {id: movieId},
        data: {
            cast:{
                connect: {id: artistId}
            }
        }
    });

    return result;
}

export async function remove(movieId, userId)
{
    const result = await prisma.movie.delete({
        where: { id: movieId, userId: userId}
    });

    return result;
}

export async function edit(movieId, userId, movieData)
{
    const result = await prisma.movie.update({
        where: { id: movieId, userId: userId },
        data: movieData
    });

    return result;
}

const movieRepository = {
    getAll,
    getById,
    create,
    attachArtist,
    remove,
    edit,
};

export default movieRepository;