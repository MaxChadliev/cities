const mongoose  = require('mongoose')
const Schema    = mongoose.Schema;


const userSchema = new Schema ({
    username: String,
    password: String,
    img: String,
    placesLived: [],
    // will add after person leaves review
    
    aboutMe: String,
    } ,
    // timestamps is so when you cereate a new one itll show you the time created, when edited it'll show the time edited
    // example: you updated your password in (location) @ (time) yesterday (verification)
    {timestamps: true}
  
);

const User = mongoose.model("User", userSchema);


module.exports = User