const { createFarmerData, getFarmerData } = require('../model/croprecommendation');
const ort = require('onnxruntime-node');

// let session = null;

let session;

(async () => {
  try {
    session = await ort.InferenceSession.create("./model.onnx"); // path to your model
    console.log("✅ ONNX model loaded successfully");
  } catch (err) {
    console.error("❌ Failed to load model:", err);
  }
})();



const predict = async (req, res) => {
  try {
    if (!session) {
      return res.status(503).json({ error: "Model not loaded yet. Try again later." });
    }

    const { temperature, rainfall, ph, humidity } = req.body;

    // Input validation
    if ([temperature, rainfall, ph, humidity].some(v => typeof v !== "number")) {
      return res.status(400).json({ error: "All inputs must be numbers" });
    }

    // Arrange features in the order your model expects
    const features = [temperature, humidity, ph, rainfall];

    const inputTensor = new ort.Tensor(
      "float32",
      Float32Array.from(features),
      [1, features.length]
    );


    console.log("Model input names:", session.inputNames);
console.log("Model input types:", session.inputTypes);


    const feeds = {};
    feeds[session.inputNames[0]] = inputTensor;

    const results = await session.run(feeds);
    const output = results[session.outputNames[0]];

    res.json({ prediction: output.data });
  } catch (err) {
    console.error("Prediction error:", err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = predict;
