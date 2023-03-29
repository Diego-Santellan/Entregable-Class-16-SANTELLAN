export default {
    sqlite3: {
        client: 'sqlite3',
        connection: {
            filename: './DB/mydb.sqlite'
        },
        useNullAsDefault: true
    },
    
    mariaDb: {
        client: 'mysql',
        connection: {
            host: 'localhost',
            user: 'root',
            database: 'coderhouse'
        }
    }
}
