import userRepository from "../repositories/userRepository.js";

export async function register(userData){
    return await userRepository.create(userData);
}

const authService = {
    register,
};

export default authService;