'use strict';

const thanksNotes = (payload) => {

  console.log(`restaurant: Thank you for delivering ${payload.animalName} the ${payload.foodOrder} meat`);
};

module.exports =  thanksNotes ;