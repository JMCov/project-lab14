'use strict';


const { io } = require('socket.io-client');
const socket = io.connect('http://localhost:3003/foodChain');

socket.emit('get-all', {queueId: 'butcher'});

socket.on('pickup', (payload) => {
  setTimeout(() => {

    console.log(`BUTCHER: picked up the ${payload.foodOrder}`);
    socket.emit('received', {queueId: 'butcher'});
    socket.emit('in-transit', payload);
  }, 2000);

  setTimeout(() => {
    socket.emit('delivered', payload);
    console.log(`BUTCHER: delivered ${payload.foodOrder} meat`);
  }, 2000);

});

