require('dotenv').config();

const config = {
    dev: process.env.NODE_ENV !== 'production',
    port: process.env.PORT,
    dbUser: process.env.DB_USER,
    dbPassword:process.env.DB_PASSWORD,
    dbHost:process.env.DB_HOST,
    dbPort: process.env.DB_PORT,
    dbName:process.env.DB_NAME,
    AUTH_ADMIN_USERNAME:process.env.AUTH_ADMIN_USERNAME,
    AUTH_ADMIN_PASSWORD:process.env.AUTH_ADMIN_PASSWORD,
    AUTH_ADMIN_EMAIL:process.env.AUTH_ADMIN_EMAIL,
    AUTH_JWT_SECRET: process.env.AUTH_JWT_SECRET
}
module.exports = {config};