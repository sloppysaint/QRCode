const express = require('express');
const mongoose = require('mongoose');
const QRCode = require('./model/QRCode');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 10000;

mongoose.connect(process.env.MONGO_URI);

app.get('/scan/:codeId', async (req, res) => {
  const code = await QRCode.findOne({ codeId: req.params.codeId });

  if (!code) return res.status(404).send("Invalid or non-existent QR code.");
  if (code.used) return res.status(410).send("This QR code has already been used.");

  code.used = true;
  await code.save();

  res.send(`
    <h2>QR Code Scanned</h2>
    <p><strong>Name:</strong> ${code.name}</p>
    <p><strong>Phone:</strong> ${code.phone}</p>
  `);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
