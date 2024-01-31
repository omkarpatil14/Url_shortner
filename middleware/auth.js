const { getUser } = require('../service/auth')


function checkForAuthentication(req,res,next){
    const  tokenCookie = req.cookies?.uid;
    
    req.user = null;
    
    if(!tokenCookie) return next();

    const token = tokenCookie;
    const user = getUser(token);
   
    req.user = user;
   
    return next()
}
//ADMIN , NORMAL
function allowedTo(roles=[]){
    return function (req,res,next){
        if(!req.user) {
            console.log("error at restrictTo");
            return res.redirect("/login"); 
        }
  
        console.log(req.user);
        if(!roles.includes(req.user.role)) return res.end("unathorised");
        return next();
    }

}


module.exports = {
    allowedTo,
    checkForAuthentication
}