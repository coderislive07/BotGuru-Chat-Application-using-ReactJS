const admin = require('firebase-admin');
require('dotenv').config(); // Ensure .env file is loaded

const serviceAccount = require('./firebase-adminsdk.json'); // Path to your Firebase Admin SDK JSON file

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;