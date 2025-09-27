const { createFarmerData, getFarmerData } = require('../model/farmerdatamodel');

/**
 * Handles the POST request to save farmer data.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
exports.postFarmerData = async (req, res) => {
    try {
        const { land_area_acres, soil_type, irrigation_source } = req.body;

        // Basic validation for required fields
        if (!land_area_acres || !soil_type || !irrigation_source) {
            return res.status(400).json({ message: "Missing required fields: land_area_acres, soil_type, and irrigation_source are required." });
        }

        // Save the farmer's data to the database using the model
        const savedData = await createFarmerData(req.body);

        // Send a successful response
        res.status(201).json({
            message: "Farmer data saved successfully.",
            data: savedData
        });

    } catch (error) {
        res.status(500).json({ message: "An error occurred while processing the request.", error: error.message });
    }
};

/**
 * Handles the GET request to retrieve all farmer data.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
exports.getAllFarmerData = async (req, res) => {
    try {
        // Retrieve all data from the database using the model
        const allData = await getFarmerData();

        // Send a successful response with the data
        res.status(200).json({
            message: "All farmer data retrieved successfully.",
            data: allData
        });

    } catch (error) {
        res.status(500).json({ message: "An error occurred while fetching the data.", error: error.message });
    }
};
