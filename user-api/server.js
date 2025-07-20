const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const authenticateToken = require('./middleware/auth');
let users = require('./data/users');

dotenv.config();
const app = express();
const PORT = 8000;

app.use(cors());
app.use(bodyParser.json());

app.post('/api/login', (req, res) => {
    console.log('Login body:', req.body); // ✅ log this

    const { email } = req.body;

    const user = users.find(u => u.email === email);
    if (!user) return res.status(400).json({ message: 'User not found' });

    const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );

    res.json({ token });
});

app.get('/api/users', authenticateToken, (req, res) => {
    res.json(users);
});

app.get('/api/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));