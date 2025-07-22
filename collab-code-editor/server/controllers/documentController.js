const Document = require('../models/Document');

exports.getDocument = async (req, res) => {
  const { id } = req.params;
  let doc = await Document.findOne({ documentId: id });
  if (!doc) {
    doc = await Document.create({ documentId: id, content: '' });
  }
  res.json(doc);
};

exports.updateDocument = async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;

  const doc = await Document.findOneAndUpdate(
    { documentId: id },
    { content, $push: { versions: { content } } },
    { new: true }
  );

  res.json(doc);
};