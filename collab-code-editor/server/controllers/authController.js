// OLD (CommonJS):
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const User = require('../models/User');

// NEW (ES Modules):
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';


export const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hash = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hash });
    await user.save();
    res.status(201).json({ message: 'User created' });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ message: 'Signup failed', error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(403).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '2h' }
    );
    res.json({ token });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: 'Login failed', error: err.message });
  }
};

export const saveGoogleUser = async (req, res) => {
  try {
    const { name, email, imageUrl } = req.body;

    let user = await User.findOne({ email });

    if (!user) {
      user = new User({ name, email, image: imageUrl });
      await user.save();
    }

    res.status(200).json({ message: 'User saved', user });
  } catch (error) {
    console.error('Error saving Google user:', error);
    res.status(500).json({ message: 'Server error' });
  }
};