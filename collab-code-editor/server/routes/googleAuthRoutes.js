// routes/googleAuthRoutes.js
import express from 'express';
import { saveGoogleUser } from '../controllers/authController.js'; // Or wherever your controller is

const router = express.Router();

router.post('/save-user', saveGoogleUser);

export default router;