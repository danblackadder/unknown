const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

// authentication
const passport = require('passport');

// uploads
const bodyParser = require('body-parser');

// routes
const users = require('./routes/authentication/user');
const projects = require('./routes/task/project');
const tasks = require('./routes/task/task');

dotenv.config();

mongoose.connect(
	`mongodb://localhost:27017/${process.env.DB}`,
	{ useNewUrlParser: true },
).then(
	() => {
		console.log('Database is connected');
	},
	err => {
		console.log('Can not connect to the database: ' + err);
	},
);

const app = express();

app.use(passport.initialize());
require('./helpers/authentication/passport')(passport);

app.use(
	bodyParser.urlencoded({
		parameterLimit: '50000',
		limit: '500mb',
		extended: false,
	}),
);
app.use(bodyParser.json({ parameterLimit: '50000', limit: '500mb' }));

app.use('/api/users', users);
app.use('/api/projects', projects);
app.use('/api/tasks', tasks);

app.use('/api-docs', express.static(path.join(__dirname, '/documentation/')));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
	console.log(`Server is running on PORT: ${PORT}`);
	console.log(`Documentation available on: http://localhost:${PORT}/api-docs`);
});