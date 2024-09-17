// index.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
// routes
const branchRoutes = require('./routes/BranchRoutes');
const userRoutes = require('./routes/UserRoutes');
const denominationRoutes = require('./routes/DenominationRoutes');




const app = express();
const PORT = process.env.PORT || 5000;

mongoose.connect('mongodb://localhost:27017/kbo_db');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});



//app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

// set routes
app.use('/api/branches', branchRoutes);
app.use('/api/users', userRoutes);
app.use('/api/denominations', denominationRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});