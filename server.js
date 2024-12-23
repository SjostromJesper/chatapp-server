import express from "express";
import {createServer} from 'node:http'
import { Server } from "socket.io"

const app = express();

const server = createServer(app)
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
})

io.on('connection', (socket) => {
    console.log('A user connected')

    socket.on('message', (message) => {
        console.log('message:', message)
        sendToAll(message)
    })
})

server.listen(3000, () => {
    console.log('Server started on port 3000')
});

const sendToAll = (message) => {
    console.log(message)

    io.emit('message', message)
}