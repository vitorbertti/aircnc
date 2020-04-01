const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const socketio = require('socket.io');
const http = require('http');
require('dotenv').config();

const routes = require('./routes');

const app = express();
const server = http.Server(app);
const io = socketio(server);

mongoose
   .connect(process.env.MONGODB_CONNECTION_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true
   })
   .then(() => console.log('Connected'))
   .catch(err => console.log('Error', err.stack));

const connectedUsers = [];

io.on('connection', socket => {
   const { user_id } = socket.handshake.query;

   connectedUsers[user_id] = socket.id;
});

app.use((req, res, next) => {
   req.io = io;
   req.connectedUsers = connectedUsers;

   return next();
});

app.use(cors());
app.use(express.json());
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));
app.use(routes);

module.exports = server;
