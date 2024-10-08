const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
//Swagger
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Importer les routes
const branchRoutes = require('./routes/BranchRoutes');
const userRoutes = require('./routes/UserRoutes');
const denominationRoutes = require('./routes/DenominationRoutes');
const activityRoutes = require('./routes/ActivityRoutes');
const addressRoutes = require('./routes/AddressRoutes');
const enterpriseRoutes = require('./routes/EnterpriseRoutes');
const establishmentRoutes = require('./routes/EstablishmentRoutes');
const contactRoutes = require('./routes/ContactRoutes');
const codeRoutes = require('./routes/CodeRoutes');
const favoriteRoutes = require('./routes/FavoriteRoutes');
const uploadRoutes = require('./routes/UploadRoutes');  // Import the upload route
const scrappingRoutes = require('./routes/ScrappingRoutes');
const authRoutes = require('./routes/AuthRoutes')
const searchRoutes = require('./routes/searchRoutes');  

const app = express();

app.use(cors({
  origin: 'http://localhost:8081',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type']
}));

const PORT = process.env.PORT || 5000;
mongoose.connect('mongodb://127.0.0.1:27017/kbo_db', {
// mongoose.connect('mongodb://localhost:27017/kbo_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  autoIndex: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});


app.use(cors());
app.use(express.json());

//Swagger config
const swaggerOptions = {
  swaggerDefinition: {
    securityDefinitions: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
    openapi: '3.0.0',
    info: {
      title: 'KBO PROJECT API',
      version: '1.0.0',
      description: 'API pour gérer les entreprises et leurs informations',
      servers: [
        {
          url: 'http://localhost:5000',
          description: 'Serveur de développement'
        }
      ],
    },
  },
  apis: ['./routes/*.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);



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
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use('/api/auth', authRoutes);
app.use('/api/search', searchRoutes); 

app.use('/api/scrapping', scrappingRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
