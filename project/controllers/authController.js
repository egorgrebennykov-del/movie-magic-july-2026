import { Router } from 'express'

const authController = Router();

authController.get('/registration', (req, res) => {
    res.send('Register Page');
});

export default authController;