import prisma from "../lib/prisma.js";

export async function create(artistData)
{
    const artist = await prisma.artist.create({
        data: artistData,
    });

    return artist;
}

export async function getAll()
{
    const artists = await prisma.artist.findMany();
    return artists;
}

const artistRepository = {
    create,
    getAll,
};

export default artistRepository;