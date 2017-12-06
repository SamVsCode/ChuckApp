/**
 * AuthController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

 const passport = require('passport');

module.exports = {
  
    withFacebook: function(req,res,next){
        passport.authenticate('facebook',{scope : 'email'})(req, res, next);
    },
    facebookRedirect: function(req,res,next){
        passport.authenticate('facebook',{
            successRedirect : '/',
            failureRedirect : '/failure'
          })(req, res,next);
    }

};

