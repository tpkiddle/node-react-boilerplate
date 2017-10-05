'use strict';

// Allow parsing of JSX files
 require('babel-register')({
   presets: ['react']
 });

/**
 * module dependencies
 */
const express = require('express'),
      favicon = require('serve-favicon'),
      sassMiddleware = require('node-sass-middleware'),
      session = require('express-session'),
      RedisSessionStore = require('connect-redis')(session),
      autoIncrement = require('mongoose-auto-increment'),
      mongoose = require('mongoose'),
      ReactEngine = require('react-engine'),
      bodyParser = require('body-parser'),
      passport = require('passport'),
      flash = require('connect-flash'),
      logger = require('morgan'),
      crypto = require('crypto'),
      path = require('path'),
      fs = require('fs');

/**
 * Utilities
 */
const paths = require('./config/paths'),
      isDevelopment = process.env.NODE_ENV !== 'production';

/**
 * Bootstrap the app
 */
const app = express();

/**
 * Logger service
 */
const LoggerService = require('./services/LoggerService');

/**
 * View engine setup
 * Create an instance of react engine. SEe the complete server options spec here:
 * @link https://github.com/payparl/react-engine#server-options-spec
 */
app.engine('.jsx', ReactEngine.server.create({}));
app.set('views', paths.views);
app.set('view engine', 'jsx');
app.set('view', require('react-engine/lib/expressView'));

/**
* request middleware
*/
app.use(favicon(paths.favicon));

app.use(logger(isDevelopment ? 'dev' : 'common'));

const jsonParser = bodyParser.json({ limit: 1024 * 1024 * 20 });
const urlencodedParser = bodyParser.urlencoded({ extended: true, limit: 1024 * 1024 * 20 });

app.use(jsonParser);
app.use(urlencodedParser);

app.use(
  session({
    store: new RedisSessionStore({
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
      logErrors: true
    }),
    cookie: {
      maxAge: parseInt(process.env.SESSION_COOKIE_MAX_AGE)
    },
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
  })
);
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

/**
 * Require passport entrypoint to load strategies.
 * Could this handeled in a nicer way?
 */
require('./config/passport')();

/**
 * Connect to Mongo DB server
 */
const dbHost = `${process.env.MONGO_HOST}:${process.env.MONGO_PORT}`;

const connection = mongoose.connect(`mongodb://${dbHost}/${process.env.MONGO_DATABASE_NAME}`);
mongoose.Promise = global.Promise;

/**
 * Initialise the auto-increment plugin
 */
autoIncrement.initialize(connection);

/**
 * Automatically compile sass to /public/css/app.css
 */
app.use('/css', sassMiddleware({
  src: paths.sass,
  dest: paths.css,
  outputStyle: 'compressed',
  sourceMap: true,
  debug: isDevelopment
}));

app.use(express.static(paths.public));

/**
 * Add common variables to all routes
 */
app.use(function (req, res, next) {
  res.locals.isDevelopment = isDevelopment;
  res.locals.siteName = process.env.SITE_NAME;
  next();
});

/**
 * Catch authenticated request to login and register routes and redirect to /
 */

app.use(function(req, res, next) {
  if ((req.user && req.path === '/login') || (req.user && req.path === '/signup')) {

    res.redirect('/');
  }

  next();
});

/**
 * Pass the authenticated user and any flash messages to all views
 */
app.use(function(req, res, next) {
  res.locals.user = req.user;
  res.locals.path = req.path;
  res.locals.messages = req.flash('messages');

  return next();
});

/**
 * Auto-load all non order dependent controllers
 */
fs.readdirSync(paths.controllers).forEach(function (file) {

  /**
   * Files denoted with __. at the beginning are
   * considered to be order dependent and will be 
   * loaded manualy below or above with 
   * app.use('/', require(path.join(paths.controllers, '__.profile.js')));
   */

  if (!file.startsWith('__.')) {
    app.use('/', require(path.join(paths.controllers, file)));
  }
});

/**
 * Catch non-matching routes and forward to error handler
 */
app.use(function(req, res, next) {
  res.status(404).render('errors/Http404');
});

/**
 * error handler (prints stack trace in development)
 */
app.use(function(err, req, res, next) {

  const env = process.env.NODE_ENV;
  const debugEnabled = (env === 'development' || env === 'staging');

  res.status(500).render('errors/Http500', {
    debugEnabled: debugEnabled,
    errorMessage: err.message
  });
});


module.exports = app;