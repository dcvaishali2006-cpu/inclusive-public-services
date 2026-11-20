// All settings in one place. Environment variables override the defaults.
module.exports = {
  // Port number where the website will run
  PORT: process.env.PORT || 3000,
  // Address of the MongoDB database (local by default)
  MONGO_URL: process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/publicServices',
  // Admin password (change it before showing to others!)
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD || 'admin123'
};
