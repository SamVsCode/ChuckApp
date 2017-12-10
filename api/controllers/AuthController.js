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
            failureRedirect : '/failure',
            successRedirect: '/auth/success'
          },(err,user,info)=>{
              if(err) return res.negotiate(err);
              if(!user) return res.redirect('/auth/facebook');
              return res.redirect(`/auth/success?accessToken=${info}`);
          })(req, res,next);
    },
    successRedirect: function(req,res){
        /**
         * Todo: Check if our Social sites Passport returned any email.
         * if no email returned - show a box asking user to enter an email
         * else redirect user to home route 
         *  {REMEMBER TO PASS "accessToken" WITH ALL REDIRECTES UNTIL YOU GET TO FINAL HOME ROUTE}
         */

        return res.view('pages/authsuccess',{auth: true, accessToken: req.query.accessToken});
    }

};

