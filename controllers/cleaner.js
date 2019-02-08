const path = require("path");

exports.serveLogo = async(req, res) => {
  res.setHeader('Content-Type', 'image/svg+xml');
  res.sendFile(path.join(__dirname, "../public/images/ILReader_Logo.svg"));
}