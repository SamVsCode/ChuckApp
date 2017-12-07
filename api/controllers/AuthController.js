/**
 * AuthController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

 const passport = require('passport');

module.exports = {
  
    withFacebook: function(req,res,next){
        passport.authenticate('facebook',{ scope: ['email'],})(req, res, next);
    },
    facebookRedirect: function(req,res,next){
        passport.authenticate('facebook',{
            successRedirect : '/auth/success',
            failureRedirect : '/failure'
          })(req, res,next);
    },
    successRedirect: function(req,res){
        /**
         * Todo: Check if our Social sites Passport returned any email.
         * if no email returned - show a box asking user to enter an email
         * else redirect user to home route 
         */
        
        console.log(req.user);
        res.redirect('/home');
    }

};

