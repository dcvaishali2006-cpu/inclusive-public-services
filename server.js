const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const config = require('./config');
const checkAdmin = require('./checkAdmin');

const app = express();

// Lets Express read JSON sent by the browser
app.use(express.json());

// The main link "/" opens the login page first (this must come BEFORE express.static)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// Serve the files in the "public" folder (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Admin login: checkAdmin verifies the password, then we reply "OK"
app.post('/api/admin/login', checkAdmin, (req, res) => {
  res.json({ message: 'Login OK' });
});

// Connect the route files
app.use('/api/services', require('./routes/services'));
app.use('/api/reports', require('./routes/reports'));

// First connect to MongoDB, then start the server
async function startServer() {
  try {
    await mongoose.connect(config.MONGO_URL);
    console.log('MongoDB connected');
    app.listen(config.PORT, () => {
      console.log('Open http://localhost:' + config.PORT);
    });
  } catch (error) {
    console.log('Could not connect to MongoDB:', error.message);
  }
}

startServer();
