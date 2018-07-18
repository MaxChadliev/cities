const mongoose  = require('mongoose')
const Schema    = mongoose.Schema;
const City = require('./city');

const userSchema = new Schema ({
    username: String,
    password: String,
    image   : String,
    placesLived: [{type: Schema.Types.ObjectId, ref: 'City'}],
    // will add after person leaves review
    aboutMe: String,
    } ,
    {
        usePushEach: true
    },
    // timestamps is so when you cereate a new one itll show you the time created, when edited it'll show the time edited
    // example: you updated your password in (location) @ (time) yesterday (verification)
    {
        timestamps: true
    }
);

const User = mongoose.model("User", userSchema);


module.exports = User