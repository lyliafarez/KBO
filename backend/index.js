const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');



// routes
const branchRoutes = require('./routes/BranchRoutes');
const userRoutes = require('./routes/UserRoutes');
const denominationRoutes = require('./routes/DenominationRoutes');
const activityRoutes = require('./routes/ActivityRoutes'); 
const addressRoutes = require('./routes/AddressRoutes');
const enterpriseRoutes = require('./routes/enterpriseRoutes');
const establishmentRoutes = require('./routes/establishmentRoutes');
const contactRoutes = require('./routes/ContactRoutes');
const codeRoutes = require('./routes/CodeRoutes');
const favoriteRoutes = require('./routes/FavoriteRoutes');
const uploadRoutes = require('./routes/UploadRoutes');  // Import the upload route



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

app.use('/api/activities', activityRoutes);
app.use('/api/addresses', addressRoutes);


app.use('/api/enterprises', enterpriseRoutes);
app.use('/api/establishments', establishmentRoutes);




app.use('/api/contacts', contactRoutes);
app.use('/api/codes', codeRoutes);
app.use('/api/favorites', favoriteRoutes);

app.use('/api', uploadRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
