const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/User");

// SIGNUP / REGISTER
exports.registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ error: "Email already registered" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// SIGNIN / LOGIN
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    res.json({ 
      token, 
      user: { id: user._id, email: user.email } 
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET PROFILE
exports.getProfile = async (req, res) => {
  try {
    // req.user.id comes from the auth middleware
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ... existing register and login logic ...

// UPDATE PROFILE
exports.updateProfile = async (req, res) => {
  try {
    const { 
      username, 
      phoneNumber, 
      primaryLanguage, 
      farmSize, 
      experience, 
      cityVillage,
      latitude, // New field
      longitude // New field
    } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { 
        $set: { 
          username, 
          phoneNumber, 
          primaryLanguage, 
          farmSize, 
          experience, 
          cityVillage,
          latitude,
          longitude
        } 
      },
      { new: true, runValidators: true }
    ).select("-password");

    res.json({ message: "Profile updated successfully", user: updatedUser });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};