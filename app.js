const express = require('express');
const morgan = require('morgan');
const path = require('path');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');
const ErrorHandler = require('./utils/errorHandler');

const app = express();
const port = 3000;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

require('./config/global.config');

app.use(rateLimit({
    windowMs: 1000,
    max: 1,
    handler: function(req, res, next) {
        next(new TooManyRequestError('Too many requests, please try again later.'));
    }
}));

app.use(morgan('dev'));
app.use(cookieParser());

require('./routes')(app);

app.all('*', ( req, res, next ) => {
    next(new NotFoundError());
});

app.use((err, req, res, next) => {
    err.httpCode = err.httpCode || 500;
    console.log(err.stack)
    return res.status(err.httpCode).json({
        status: err.httpCode,
        message: err.message
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

process.on('unhandledRejection', (err) => {
    console.log('unhandledRejection');
    throw err
});

process.on('uncaughtException', (err) => {
    console.log('uncaughtException');
    ErrorHandler.handleError(err);

    if(!ErrorHandler.isTrustedError(err)) {
        console.log('isNotTrustedError');
        process.exit(1);
    }
});