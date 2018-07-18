const mongoose = require("mongoose");
const Schema   = mongoose.Schema;
const Review = require('./review')


const citySchema = new Schema({
  image: String,
 city: String,
 country: String,
 population: String,
 shortSummary: String,
 averageRent: String,
 averageAirbnb: String,
 climate: String,
 reviews: [{type: Schema.Types.ObjectId, ref: "Review"}],
},
{
  usePushEach: true
});

const City = mongoose.model("City", citySchema);



module.exports = City;