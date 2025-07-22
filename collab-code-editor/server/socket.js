const Document = require('./models/Document');

function setupSockets(io) {
  io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on('join', (docId) => {
      socket.join(docId);
      console.log(`User ${socket.id} joined doc ${docId}`);
    });

    socket.on('code-change', ({ docId, content }) => {
      socket.to(docId).emit('code-change', content);
    });

    socket.on('save-doc', async ({ docId, content }) => {
      const doc = await Document.findById(docId);
      if (doc) {
        doc.content = content;
        doc.history.push({ content, timestamp: new Date() });
        doc.updatedAt = new Date();
        await doc.save();
      }
    });

    socket.on('disconnect', () => {
      console.log(`User disconnected: ${socket.id}`);
    });
  });
}

module.exports = { setupSockets };