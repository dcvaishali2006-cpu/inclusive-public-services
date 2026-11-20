const config = require('./config');

// This function runs BEFORE an admin route.
// It lets the request continue only if the password is correct.
function checkAdmin(req, res, next) {
  // The browser sends the password in a header called x-admin-password
  const password = req.headers['x-admin-password'];

  if (password === config.ADMIN_PASSWORD) {
    next(); // password is right, go to the route
  } else {
    res.status(401).json({ message: 'Wrong or missing admin password' });
  }
}

module.exports = checkAdmin;
