const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
  documentId: String,
  content: String,
  versions: [
    {
      content: String,
      timestamp: { type: Date, default: Date.now }
    }
  ]
});

module.exports = mongoose.model('Document', documentSchema);