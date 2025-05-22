const mongoose = require('mongoose');
const QRCode = require('qrcode');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const QRModel = require('./model/QRCode');

mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log("Connected to MongoDB");
  generate();
});

const data = [
  { name: "UZAIR SHAIKH", phone: "8828870458" },
  { name: "Akshat Jain", phone: "9330351007" },
  { name: "Rohan Mudras", phone: "9819216439" },
  { name: "Abhay", phone: "9326772320" },
  { name: "Amit", phone: "8698155594" },
  { name: "Takkshay Goel", phone: "9810252312" },
  { name: "Vinay dingwaney", phone: "9820512543" },
  { name: "GURUGRAM", phone: "8879498384" },
  { name: "Suraj", phone: "7977201625" }
];

async function generate() {
  if (!fs.existsSync('qrcodes')) fs.mkdirSync('qrcodes');

  for (const entry of data) {
    const codeId = Math.random().toString(36).substring(2, 10);

    await QRModel.create({ codeId, name: entry.name, phone: entry.phone });

    const url = `${process.env.BASE_URL}/scan/${codeId}`;
    const filePath = path.join(__dirname, 'qrcodes', `${entry.name.replace(/ /g, '_')}.png`);

    await QRCode.toFile(filePath, url);
    console.log(`QR generated for ${entry.name}`);
  }

  mongoose.disconnect();
}
