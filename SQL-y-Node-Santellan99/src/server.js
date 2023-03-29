import express from 'express'

import { Server as HttpServer } from 'http'
import { Server as Socket } from 'socket.io'

import SQLContainer from './containers/SQLContainer.js'

import config from './config.js'

//--------------------------------------------
// instancio servidor, socket y api

const app = express()
const httpServer = new HttpServer(app)
const io = new Socket(httpServer)

const apiProducts = new SQLContainer(config.mariaDb, 'products')
const apiMessages = new SQLContainer(config.sqlite3, 'messages')

//--------------------------------------------
// configuro el socket

io.on('connection', async socket => {
    console.log('Nuevo cliente conectado!');

    // carga inicial de products
    socket.emit('products', await apiProducts.toListAll());

    // actualizacion de products
    socket.on('update', async product => {
        await apiProducts.save(product)
        io.sockets.emit('products', await apiProducts.toListAll());
    })

    // carga inicial de messages
    socket.emit('messages', await apiMessages.toListAll());

    // actualizacion de messages
    socket.on('newMessage', async message => {
        message.fyh = new Date().toLocaleString()
        await apiMessages.save(message)
        io.sockets.emit('messages', await apiMessages.toListAll());
    })
});

//--------------------------------------------
// agrego middlewares

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

//--------------------------------------------
// inicio el servidor

const PORT = 3030
const connectedServer = httpServer.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${connectedServer.address().port}`)
})
connectedServer.on('error', error => console.log(`Error en servidor ${error}`))
