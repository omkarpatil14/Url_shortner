
const User = require('../models/user')
const { setUser, getUser } = require("../service/auth")

async function handleUserSignUp(req, res) {
    const { name, email, password } = req.body;
    
  const existedUser= await User.findOne({name,email,password})

    if(existedUser){
        return res.redirect("/login")
    }else{
        await User.create({
            name,
            email,
            password,
        })
        return res.redirect("/login");
    }

  
}

async function handleUserSignIn(req, res) {
    const { email, password } = req.body;
   
    const user = await User.findOne({
        email:email,
        password:password
    })
    
    if (!user) {
        return res.render('login', {
            error: "lavde tu hai kon ?"
        });
    }
   
    const token = setUser( user);
    res.cookie("uid", token)
    return res.redirect("/");
}

module.exports = { handleUserSignUp, handleUserSignIn }