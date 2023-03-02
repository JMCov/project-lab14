'use strict';

const thanksNotes = require('./handler');
const { io } = require('socket.io-client');

const socket = io.connect('http://localhost:3003/foodChain');

socket.emit('get-all', { queueId: 'BackASSwards meat' });

socket.on('delivered', (payload) => {
  thanksNotes(payload);
  socket.emit('received', payload);
});

