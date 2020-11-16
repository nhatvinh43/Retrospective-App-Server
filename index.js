const express = require('express')
const app = express()   
const dotenv = require('dotenv');
const mongoose = require('mongoose')
const morgan = require('morgan');
const bodyParser = require('body-parser')
const routes = require('./src/routes/route')
const cors = require('cors');
const passport = require('passport');
const http = require('http');
const socket = require('socket.io');

let boardsLastModified = {};

const PORT = process.env.PORT || 8080
const db = mongoose.connection;
dotenv.config();
require('./src/passport');

//DB connection
mongoose.connect(process.env.DB_URL, { useNewUrlParser: true }).then(() => console.log('DB Connected!'));
db.on('error', (err) => {
    console.log('DB connection error:', err.message);
})

app.use(cors());
app.use(morgan("dev"))
app.use(bodyParser.json())
app.use(passport.initialize());

app.use('/', routes)

const server = http.createServer(app);

const io = socket(server, {
    cors: true,
    origins: [process.env.CLIENT]
});

io.on('connection', socket => {

    console.log('Client connected!');

    socket.on('joinRoom', boardId => {
        socket.join(boardId);
        if (!boardsLastModified[boardId])
        {
            boardsLastModified[boardId] = new Date().getTime();
        }
    })

    socket.on('boardChanged', (board) => {
        
        if(board.updatedOn > boardsLastModified[board._id])
        {
            boardsLastModified[board._id] = board.updatedOn;
            io.to(board._id).emit('boardChanged', board);
        }
    })

    socket.on('disconnect', () => {
        console.log('Client disconnected!');
    })
})

server.listen(PORT, () => {console.log("Server started on http://localhost:"+PORT)})

module.exports = app;