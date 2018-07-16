const mongoose = require('mongoose');
const City = require('../models/city')

// these two need each other
const dbName = 'cities-app';
mongoose.connect(`mongodb://localhost/${dbName}`, {useMongoClient: true});


const cityArray = 
[{
  city: "Miami",
 country: "USA",
 image: "https://www.visitflorida.com/content/dam/visitflorida/en-us/images/cities/miami/Downtown2011_08.jpg.1280.500.rendition",
 shortSummary: "A beautiful city of Latin people",
 averageRent: "$1800",
 averageAirbnb: "$120",
 publicTransportation: "Decent",
 climate: "Tropical",
//  reviews: [{type:String, ref: "Review"}],
}];

// use .create() mongoose method to create entries in DB

City.create(cityArray)
.then(cities =>{
  cities.forEach(oneCity =>{
    console.log('In DB: ', oneCity.city);
  });
  // cut off DB connection
  mongoose.disconnect()
})
.catch(err => console.log('Error while creating seeds: ', err)); 


 
