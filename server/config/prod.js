/*module.exports = {
  mongoURI: process.env.MONGO_URI,
  secretOrKey: process.env.SECRET_OR_KEY,
  sendGridKey: process.env.SEND_GRID_KEY,
  redirectDomain: process.env.REDIRECT_DOMAIN,
};*/

//Actual prod environment - DON"T DELETE
/*module.exports = {
  mongoURI: 'mongodb+srv://ubcreader:britishcolumbia1324!@cluster0-j9y3z.mongodb.net/InterlineReaderDB?retryWrites=true&w=majority',
  secretOrKey: 'secret',
  sendGridKey: 'YOUR_SENDGRID_KEY',
  mongoAnalyticsURI: 'mongodb://ubcreader:britishcolumbia1324!@ds119014.mlab.com:19014/ubcreader',
  redirectDomain: 'http://127.0.0.1:5050/',
  databaseName: 'InterlineReaderDB'
};*/

//FOR v1.5
module.exports = {
  mongoURI: 'mongodb+srv://ubcreader:britishcolumbia1324!@korn410.bqxsd.mongodb.net/InterlineReaderKorn351DB?retryWrites=true&w=majority',
  secretOrKey: 'secret',
  sendGridKey: 'YOUR_SENDGRID_KEY',
  redirectDomain: 'http://127.0.0.1:5050/', // e.g. http://localhost:3000
  mongoAnalyticsURI: 'mongodb://ubcreader:britishcolumbia1324!@ds119014.mlab.com:19014/ubcreader',
  databaseName: 'InterlineReaderKorn351DB'
};