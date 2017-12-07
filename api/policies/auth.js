module.exports = function auth(req,res,next){
    if(!req.user){
        return '/?isLoggedIn=false'
    }else{
        next();
    }
}