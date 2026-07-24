export async function create(userData)
{
    console.log(`Create: ${userData}`);
}

const userRepository = {
    create,
}

export default userRepository;