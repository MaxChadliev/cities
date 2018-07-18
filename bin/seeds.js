const mongoose = require('mongoose');
const City = require('../models/city')

// these two need each other
const dbName = 'cities-app';
mongoose.connect(`mongodb://localhost/${dbName}`, {useMongoClient: true});


const cityArray = 
[{
  image: "https://www.visitflorida.com/content/dam/visitflorida/en-us/images/cities/miami/Downtown2011_08.jpg.1280.500.rendition",
  city: "Miami",
 country: "USA",
 population: "5,500,000",
 shortSummary: "Miami is located on the Atlantic coast of Florida at the southern tip and is one of the most popular cities visited by tourists from around the world.",
 averageRent: "$1900 per month",
 averageAirbnb: "$120 per night",
 climate: "Tropical Monsoon",
//  reviews: [{type:String, ref: "Review"}],
},

{
  image: "https://www.airfrance.fr/FR/common/common/img/tbaf/news/LED/48-heures-chrono-a-saint-petersbourg/LED-48-heures-chrono-a-saint-petersbourg-2_1-1024x512.jpg",
  city: "Saint Petersburg",
 country: "Russia",
 population: "6,200,000",
 shortSummary: "A major historical and cultural centre and an important port, St. Petersburg lies about 400 miles (640 km) northwest of Moscow and only about 7° south of the Arctic Circle. It is the second largest city of Russia and one of the world’s major cities. ",
 averageRent: "$700 per month",
 averageAirbnb: "$50 per night",
 climate: "Freezing winters and pleasantly warm summers",
//  reviews: [{type:String, ref: "Review"}],
},

{
  image: "https://www.themasculinetraveler.com/wp-content/uploads/2018/05/Bangkok-Thailand2.jpg",
  city: "Bangkok",
 country: "Thailand",
 population: "14,600,000",
 shortSummary: "Bangkok, Thai Krung Thep, city, capital, and chief port of Thailand. It is the only cosmopolitan city in a country of small towns and villages and is Thailand’s cultural and commercial centre.",
 averageRent: "$800 per month",
 averageAirbnb: "$50 per night",
 climate: "Tropical savanna",
//  reviews: [{type:String, ref: "Review"}],
},

{
  image: "https://brightcove04pmdo-a.akamaihd.net/5104226627001/5104226627001_5515999951001_5214933106001-vs.jpg?pubId=5104226627001&videoId=5214933106001",
  city: "Budapest",
 country: "Hungary",
 population: "3,300,000",
 shortSummary: "Often described as the 'Little Paris of Middle Europe', Budapest is famous not only for the monuments reflecting its own 1,000-year-old culture, but also for the relics of others who settled here.",
 averageRent: "$1200 per month",
 averageAirbnb: "$75 per night",
 climate: "Humid continental",
//  reviews: [{type:String, ref: "Review"}],
},

{
  image: "http://geohistory.today/wp-content/uploads/2017/09/Kiev2-777x437.jpg",
  city: "Kiev",
 country: "Ukraine",
 population: "3,500,000",
 shortSummary: "Kiev is the largest cultural, scientific and industrial center of Ukraine, the place of religious pilgrimage and a very attractive tourist destination.",
 averageRent: "$550 per month",
 averageAirbnb: "$40 per night",
 climate: "Humid continental",
//  reviews: [{type:String, ref: "Review"}],
},

{
  image: "https://photos.mandarinoriental.com/is/image/MandarinOriental/new-york-2017-columbus-circle-01?wid=2880&hei=1280&fmt=jpeg&crop=6,1064,4928,2190&anchor=2032,2134&qlt=75,0&op_sharpen=0&resMode=sharp2&op_usm=0,0,0,0&iccEmbed=0&printRes=72&fit=crop",
  city: "New York City",
 country: "USA",
 population: "20,300,000",
 shortSummary: "New York City is in reality a collection of many neighbourhoods scattered among the city's five boroughs—Manhattan, Brooklyn, the Bronx, Queens, and Staten Island—each exhibiting its own lifestyle.",
 averageRent: "$2800 per month",
 averageAirbnb: "$105 per night",
 climate: "Humid subtropical",
//  reviews: [{type:String, ref: "Review"}],
},



{
  image: "https://lonelyplanetimages.imgix.net/a/g/hi/t/4c410251e0146b2edd2b8b1d64a02047-buenos-aires.jpg?sharp=10&vib=20&w=1200",
  city: "Buenos Aires",
 country: "Argentina",
 population: "13,600,000",
 shortSummary: " Buenos Aires is one of Latin America’s most important ports and most populous cities, as well as the national centre of commerce, industry, politics, culture, and technology.",
 averageRent: "$360 per month",
 averageAirbnb: "$35 per night",
 climate: "Humid subtropical",
//  reviews: [{type:String, ref: "Review"}],
},


{
  image: "https://www.barcelona.com/ticketbar/static/Barcelonacom/Classifications/discount-cards/barcelona-card-/BARCELONA-CARD-LONG-1514886363-1518689120.jpg",
  city: "Barcelona",
 country: "Spain",
 population: "5,500,000",
 shortSummary: "Barcelona is an enchanting seaside city with boundless culture, fabled architecture and a world-class drinking and dining scene.",
 averageRent: "$1100 per month",
 averageAirbnb: "$65 per night",
 climate: "Mediterranean",
//  reviews: [{type:String, ref: "Review"}],
}



];

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


 
