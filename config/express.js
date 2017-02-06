import express from 'express';
import logger from 'morgan';
import compression from 'compression';
import path from 'path';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import cors from 'cors';
import favicon from 'serve-favicon';
import methodOverride from 'method-override';
import helmet from 'helmet';
import httpStatus from 'http-status';
import expressJwt from 'express-jwt';
import expressWinston from 'express-winston';
import expressValidation from 'express-validation';
import winstonInstance from './winston';
import routes from '../server/routes/index.route';
import config from './env';
import APIError from '../server/helpers/APIError';

const app = express();

console.log(`env is ${config.env}`);
if (config.env === 'development') {
  app.use(logger('dev'));
}

app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(methodOverride());
app.use(favicon(config.rootPath + '/love.ico'));
// secure apps by setting various HTTP headers
app.use(helmet());

// enable CORS - Cross Origin Resource Sharing
app.use(cors());
app.disable('x-powered-by');
app.use(expressJwt({
  secret: config.jwtSecret,
  getToken (req) {
    if (req.headers.authorization) {
        return req.headers.authorization;
    } else if (req.query && req.query.token) {
      return req.query.token;
    }
    return null;
  }
}).unless({path: [
  '/v1/captcha/image',
  {url: '/v1/auth/random', methods: ['GET']},
  {url: '/v1', methods: ['GET']},
  {url: '/v1/', methods: ['GET']},
  {url: '/v1/auth', methods: ['GET', 'POST']},
  {url: /\/v1\/sms/i, methods: ['GET']}
]}));

// enable detailed API logging in dev env
if (config.env === 'development') {
  expressWinston.requestWhitelist.push('body');
  expressWinston.responseWhitelist.push('body');
  app.use(expressWinston.logger({
    winstonInstance,
    meta: true, // optional: log meta data about request (defaults to true)
    msg: 'HTTP {{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}ms',
    colorStatus: true // Color the status code (default green, 3XX cyan, 4XX yellow, 5XX red).
  }));
}

// mount all routes on /v1 path
app.use('/v1', routes);

// if error is not an instanceOf APIError, convert it.
app.use((err, req, res, next) => {
  if (err instanceof expressValidation.ValidationError) {
    // validation error contains errors which is an array of error each containing message[]
    const unifiedErrorMessage = err.errors.map(error => error.messages.join('. ')).join(' and ');
    const error = new APIError(unifiedErrorMessage, err.status, true);
    return next(error);
  } else if (!(err instanceof APIError)) {
    const apiError = new APIError(err.message, err.status, err.isPublic);
    return next(apiError);
  }
  return next(err);
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new APIError('API not found', httpStatus.NOT_FOUND);
  return next(err);
});

// log error in winston transports except when executing test suite
if (config.env !== 'test') {
  app.use(expressWinston.errorLogger({
    winstonInstance
  }));
}

// error handler, send stacktrace only during development
app.use((err, req, res, next) => // eslint-disable-line no-unused-vars
  res.status(err.status).json({
    message: err.isPublic ? err.message : httpStatus[err.status],
    stack: config.env === 'development' ? err.stack : {}
  })
);

export default app;
