// Load environment variables
require('dotenv').config();

const express = require('express');
const http = require('http');
const cors = require('cors');
const mongoose = require('mongoose');
const axios = require('axios');
const { setupSockets } = require('./socket');

const authRoutes = require('./routes/auth');
const docRoutes = require('./routes/document');

const app = express();
const server = http.createServer(app);

// ✅ Allow CORS from frontend (localhost:3000)
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());

// ✅ Setup Socket.IO server with CORS
const io = require('socket.io')(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true
  }
});

// ✅ MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(console.error);

// ✅ API Routes
app.use('/api/auth', authRoutes);
app.use('/api/docs', docRoutes);

// ✅ Judge0 Code Execution Endpoint
app.post('/run', async (req, res) => {
  const { code, language_id = 63 } = req.body; // default to JavaScript

  try {
    const result = await axios.post(
      'https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true',
      {
        source_code: code,
        language_id,
      },
      {
        headers: {
          'X-RapidAPI-Key': process.env.JUDGE0_API_KEY,
          'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
          'Content-Type': 'application/json',
        },
      }
    );

    res.json(result.data);
  } catch (err) {
    res.status(500).json({ error: 'Execution failed', details: err.message });
  }
});

// ✅ Setup Socket.io handlers
setupSockets(io);

// ✅ Start Server
const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
