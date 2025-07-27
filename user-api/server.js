const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const multer = require('multer');
const Joi = require('joi');
const axios = require('axios');
const authenticateToken = require('./middleware/auth');
let users = require('./data/users');

dotenv.config();
const app = express();
const PORT = 8000;

app.use(cors());
app.use(bodyParser.json());

// ---------------- FILE UPLOAD (MULTER) ----------------
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});
const upload = multer({ storage });

// ---------------- VALIDATION SCHEMA (JOI) ----------------
const loginSchema = Joi.object({
  email: Joi.string().email().required(),
});

// ---------------- LOGIN ROUTE ----------------
app.post('/api/login', async (req, res, next) => {
  try {
    const { error } = loginSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const { email } = req.body;
    const user = users.find(u => u.email === email);
    if (!user) return res.status(400).json({ message: 'User not found' });

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ token });
  } catch (error) {
    next(error);
  }
});

// ---------------- USERS ROUTES ----------------
app.get('/api/users', authenticateToken, (req, res, next) => {
  try {
    res.json(users);
  } catch (error) {
    next(error);
  }
});

// ---------------- FILE UPLOAD ROUTE ----------------
app.post('/api/upload', upload.single('file'), (req, res) => {
  res.json({ message: 'File uploaded successfully!', file: req.file });
});

// ---------------- THIRD-PARTY API ROUTE (AXIOS) ----------------
app.get('/api/external-data', async (req, res, next) => {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
    res.json(response.data);
  } catch (error) {
    next(error);
  }
});

// ---------------- ERROR HANDLING ----------------
app.use((req, res, next) => {
  res.status(404).json({ message: `Route ${req.originalUrl} not found` });
});

app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({ message: err.message || 'Internal Server Error' });
});

// ---------------- START SERVER ----------------
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
