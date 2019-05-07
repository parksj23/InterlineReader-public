/*module.exports = {
  mongoURI: process.env.MONGO_URI,
  secretOrKey: process.env.SECRET_OR_KEY,
  sendGridKey: process.env.SEND_GRID_KEY,
  redirectDomain: process.env.REDIRECT_DOMAIN,
};*/

module.exports = {
  mongoURI: 'mongodb://ubcreader:britishcolumbia1324!@ds155862.mlab.com:55862/ubcreadertesting',
  secretOrKey: 'secret',
  sendGridKey: 'YOUR_SENDGRID_KEY',
  redirectDomain: 'http://127.0.0.1:5050/', // e.g. http://localhost:3000
};