const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const { connectMongoDb } = require('./connection');
const { restrictToLoggedInUserOnly, checkAuth } = require("./middleware/auth")
const url = require('./models/url');

const urlRoute = require("./router/url")
const staticRoute = require("./router/staticRoute");
const userRoute = require("./router/user");

const app = express();
const PORT = 8001;

connectMongoDb("mongodb://127.0.0.1:27017/short-url").then(() => console.log("MongoDB is connected succesfully"));

app.set("view engine", 'ejs');
app.set('views', path.resolve('./views'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/url", restrictToLoggedInUserOnly, urlRoute);//this is done so that we define the /url by default for every other route and need not to write it in evey other route

app.use("/user", userRoute);
app.use("/", checkAuth, staticRoute);

// app.get("/test", async (req, res) => {
//     const allUrls = await url.find({});
//     return res.render('home', {
//         urls: allUrls
//     });
// })

app.get("/url/:shortId", async (req, res) => {
    const shortId = req.params.shortId;
    // console.log(shortId);
    //this is done so that we find the particular route and update the time of it when it was visited
    const entry = await url.findOneAndUpdate({
        shortId,
    },
        {//this push pushes the timestamp history in the array of at what time the site was visited
            $push: {
                visitHistory: {
                    timeStamp: Date.now()
                }
            }
        });

    if (entry) { res.redirect(entry.redirectUrl) }
})

app.listen(PORT, () => console.log("listening to the port 8001"));