'use strict';

const socket = require('../socket.js');
const { thanksDriver, newOrder } = require('./handler');

jest.mock('../socket.js', () => {
  return {
    on: jest.fn(),
    emit: jest.fn(),
  };
});
console.log = jest.fn();

describe('Vendor', () => {
  let payload = {
    store: 'The Shit Store',
    orderID: 'test123',
    customer: 'Jordan',
    address: 'Right Here',
  };
  it('emits an order as expected', () => {
    newOrder(socket, payload);
    expect(console.log).toHaveBeenCalledWith('VENDOR: order ready for pickup');
    expect(socket.emit).toHaveBeenCalledWith('join', 'The Shit Store')
    expect(socket.emit).toHaveBeenCalledWith('pickup', payload);
  });

  it('thanks driver', () => {
    thanksDriver(payload);
    expect(console.log).toHaveBeenCalledWith('VENDOR: Thank you for delivering test123');

  });


  
});
