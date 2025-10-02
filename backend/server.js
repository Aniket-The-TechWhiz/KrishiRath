const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { connectDB } = require('./config/dbconnection');
const farmerDataRoutes = require('./routes/farmerdataroutes');
const authRoutes = require('./routes/authRoutes.js');
const auth = require('./middleware/authMiddleware');    // required for test protected route

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
app.use('/', farmerDataRoutes);
app.use('/api/auth', authRoutes); 

app.get("/api/protected", auth, (req, res) => {
  res.json({ message: "Access granted!", user: req.user });
});      //test protected route

app.get('/', (req, res) => {
    res.send('Welcome to the Farmer Data API!');
});


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
