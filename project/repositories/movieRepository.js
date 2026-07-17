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
    let movies = await readDb('movies');

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
    const movies = await readDb('movies');
    const movie = movies.find(m => m.id === movieId);

    if (!movie) {
        throw new Error('No Movie Found');
    }

    return movie;
}

async function create(movieData) {
    if (prisma?.movie?.create) {
        try {
            return await prisma.movie.create({
                data: movieData,
            });
        } catch (error) {
            console.warn('Prisma create failed, falling back to db.json:', error.message);
        }
    }

    const db = await readDb();
    const movies = Array.isArray(db.movies) ? db.movies : [];

    const createdMovie = {
        id: `${Date.now()}`,
        ...movieData,
    };

    db.movies = [...movies, createdMovie];
    await writeDb(db);

    return createdMovie;
}

const movieRepository = {
    getAll,
    getById,
    create
};

export default movieRepository;