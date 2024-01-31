const jwt = require("jsonwebtoken")
const secret="OmkarPatil@14"
// const sessionIdToUserMap = new Map();


function setUser( user) {
    
   
    return jwt.sign({
        _id:user._id,
        email:user.email,
        role:user.role,
    },secret)

}

function getUser(token) {
   
   if(!token) return null;
   try{
    return jwt.verify(token,secret)
   }catch(err){_
    return null;
   }
    
   
}

module.exports = {
    setUser, getUser
}