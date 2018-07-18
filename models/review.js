const mongoose = require("mongoose");
const Schema   = mongoose.Schema;



const reviewSchema = new Schema({
  reviewer: {type:Schema.Types.ObjectId,  ref: "User"},
  lived: {type: Boolean, required: true},
  rating: [String],
  food: [String],
  sights: [String],
  nightlife: [String],
  comments: String,
},
{
  usePushEach: true
});

const Review = mongoose.model("Review", reviewSchema);



module.exports = Review;