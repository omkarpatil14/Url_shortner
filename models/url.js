const mongoose = require('mongoose');

const URLScheme = new mongoose.Schema({
    shortId: {
        type: String,
        required: true,
        unique: true,
    },
    redirectUrl: {
        type: String,
        required: true
    },
    visitHistory: [{
        timeStamp: {
            type: Number,
        },
    }],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
    }

}, {
    timestamps: true
});

const url = mongoose.model('url', URLScheme);

module.exports = url;