const express = require('express');
const { handleGenerateShortUrl, handleGetAnalytics } = require("../controller/url")

const router = express.Router();

//in these by default routes are starting from /url as we have used it in the index.js file

//we are posting hte route of the link which we wanna shorten
router.post('/', handleGenerateShortUrl);

//we are doing this as we want to know how many clicks are being done on the links and history of the time at the time of clicks
router.get("/analytics/:shortId", handleGetAnalytics)

module.exports = router