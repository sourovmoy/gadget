const fs = require('fs');
const path = require('path');

// Read the service account key file
const serviceAccountPath = path.join(__dirname, 'config', 'serviceAccountKey.json');
const serviceAccount = fs.readFileSync(serviceAccountPath, 'utf8');

// Convert to base64
const base64 = Buffer.from(serviceAccount).toString('base64');

console.log('\n=================================================');
console.log('SERVICE ACCOUNT KEY - BASE64 ENCODED');
console.log('=================================================\n');
console.log(base64);
console.log('\n=================================================');
console.log('Copy the above base64 string and add it to your .env file:');
console.log('FIREBASE_SERVICE_ACCOUNT_BASE64=<paste-here>');
console.log('=================================================\n');

// Also save to a file for easy copying
fs.writeFileSync(path.join(__dirname, 'serviceAccountKey.base64.txt'), base64);
console.log('✅ Base64 string also saved to: backend/serviceAccountKey.base64.txt\n');
