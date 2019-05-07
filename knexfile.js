const localPgConnection = {
    host: 'localhost',
    database: 'app',
    user: 'admin',
    password: 'password'
}
const prodDbConnection = process.env.DATABASE_URL || localPgConnection;


module.exports = {

    production: {
        client: 'pg',
        connection: prodDbConnection,
        migrations: {
            directory: './data/migrations',
        },
        seeds: {
            directory: './data/seeds',
        },
    }

}