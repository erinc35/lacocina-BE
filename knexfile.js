const localPgConnection = {
    host: '127.0.0.1',
    database: 'postgres',
    user: 'admin',
    password: 'password',
    port: '5432'
}
const prodDbConnection = process.env.DATABASE_URL || localPgConnection;


module.exports = {

    development: {
        client: 'sqlite3',
        connection: {
            filename: './data/intercomAppDevelopmentDB.sqlite3'
        },
        useNullAsDefault: true,
        migrations: {
            directory: './data/migrations'
        }
    },

    production: {
        client: 'pg',
        connection: prodDbConnection,
        migrations: {
            directory: './data/migrations',
        }
    }
}