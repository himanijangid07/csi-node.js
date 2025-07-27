// middleware/notFound.js
export default function notFound(req, res, next) {
  res.status(404).json({ message: `Route ${req.originalUrl} not found` });
}
