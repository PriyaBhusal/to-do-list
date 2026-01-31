const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const model = require('../models');

// Register a new user
const userRegister = async (req, res) => {
  try {
    const { phone, password, fullName, email } = req.body;

    // Check if phone already exists
    const existingUser = await model.user.findOne({ where: { phone } });
    if (existingUser) {
      return res.status(401).json({ message: "Phone number already registered" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 8);

    const newUser = await model.user.create({
      phone,
      password: hashedPassword,
      fullName,
      email
    });

    // Hide password in response
    newUser.password = undefined;

    res.status(201).json({
      message: "User registered successfully",
      data: newUser
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
};

// Login user
const userLogin = async (req, res) => {
  try {
    const { phone, password } = req.body;

    const user = await model.user.findOne({ where: { phone } });
    if (!user) {
      return res.status(404).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(404).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, phone: user.phone },
      process.env.JWT_TOKEN_KEY,
      { expiresIn: "1d" }
    );

    user.password = undefined; // Hide password

    res.status(200).json({
      message: "Login successful",
      token,
      data: user
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
};

// Update user
const updateUser = async (req, res) => {
  try {
    const userId = req.params.id || req.userData.id; // fallback to token user id
    const { fullName, email, password } = req.body;

    const user = await model.user.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    let updatedData = { fullName, email };
    if (password) {
      updatedData.password = await bcrypt.hash(password, 8);
    }

    await model.user.update(updatedData, { where: { id: userId } });
    const updatedUser = await model.user.findByPk(userId);
    updatedUser.password = undefined;

    res.status(200).json({
      message: "User updated successfully",
      data: updatedUser
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
};

// Delete user
const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id || req.userData.id;

    const user = await model.user.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await model.user.destroy({ where: { id: userId } });
    res.status(200).json({ message: "User deleted successfully" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
};

module.exports = {
  userRegister,
  userLogin,
  updateUser,
  deleteUser
};
