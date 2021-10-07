const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const path = require('path');
const handleErrors = require('./helpers/handleErrors');
require('./models/User');
require('./models/Story');
require('./models/Yemun');
require('./models/WordPower');

require('./config/passport')(passport);
require('dotenv').config();
//const swaggerJSDoc = require('swagger-jsdoc');
//const swaggerUi = require('swagger-ui-express');

const app = express();
const port = process.env.PORT || 5050;

/*const swaggerDefinition = {
	info: {
		title: 'Interline Reader Swagger API',
		version: '1.0.0',
		description: 'Enpoints to test interline reader'
	},
	host: 'localhost:5050',
	basePath: '/api',
	securityDefinitions: {
		bearerAuth: {
			type: 'apiKey',
			name: 'Authorization',
			scheme: 'bearer',
			in: 'header'
		}
	}
}

const options = {
	swaggerDefinition,
	apis: ['./routes/api/!*.js']
}

const swaggerSpec = swaggerJSDoc(options);

app.get('/swagger.json', function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));*/

const { mongoURI, databaseName } = require('./config/keys');
mongoose
	.connect(mongoURI)
	.then(() => mongoose.connection.useDb(databaseName))
	.catch(err => console.log(err));

const database = require('./database');
database.connect(() => {
    app.listen(5001, function () {
        console.log('351 DB listening to Port 5001');
    });
});

app.use(
	express.urlencoded({ extended: false, limit: '10mb' }),
	express.json({ limit: '10mb' })
);
app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});
app.use(passport.initialize());
app.use('/api/users', require('./routes/api/KORN410/users'));
app.use('/api/about', require('./routes/api/KORN410/about'));
app.use('/api/dashboard', require('./routes/api/KORN410/dashboard'));
app.use('/images', express.static(path.join(__dirname, 'public/images')))
app.use('/api/story', require('./routes/api/KORN410/stories'));
app.use('/api/savedWords', require('./routes/api/KORN410/savedWords'));
app.use('/api/savedGrammars', require('./routes/api/KORN410/savedGrammars'));
app.use('/api/instructor', require("./routes/api/KORN410/instructor"));
app.use('/api/analytics', require("./routes/api/KORN410/analytics"));
app.use('/api/files', require('./routes/api/KORN410/files'));
app.use('/api/okpyeon', require('./routes/api/KORN351/Okpyeon'));
app.use('/api/lesson', require('./routes/api/KORN351/Lessons'));
app.use('/api/instructor351', require('./routes/api/KORN351/Instructor'));
app.use('/api/wordPower', require('./routes/api/KORN351/WordPower'));
app.use(handleErrors);

if (process.env.NODE_ENV === 'production') {
	const path = require('path');
	app.use(express.static('../client/build'));
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}

app.listen(port, () => console.log(`Server running on port ${port}`));
