import fs from 'fs/promises';
import prisma from '../lib/prisma.js';

async function readDb(collection) {
    const content = await fs.readFile(new URL('../db.json', import.meta.url), { encoding: 'utf-8' });
    const db = JSON.parse(content);

    if (collection && !Object.prototype.hasOwnProperty.call(db, collection)) {
        throw new Error('No collection');
    }

    return collection ? db[collection] : db;
}

async function writeDb(db) {
    const content = JSON.stringify(db, null, 2);
    await fs.writeFile(new URL('../db.json', import.meta.url), content, { encoding: 'utf-8' });
}

export async function getAll(filter = {}) {
    let movies = await prisma.movie.findMany();

    if (filter.search) {
        movies = movies.filter(movie => movie.title.toLowerCase().includes(filter.search.toLowerCase()));
    }

    if (filter.year) {
        movies = movies.filter(movie => movie.year.includes(filter.year));
    }

    if (filter.genre) {
        movies = movies.filter(movie => movie.genre.toLowerCase().includes(filter.genre.toLowerCase()));
    }

    return movies;
}

async function getById(movieId) {
    const movie = await prisma.movie.findUnique({
        where: { id: movieId },
        include: { cast: true }
    });

    if (!movie) {
        throw new Error('No movie found!');
    }

    return movie;
}

async function create(movieData) {
    const movie = await prisma.movie.create({
        data: movieData,
    });

    return movie;
}

async function attachArtist(movieId, artistId)
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

const movieRepository = {
    getAll,
    getById,
    create,
    attachArtist
};

export default movieRepository;