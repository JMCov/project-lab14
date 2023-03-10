'use strict';

const { newOrder } = require('./handler');
const { io } = require('socket.io-client');

const socket = io.connect('http://localhost:3003/foodChain');

socket.emit('get-all', {queueId: 'Old McDonald Ranch'});

socket.on('delivered', (payload) => {
  // thanksDriver(payload);
  socket.emit('received', payload);
});

setInterval(() => {
  newOrder(socket);
}, 6000);
