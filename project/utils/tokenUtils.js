import jwt from 'jsonwebtoken';

export function generateAuthToken(user)
{
    const payload = { id: user.id, email: user.email };
    const token = jwt.sign(payload, process.env.AUTH_SECRET || 'SECRETGOESHERE', { expiresIn: '1h'});

    return token;
}