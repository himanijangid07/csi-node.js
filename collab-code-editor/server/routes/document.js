const express = require('express');
const router = express.Router();
const { getDocument, updateDocument } = require('../controllers/documentController');

router.get('/:id', getDocument);
router.put('/:id', updateDocument);

module.exports = router;