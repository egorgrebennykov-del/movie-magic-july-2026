import { Router } from 'express'

const authController = Router();

authController.get('/register', (req, res) => {
    res.render('auth/register', { pageTitle: 'Register' });
});

export default authController;