require('dotenv').config();

const config = {
    dev: process.env.NODE_ENV !== 'production',
    port: process.env.PORT,
    dbUser: process.env.DB_USER,
    dbPassword:process.env.DB_PASSWORD,
    dbHost:process.env.DB_HOST,
    dbPort: process.env.DB_PORT,
    dbName:process.env.DB_NAME,
    AuthAdminUsername:process.env.AUTH_ADMIN_USERNAME,
    AuthAdminPassword:process.env.AUTH_ADMIN_PASSWORD,
    AuthAdminEmail:process.env.AUTH_ADMIN_EMAIL,
    AuthJwtSecret: process.env.AUTH_JWT_SECRET
}
module.exports = {config};