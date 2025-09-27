const express = require('express');
const router = express.Router();
const farmerDataController = require('../controllers/farmerdatacontroller');

// POST route to save new farmer data
router.post('/farmer-data', farmerDataController.postFarmerData);

// GET route to retrieve all farmer data
router.get('/farmer-data', farmerDataController.getAllFarmerData);

module.exports = router;
