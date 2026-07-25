import { Router } from 'express'
import authService from '../services/authService.js';

const authController = Router();

authController.get('/register', (req, res) => {
    res.render('auth/register', { pageTitle: 'Register' });
});

authController.post('/register', async (req, res) => {
    const { email, password, repeatPassword } = req.body;

    await authService.register({email, password, repeatPassword});

    res.redirect('/');
});

authController.get('/login', (req, res) => {
    res.render('auth/login', { pageTitle: 'Login' });
})

export default authController;