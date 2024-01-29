const shortid = require('shortid');
const URL = require("../models/url");
const url = require('../models/url');


//we have cretaed this function in order to push the url and link it with the sortId which we just have generated for every other url which we wanna shorten
async function handleGenerateShortUrl(req, res) {
    const body = req.body;
    if (!body.url) { return res.status(400).json({ error: "URL is required" }) }
    const shortId = shortid();
    await url.create({
        shortId: shortId,
        redirectUrl: body.url,
        visitHistory: [],
        createdBy: req.user._id,
    })

    return res.render("home", {
        id: shortId,
    })
    //return res.json({ id: shortId })
}

//in this function we first get the shortId as a oaram and then after finding it in our db we put the res as our json file to display the time and number of clicks
async function handleGetAnalytics(req, res) {
    const shortId = req.params.shortId;
    const result = await url.findOne({ shortId },)
    return res.json({ totalCLicks: result.visitHistory.length, analytics: result.visitHistory })
}

module.exports = {
    handleGenerateShortUrl,
    handleGetAnalytics
}