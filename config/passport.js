var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;


/**
 * Passport specific Calls for serialization of user into session
 * todo: Add JWT authentication system instead of pure session store
 */
passport.serializeUser(function (user, done) {
    done(null, user);
});
   
passport.deserializeUser(function (id, done) {
      done(null, id);
});


/**
 * Passport Strategy for Facebook
 */

var FACEBOOK_STRATEGY_CONFIG = {
  clientID        : process.env.facebook.app_id,
  clientSecret    : process.env.facebook.app_secret,
  callbackURL     :'http://localhost:1337/auth/facebook/redirect',
  profileFields: ['id', 'displayName', 'photos', 'email']
};
function onFacebookStrategyAuth(token, refreshToken, profile, done){
/**
 * passport callback after authentication complete and returns profile. 
 * This step is executed after /auth/facebook/redirect route is complete 
 */
    console.log(profile);
    done(null,profile);
}
passport.use(new FacebookStrategy(FACEBOOK_STRATEGY_CONFIG, onFacebookStrategyAuth));


/**
 * Passport Strategy for Google
 */