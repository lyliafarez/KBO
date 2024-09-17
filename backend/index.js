// index.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const enterpriseRoutes = require('./routes/enterpriseRoutes');
const establishmentRoutes = require('./routes/establishmentRoutes');


const app = express();
const PORT = process.env.PORT || 5000;

mongoose.connect('mongodb://localhost:27017/kbo_db');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

app.use(bodyParser.json());
app.use(cors());


app.use('/api/enterprises', enterpriseRoutes);
app.use('/api/establishments', establishmentRoutes);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});