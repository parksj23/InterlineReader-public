const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const path = require('path')

const handleErrors = require('./helpers/handleErrors');

require('./models/User');
require('./models/Story');
const app = express();

app.use(
	express.urlencoded({ extended: false, limit: '10mb' }),
	express.json({ limit: '10mb' })
);
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const db = require('./config/keys').mongoURI;

mongoose
	.connect(db)
	.then(() => console.log('MongoDB connected'))
	.catch(err => console.log(err));

app.use(passport.initialize());

require('./config/passport')(passport);

app.use('/api/users', require('./routes/api/users'));
app.use('/api/about', require('./routes/api/about'));
app.use('/api/dashboard', require('./routes/api/dashboard'));
app.use('/images', express.static(path.join(__dirname, 'public/images')))
app.use('/api/stories', require('./routes/api/stories'));

app.use(handleErrors);

if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'));

	const path = require('path');
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}

const port = process.env.PORT || 5050;

app.listen(port, () => console.log(`Server running on port ${port}`));
