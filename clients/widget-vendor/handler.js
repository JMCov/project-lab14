'use strict';

var Chance = require('chance');
var chance = new Chance();

const newOrder = (socket, payload = null) => {
  if (!payload) {
    payload = {
      store: 'Acme Widgets',
      orderID: chance.guid(),
      customer: chance.name(),
      address: chance.address(),
    };
  }
  console.log('VENDOR: order ready for pickup');
  socket.emit('join', payload.store);
  socket.emit('pickup', payload);

};

const thanksDriver = (payload) => {

  console.log(`VENDOR: Thank you for delivering ${payload.orderID}`);


};

module.exports = { thanksDriver, newOrder };