import fs from 'fs/promises';

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

export async function getAll()
{
    const movies = await readDb('movies');
    console.log(movies);
    return movies;
}

const movieRepository = {
    getAll
};

export default movieRepository;