import knex from 'knex'
import config from '../src/config.js'

//------------------------------------------
// products en MariaDb

try {
    const mariaDbClient = knex(config.mariaDb)

    await mariaDbClient.schema.dropTableIfExists('products')

    await mariaDbClient.schema.createTable('products', table => {
        table.increments('id').primary()
        table.string('title', 30).notNullable()
        table.float('price').notNullable()
        table.string('thumbnail', 1024)
    })

    await mariaDbClient.destroy()

    console.log('tabla products en mariaDb creada con éxito')
} catch (error) {
    console.log('error al crear tabla products en mariaDb')
    console.log(error)
}

//------------------------------------------
// messages en SQLite3
try {
    const sqlite3Client = knex(config.sqlite3);

    await sqlite3Client.schema.dropTableIfExists('messages');

    await sqlite3Client.schema.createTable('messages', table => {
        table.increments('id').primary();
        table.string('autor', 30);
        table.string('texto', 128);
        table.string('fyh', 50);
    })

    await sqlite3Client.destroy();

    console.log('tabla messages en sqlite3 creada con éxito')
} catch (error) {
    console.log('error al crear tabla messages en sqlite3')
}