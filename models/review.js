const mongoose = require("mongoose");
const Schema   = mongoose.Schema;



const reviewSchema = new Schema({
  reviewer: [{type:String,  ref: "User"}],
  livedVisited: {type: String, required: true},
  food: [String],
  sights: [String],
  nightlife: [String],
  social: [String],
  comments: String,

});

const Review = mongoose.model("Review", reviewSchema);



module.exports = Review;