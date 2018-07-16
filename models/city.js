const mongoose = require("mongoose");
const Schema   = mongoose.Schema;
const Review = require('./review')


const citySchema = new Schema({
 city: String,
 country: String,
 image: String,
 shortSummary: String,
 averageRent: String,
 averageAirbnb: String,
 publicTransportation: String,
 climate: String,
 reviews: [{type:String, ref: "Review"}],

});

const City = mongoose.model("City", citySchema);



module.exports = City;