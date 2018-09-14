const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');

const handleErrors = require('./helpers/handleErrors');

require('./models/User');
const app = express();

app.use(
	express.urlencoded({ extended: false, limit: '10mb' }),
	express.json({ limit: '10mb' })
);

const db = require('./config/keys').mongoURI;

mongoose
	.connect(db)
	.then(() => console.log('MongoDB connected'))
	.catch(err => console.log(err));

app.use(passport.initialize());

require('./config/passport')(passport);

app.use('/api/users', require('./routes/api/users'));
app.use('/api/about', require('./routes/api/about'));

app.use(handleErrors);

if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'));

	const path = require('path');
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
