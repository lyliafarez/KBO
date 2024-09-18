
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const contactRoutes = require('./routes/ContactRoutes');
const codeRoutes = require('./routes/CodeRoutes');
const favoriteRoutes = require('./routes/FavoriteRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

mongoose.connect('mongodb://localhost:27017/kbo_db', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

app.use(bodyParser.json());
app.use(cors());

app.use('/api/contacts', contactRoutes);
app.use('/api/codes', codeRoutes);
app.use('/api/favorites', favoriteRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
