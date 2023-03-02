'use strict';


const { io } = require('socket.io-client');
const socket = io.connect('http://localhost:3003/caps');

socket.emit('get-all', {queueId: 'driver'});

socket.on('pickup', (payload) => {
  setTimeout(() => {


    console.log(`DRIVER: picked up ${payload.orderID}`);
    socket.emit('received', {queueId: 'driver'});
    socket.emit('in-transit', payload);

   
  }, 1000);
  setTimeout(() => {
    socket.emit('delivered', payload);
    console.log(`DRIVER: delivered ${payload.orderID}`);
  }, 1000);

});

