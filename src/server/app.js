// Requires
const express = require('express');
const mongoose = require('mongoose');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const config = require('config');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

// Express instance
const app = express();

// Built in express parser
app.use(express.json());

// DB Config
const db = config.get('mongoURI');

// Connect to DB (Mongo)
mongoose
	.connect(db, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useUnifiedTopology: true
	})
	.then(() => console.log('MongoDB Connected...'))
	.catch(err => console.log(err));

// Use Routes
app.use('/api/books', require('./routes/api/books'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));

// Port for DB
const port = process.env.PORT || 3002;
app.listen(port, () => console.log(`Server started on ${port}`));

app.use(express.static(path.join(__dirname, '../..', 'build')));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/users', usersRouter);

// app.get('/*', (req, res, next) => {
//   res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });

module.exports = app;
