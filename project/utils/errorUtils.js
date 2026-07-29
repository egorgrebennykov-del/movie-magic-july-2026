import * as z from 'zod';

export const getErrorMessage = (error) => {
    if (error?.name === 'PrismaClientKnownRequestError') {
        switch (error.code) {
            case 'P2002':
                return 'Unique constraint failed';

            case 'P2003':
                return 'Foreign key constraint failed';

            default:
                return 'Database error';
        }
    }

    return error?.message || 'An unexpected error occurred';
};