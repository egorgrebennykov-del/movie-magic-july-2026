import artistRepository from "../repositories/artistRepository.js";

export function create(artistData)
{
    return artistRepository.create(artistData);
}

export function getAll()
{
    return artistRepository.getAll();
}

export const artistService = {
    create,
    getAll,
};