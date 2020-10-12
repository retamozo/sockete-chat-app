const express = require('express');
const socket = require('socket.io');
const http = require('http');
const router = require('./router')

const app = express();
const server = http.createServer(app);
const io = socket(server)

io.on('connection', socket => {
    console.log('user is connected', socket);

    socket.on('disconnect', () => {
        console.log('user had left');
    })
})

app.use(router)

const port = process.env.PORT || 8000;
app.set('port', port)

const watchPortMessage = () => {
    console.log(`Listening in ${port}`)
}

app.listen(port, watchPortMessage)

