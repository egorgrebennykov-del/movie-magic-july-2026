import artistRepository from "../repositories/artistRepository.js";

export function create(artistData)
{
    return artistRepository.create(artistData);
}

export function getAll(filter = {})
{
    return artistRepository.getAll(filter);
}

export const artistService = {
    create,
    getAll,
};