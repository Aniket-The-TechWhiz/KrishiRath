const express = require('express');
const router = express.Router();
const predict = require('../controllers/croprecommendation');
const ort = require('onnxruntime-node');

// let session;

// (async () => {
//   try {
//     session = await ort.InferenceSession.create("model.onnx", {
//       executionProviders: ["wasm"] // use wasm backend in Node
//     });
//     console.log("✅ ONNX model loaded successfully");
//   } catch (err) {
//     console.error("❌ Failed to load ONNX model:", err);
//   }
// })();


let session;

(async () => {
  try {
    session = await ort.InferenceSession.create("./model.onnx"); // path to your model
    console.log("✅ ONNX model loaded successfully");
  } catch (err) {
    console.error("❌ Failed to load model:", err);
  }
})();

// POST route to save new farmer data
// router.post('/farmer-data', farmerDataController.postFarmerData);
router.post('/api/v1/crop-predict', predict);

// GET route to retrieve all farmer data
// router.get('/farmer-data', farmerDataController.getAllFarmerData);

module.exports = router;
