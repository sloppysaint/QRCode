const mongoose = require('mongoose');

const QRCodeSchema = new mongoose.Schema({
  codeId: String,
  name: String,
  phone: String,
  used: { type: Boolean, default: false }
});

module.exports = mongoose.model('QRCode', QRCodeSchema);
