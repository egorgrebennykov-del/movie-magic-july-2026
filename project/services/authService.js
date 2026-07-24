export async function register(userData){
    console.log(`Email: ${userData.email}, Password: ${userData.password}, Repeat Password: ${userData.repeatPassword}`)
}

const authService = {
    register,
};

export default authService;