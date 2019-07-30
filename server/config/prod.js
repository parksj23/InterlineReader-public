/*module.exports = {
  mongoURI: process.env.MONGO_URI,
  secretOrKey: process.env.SECRET_OR_KEY,
  sendGridKey: process.env.SEND_GRID_KEY,
  redirectDomain: process.env.REDIRECT_DOMAIN,
};*/

module.exports = {
//  mongoURI: 'mongodb://ubcreader:britishcolumbia1324!@ds155862.mlab.com:55862/ubcreadertesting',
  secretOrKey: 'secret',
  mongoURI: 'mongodb+srv://ubcreader:britishcolumbia1324!@cluster0-j9y3z.mongodb.net/testdb?retryWrites=true&w=majority',
  sendGridKey: 'YOUR_SENDGRID_KEY',
  mongoAnalyticsURI: 'mongodb://ubcreader:britishcolumbia1324!@ds119014.mlab.com:19014/ubcreader',
  redirectDomain: 'http://127.0.0.1:5050/', // e.g. http://localhost:3000
};
