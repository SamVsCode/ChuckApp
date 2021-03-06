/**
 * HTTP Server Settings
 * (sails.config.http)
 *
 * Configuration for the underlying HTTP server in Sails.
 * (for additional recommended settings, see `config/env/production.js`)
 *
 * For more information on configuration, check out:
 * https://sailsjs.com/config/http
 */


const passport = require('passport');

module.exports.http = {

  /****************************************************************************
   *                                                                           *
   * Sails/Express middleware to run for every HTTP request.                   *
   * (Only applies to HTTP requests -- not virtual WebSocket requests.)        *
   *                                                                           *
   * https://sailsjs.com/documentation/concepts/middleware                     *
   *                                                                           *
   ****************************************************************************/

  middleware: {

    // Middleware to initialize passportJS
    passportInit: passport.initialize(),
    passportSession: passport.session(),

    // ╔═╗┬ ┬┌─┐┌┬┐┌─┐┌┬┐  ╔╦╗┬┌┬┐┌┬┐┬  ┌─┐┬ ┬┌─┐┬─┐┌─┐┌─┐
    // ║  │ │└─┐ │ │ ││││  ║║║│ ││ │││  ├┤ │││├─┤├┬┘├┤ └─┐
    // ╚═╝└─┘└─┘ ┴ └─┘┴ ┴  ╩ ╩┴─┴┘─┴┘┴─┘└─┘└┴┘┴ ┴┴└─└─┘└─┘


    ResponseLocals: function (req, res, next) {
      // res.locals({User: req.user});
      // (req.user === undefined)? '': console.log(req.user); // dev
      res.locals.User = req.user;
      next();
    },

    //Remove in production mode
    requestLogger: function (req, res, next) {
      console.log("Requested :: ", req.method, req.url);
      return next();
    },




    /***************************************************************************
     *                                                                          *
     * The order in which middleware should be run for HTTP requests.           *
     * (This Sails app's routes are handled by the "router" middleware below.)  *
     *                                                                          *
     ***************************************************************************/

    order: [
      'cookieParser',
      'session',
      'bodyParser',
      'requestLogger',
      'passportInit', // Passport intialization
      'passportSession', // Passport serialization
      'ResponseLocals', // Locals to use in views attached to response
      'compress',
      'poweredBy',
      '$custom',
      'router',
      'www',
      'favicon'
    ],


    /***************************************************************************
     *                                                                          *
     * The body parser that will handle incoming multipart HTTP requests.       *
     *                                                                          *
     * https://sailsjs.com/config/http#?customizing-the-body-parser             *
     *                                                                          *
     ***************************************************************************/

    // bodyParser: (function _configureBodyParser(){
    //   var skipper = require('skipper');
    //   var middlewareFn = skipper({ strict: true });
    //   return middlewareFn;
    // })(),

  },

};
