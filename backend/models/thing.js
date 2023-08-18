const { Binary } = require('mongodb');
const mongoose = require('mongoose');

const thingSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: Binary, required: true },
  userId: { type: String, required: true },
  price: { type: Number, required: true },
  DateCreation: { type: Date, required: true},
});






module.exports = mongoose.model('Thing', thingSchema);