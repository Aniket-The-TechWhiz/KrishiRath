const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { connectDB } = require('./config/dbconnection');
const farmerDataRoutes = require('./routes/farmerdataroutes');

// Load environment variables from a .env file
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connect to the database
connectDB();

// Use the routes for the API
app.use('/api', farmerDataRoutes);

app.get('/', (req, res) => {
    res.send('Welcome to the Farmer Data API!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
