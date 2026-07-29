import * as z from 'zod';

export const registerSchema = z.object({
    email: z.string()
        .min(10, { message: 'Email must be at least 10 characters long' })
        .regex(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+\.[A-Za-z0-9]+$/, {
            message: 'Email must be a valid email address'
        }),
    password: z.string()
        .min(6, { message: 'Password must be at least 6 characters long' })
        .regex(/^[A-Za-z0-9]+$/, {
            message: 'Password can only contain English letters and digits'
        }),
    repeatPassword: z.string()
}).refine((data) => data.password === data.repeatPassword, {
    message: 'Passwords do not match',
    path: ['repeatPassword']
});