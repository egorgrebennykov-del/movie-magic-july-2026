import * as z from 'zod';
import { Router } from 'express'
import authService from '../services/authService.js';
import { isGuest } from '../middlewares/authMiddleware.js';
import { isAuth } from '../middlewares/authMiddleware.js';
import { registerSchema } from '../schemas/userSchema.js';
import { getErrorMessage } from '../utils/errorUtils.js';

const authController = Router();

authController.get('/register', isGuest, (req, res) => {
    res.render('auth/register', { pageTitle: 'Register' });
});

authController.post('/register', isGuest, async (req, res) => {
    const newUser = req.body;

    try {
        const userData = registerSchema.parse(newUser);

        const token = await authService.register(userData);

        res.cookie('auth', token, { httpOnly: true });

        return res.redirect('/');
    } catch (error) {
        if (error instanceof z.ZodError) {
            const errors = z.flattenError(error).fieldErrors;

            return res.status(400).render('auth/register', {
                user: req.body,
                errors,
                pageTitle: 'Register'
            });
        }

        const message = getErrorMessage(error);
        return res.status(500).send(message);
    }
});

authController.get('/login', isGuest, (req, res) => {
    res.render('auth/login', { pageTitle: 'Login' });
});

authController.post('/login', isGuest, async (req, res) => {
    const { email, password } = req.body;

    const token = await authService.login({email, password});

    res.cookie('auth', token, { httpOnly: true });

    res.redirect('/');
});

authController.get('/logout', isAuth, (req, res) => {
    res.clearCookie('auth');
    res.redirect('/');
});

export default authController;