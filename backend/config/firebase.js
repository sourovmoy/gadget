const admin = require('firebase-admin');
const path = require('path');

// Initialize Firebase Admin SDK
let serviceAccount;
let isFirebaseConfigured = false;

try {
  // Try to load from base64 environment variable first (for deployment)
  if (process.env.FIREBASE_SERVICE_ACCOUNT_BASE64) {
    console.log('📦 Loading Firebase config from base64 environment variable...');
    const base64String = process.env.FIREBASE_SERVICE_ACCOUNT_BASE64;
    const jsonString = Buffer.from(base64String, 'base64').toString('utf8');
    serviceAccount = JSON.parse(jsonString);
  } else {
    // Fall back to JSON file (for local development)
    serviceAccount = require('./serviceAccountKey.json');
  }
  
  // Check if it's a valid service account (not the example)
  if (serviceAccount.project_id === 'your-project-id' || 
      serviceAccount.private_key === '-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY_HERE\n-----END PRIVATE KEY-----\n') {
    console.log('⚠️  Using placeholder Firebase config. Authentication features will not work.');
    console.log('   To enable authentication:');
    console.log('   1. Go to https://console.firebase.google.com/');
    console.log('   2. Create a project and enable Email/Password authentication');
    console.log('   3. Download service account key');
    console.log('   4. Replace backend/config/serviceAccountKey.json');
    console.log('   OR set FIREBASE_SERVICE_ACCOUNT_BASE64 in .env');
    console.log('');
    console.log('✅ Server will start anyway - public features will work!');
    console.log('');
  } else {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });
    isFirebaseConfigured = true;
    console.log('✅ Firebase Admin SDK initialized successfully');
  }
} catch (error) {
  console.log('⚠️  Firebase service account not configured.');
  console.log('   Public features (landing page, items list) will work.');
  console.log('   Authentication features require Firebase setup.');
  console.log('   Error:', error.message);
  console.log('');
}

module.exports = admin;
module.exports.isFirebaseConfigured = isFirebaseConfigured;
