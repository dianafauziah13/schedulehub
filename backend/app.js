const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require('cors');

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

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/api", require("./src/routes/index"));

app.listen(PORT, () => {
  console.log("Port run on " + PORT);
});