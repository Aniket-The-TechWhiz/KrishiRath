const mongoose = require('mongoose');

const farmerDataSchema = new mongoose.Schema({
    land_area_acres: {
        type: Number,
        required: true,
    },
    soil_type: {
        type: String,
        required: true,
        lowercase: true,
    },
    irrigation_source: {
        type: String,
        required: true,
        lowercase: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

const FarmerData = mongoose.model('FarmerData', farmerDataSchema);

/**
 * Saves a new farmer data entry to the database.
 * @param {object} data - The farmer's input data.
 * @returns {object} The saved document.
 */
exports.createFarmerData = async (data) => {
    try {
        const newFarmerData = new FarmerData(data);
        const savedData = await newFarmerData.save();
        return savedData;
    } catch (err) {
        console.error('Error saving farmer data:', err);
        throw err;
    }
};

/**
 * Retrieves all farmer data entries from the database.
 * @returns {Array} An array of all farmer data documents.
 */
exports.getFarmerData = async () => {
    try {
        const allData = await FarmerData.find({});
        return allData;
    } catch (err) {
        console.error('Error fetching farmer data:', err);
        throw err;
    }
};
