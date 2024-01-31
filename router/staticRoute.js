const express = require('express');
const router = express.Router();
const URL = require("../models/url");
const { allowedTo } = require('../middleware/auth');


router.get("/admin", allowedTo(['ADMIN']),async (req, res) => {
    
    const allUrls = await URL.find({})
    return res.render('home', {
        urls: allUrls,
    });
});


router.get("/", allowedTo(['NORMAL','ADMIN']),async (req, res) => {
    
    const allUrls = await URL.find({ createdBy: req.user._id })
    return res.render('home', {
        urls: allUrls,
    });
});

router.get("/signup", (req, res) => {
    return res.render('signup')
})

router.get("/login", (req, res) => {
    return res.render('login')
})
module.exports = router