import fs from 'fs/promises';
import {v4 as uuid} from 'uuid';

async function readDb(collection)
{
    const content = await fs.readFile('./db.json', {encoding: 'utf-8'});
    const db = JSON.parse(content);

    if(collection && !db.hasOwnProperty(collection))
    {
        throw new Error('No collection');
    }

    return collection ? db[collection] : db;
}

async function writeDb(db)
{
    const content = JSON.stringify(db, null, 2);
    await fs.writeFile(new URL('../db.json', import.meta.url), content, { encoding: 'utf-8'});
}

export async function getAll()
{
    const movies = await readDb('movies');
    return movies;
}

async function getById(movieId)
{
    const movies = await readDb('movies');

    const movie = movies.find(m => m.id === movieId);

    if(!movie)
    {
        throw new Error('No Movie Found');
    }

    return movie;
}

async function create(movieData)
{
    movieData.id = uuid();
    const db = await readDb();

    db.movies.push(movieData);

    await writeDb(db);
}

const movieRepository = {
    getAll,
    getById,
    create
};

export default movieRepository;