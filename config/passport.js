var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var jwt = require('jsonwebtoken');


/**
 * Passport Strategy for Facebook
 */

module.exports.passport = function () {
  /**
   * Passport specific Calls for serialization of user into session
   * todo: Add JWT authentication system instead of pure session store
   */
  passport.serializeUser(function (user, done) {
    console.log(user.id);
    done(null, user.id);
  });

  passport.deserializeUser(function (uid, done) {
    (async function () {
      try {
        var current_user = await User.findOne({
          id: uid
        });
        if(current_user) done(null, current_user);
      } catch (e) {
        done(e, null);
      }
    }());
  });

  var FACEBOOK_STRATEGY_CONFIG = {
    clientID: sails.config.keys.facebook.app_id,
    clientSecret: sails.config.keys.facebook.app_secret,
    callbackURL: 'http://localhost:1337/auth/facebook/redirect',
    profileFields: ['id', 'picture.type(large)', 'name', 'displayName', 'gender', 'profileUrl', 'email']
  };

  function attachToken(user,done){
    var userdata = {
      id: user.id
    }
    var token = jwt.sign(userdata,sails.config.keys.jwt.secret,{
      expiresIn: 60*60*24*365
    });
    done(null,user,token);
  }
  function onFacebookStrategyAuth(token, refreshToken, profile, done) {
    /**
     * passport callback after authentication complete and returns profile. 
     * This step is executed after /auth/facebook/redirect route is complete 
     */
    // Check if user already exist

    (async function () {
      try {
        var current_user = await User.findOne({
          facebook_id: profile.id
        });
        if (current_user) {
          attachToken(current_user,done);
        } else {
          // Save new user
          console.log("Profile:", profile);
          var data = {};
          data.name = profile._json.name;
          data.email = profile._json.email;
          data.gender = profile._json.gender;
          data.profileUrl = profile.profileUrl;
          data.avatar = profile.photos[0].value;
          data.thumb = profile._json.picture.data.url;

          if (profile.provider === "facebook")
            data.facebook_id = profile._json.id;
          else if (profile.provider === "google")
            data.google_id = profile._json.id;

          data.provider = profile.provider;
          try {
            var new_user = await User.create(data).fetch();
            console.log("_______________________");
            console.log(new_user);
            if (new_user) attachToken(new_user,done);
            else console.log("no record found!!");
          } catch (err) {
            done(err, null)
          }
        }
      } catch (e) {
        done(e, null);
      }
    }());
  }
  passport.use(new FacebookStrategy(FACEBOOK_STRATEGY_CONFIG, onFacebookStrategyAuth));
}
