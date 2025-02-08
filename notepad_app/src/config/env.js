import dotenv from 'dotenv';

dotenv.config();

const env = 
{
    DB_HOST         : process.env.DB_HOST || 'localhost',
    DB_USER         : process.env.DB_USER || '',
    DB_PASSWORD     : process.env.DB_PASSWORD || '',
    DB_NAME         : process.env.DB_NAME || '',
    DB_PORT         : process.env.DB_PORT || 3306,
    DB_ROOT_PASSWORD: process.env.DB_ROOT_PASSWORD || '',
    NODE_ENV        : process.env.NODE_ENV || 'development',
    PORT            : process.env.PORT || 5000,
};

export default env;
