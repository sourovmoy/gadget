const express = require('express');
const jwt = require('jsonwebtoken');
const firebaseConfig = require('../config/firebase');
const admin = firebaseConfig;
const router = express.Router();

/**
 * POST /api/auth/login
 * Verify Firebase ID token and issue JWT
 */
router.post('/login', async (req, res) => {
  try {
    // Check if Firebase is configured
    if (!firebaseConfig.isFirebaseConfigured) {
      return res.status(503).json({ 
        success: false, 
        message: 'Firebase authentication not configured. Please add your Firebase service account key to backend/config/serviceAccountKey.json' 
      });
    }

    const { idToken } = req.body;

    if (!idToken) {
      return res.status(400).json({ 
        success: false, 
        message: 'ID token is required' 
      });
    }

    // Verify Firebase ID token
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const { uid, email } = decodedToken;

    // Generate JWT
    const token = jwt.sign(
      { uid, email },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Set HTTP-only cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 * 1000 // 24 hours
    });

    res.json({
      success: true,
      message: 'Login successful',
      user: { uid, email }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(401).json({ 
      success: false, 
      message: 'Invalid token or authentication failed' 
    });
  }
});

/**
 * POST /api/auth/logout
 * Clear JWT cookie
 */
router.post('/logout', (req, res) => {
  res.clearCookie('token');
  res.json({ 
    success: true, 
    message: 'Logout successful' 
  });
});

/**
 * GET /api/auth/verify
 * Verify if user is authenticated
 */
router.get('/verify', async (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ 
        success: false, 
        authenticated: false 
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    res.json({ 
      success: true, 
      authenticated: true,
      user: decoded
    });
  } catch (error) {
    res.status(401).json({ 
      success: false, 
      authenticated: false 
    });
  }
});

module.exports = router;
