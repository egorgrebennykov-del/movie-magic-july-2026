import artistRepository from "../repositories/artistRepository.js";

export function create(artistData)
{
    return artistRepository.create(artistData);
}

const artistService = {
    create,
};

export default artistService;