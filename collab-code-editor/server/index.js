// Load environment variables
require('dotenv').config();

const express = require('express');
const http = require('http');
const cors = require('cors');
const mongoose = require('mongoose');
const axios = require('axios');
const { setupSockets } = require('./socket');
const googleAuthRoute = require('./routes/googleAuthRoutes'); 

import authRoutes from './routes/auth.js';
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
app.use('/api/google-auth', googleAuthRoute);

// ✅ Setup Socket.io handlers
setupSockets(io);

// ✅ Start Server
const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
