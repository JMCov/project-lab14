'use strict';

const { newOrder, thanksDriver } = require('./handler');
const { io } = require('socket.io-client');

const socket = io.connect('http://localhost:3003/caps');

socket.emit('get-all', {queueId: '1-800-flowers'});

socket.on('delivered', (payload) => {
  thanksDriver(payload);
  socket.emit('received', payload);
});

setInterval(() => {
  newOrder(socket);
}, 5000);
