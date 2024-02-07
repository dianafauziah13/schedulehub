const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();


const app = express();
const PORT = process.env.PORT || 5001;
const DBNAME = process.env.DBNAME || "scheduleHub";
const mongouri =
  process.env.MONGO_URI || `mongodb://127.0.0.1:27017/${DBNAME}?ssl=false`;

mongoose.connect(mongouri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Koneksi database gagal:'));

db.once('open', () => {
  console.log('Koneksi database berhasil!');
});

app.listen(PORT, () => {
  console.log("Port run on " + PORT);
});