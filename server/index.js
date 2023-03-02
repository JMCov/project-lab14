'use strict';

require('dotenv').config();
const { Server } = require('socket.io');
const PORT = process.env.PORT || 3003;
const server = new Server();
const caps = server.of('/caps');
const Queue = require('./lib/queue');
const eventQueue = new Queue();


caps.on('connection', (socket) => {
  console.log('Connected to caps with socket.id = ', socket.id);

  socket.onAny((event, payload) => {
    const time = new Date().toISOString();
    console.log('EVENT:', { event, time, payload });
  });

  socket.on('join', (room) => {

    socket.join(room);
    console.log(`You've joined the ${room} room`);
  });


  socket.on('pickup', (payload) => {
    let currentQueue = eventQueue.read('butcher');
    if (!currentQueue) {
      let queueKey = eventQueue.store('butcher', new Queue());
      currentQueue = eventQueue.read(queueKey);
    }
    // console.log('Event Queue--------->', eventQueue);
    currentQueue.store(payload.orderID, payload);
    // console.log('Current Queue ---------->', currentQueue);
    caps.emit('pickup', payload);
  });

  socket.on('in-transit', (payload) => {
    caps.emit('in-transit', payload);
  });

  socket.on('delivered', (payload) => {
    let currentQueue = eventQueue.read(payload.store);
    if (!currentQueue) {
      let queueKey = eventQueue.store(payload.store, new Queue());
      currentQueue = eventQueue.read(queueKey);
    }
    currentQueue.store(payload.orderID, payload);
    caps.emit('delivered', payload);
  });


  socket.on('received', (payload) => {
    console.log('Server received event', payload);
    let id = payload.queueId ? payload.queueId : payload.store;
    let currentQueue = eventQueue.read(id);
    if (!currentQueue) {
      throw new Error('No queue dumb ass');
    }

    let message = currentQueue.remove(payload.orderID);

    caps.emit('received', message);
  });

  socket.on('get-all', (payload) => {
    let id = payload.queueId ? payload.queueId : payload.store;
    let currentQueue = eventQueue.read(id);
    if (currentQueue && currentQueue.data) {
      Object.keys(currentQueue.data).forEach(orderID => {
        socket.emit('pickup', currentQueue.read(orderID));
      });

    }
  });

});

const start = () => {

  server.listen(PORT);
  console.log(`listening on ${PORT}`);
};

start();