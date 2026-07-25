import jwt from 'jsonwebtoken';

export default function authMiddleware(req, res, next) {
    const token = req.cookies;

    if(!token)
    {
        return next();
    }

    try{
        const decodedToken = jwt.verify('token', 'SECRETGOESHERE');
        req.user = decodedToken;
    } catch {
        console.error('Invalid Token: ', err);
        return res.status(401).send('Unauthoized: Invalid token');
    }
    
    next();
}