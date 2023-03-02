'use strict';

var Chance = require('chance');
var chance = new Chance();

const newOrder = (socket, payload = null) => {
  if (!payload) {
    payload = {
      store: 'Old McDonald Ranch',
      orderID: chance.guid(),
      customer: chance.name(),
      animalName: chance.first(),
      foodOrder: chance.animal(),
    };
  }
  console.log(`FARM-VENDOR: thanks for picking up ${payload.animalName} the ${payload.foodOrder}.`);
  socket.emit('join', payload.store);
  socket.emit('pickup', payload);

};

const thanksDriver = (payload) => {
  // console.log(`FARM-VENDOR: Thank you for picking up the ${payload.animalName}`);
  process.exit();
};

module.exports = { thanksDriver, newOrder };