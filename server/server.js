const express = require('express');
const admin = require('firebase-admin');
const cors = require('cors');
const mongoose=require('mongoose')
const Chat=require('./models/model')
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
require('dotenv').config();
const { CohereClient } = require('cohere-ai');
const app = express();
const { PORT, DATABASE_URL } = process.env;


admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'), // Corrected syntax
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  }),
});




app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

mongoose.connect(DATABASE_URL)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log('MongoDB connection error:', err));

const cohere = new CohereClient({
  token: process.env.COHERE_API_KEY, // Store your API key in environment variables
});

app.use(cors({
  origin: process.env.ORIGIN,
  credentials: true
}));

app.post('/api/login', async (req, res) => {
  console.log("in login process");
  const idToken = req.cookies.idToken;
  if (!idToken) {
    return res.status(400).json({ error: 'No ID token provided' });
  }
  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    res.json({ message: 'User authenticated', user: decodedToken });
  } catch (error) {
    console.error('Error verifying token:', error);
    res.status(401).json({ error: 'Unauthorized' });
  }
});
app.post('/api/google-auth', async (req, res) => {
  console.log("Google authentication initiated");

  const idToken = req.cookies.idToken; // Get idToken from cookies (like in /api/login)
  
  if (!idToken) {
    return res.status(400).json({ error: 'No ID token provided' });
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const userRecord = await admin.auth().getUser(decodedToken.uid);
    
    
    res.json({ message: 'User authenticated', user: decodedToken, userRecord });
  } catch (error) {
    console.error('Error verifying token:', error);
    res.status(401).json({ error: 'Unauthorized' });
  }
});



app.post('/api/chat', async (req, res) => {
  const { message } = req.body;
  const userId = req.cookies.userId || req.cookies.email; 

  if (!message) {
    return res.status(400).json({ error: 'No message provided' });
  }

  try {
    const response = await cohere.chat({
      message: message,
    });
    if (response && response.text) {
      const chatResponse = response.text;
      

      res.json({ response: chatResponse });
    } else {
      res.status(500).json({ error: 'Unexpected response format from Cohere' });
    }
  } catch (error) {
    console.error('Error communicating with Cohere:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/get-chat-history', async (req, res) => {
  const userId = req.cookies.userId || req.cookies.email;

  if (!userId) {
    return res.status(400).json({ error: 'No user ID provided' });
  }

  try {
    const chatHistory = await Chat.find({ userId }).sort({ timestamp: 1 });  // Sort by timestamp

    res.json({ chatHistory });
  } catch (error) {
    console.error('Error fetching chat history:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/savechat', async (req, res) => {
  const { userId, message, sender } = req.body;

  if (!userId || !message || !sender) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const chat = new Chat({
      userId,
      message,
      sender,
      timestamp: new Date(), // Add timestamp for sorting
    });
    
    await chat.save();
    res.json({ message: 'Chat saved successfully' });
  } catch (error) {
    console.error('Error saving chat:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});






app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
