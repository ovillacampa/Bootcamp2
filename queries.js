/* Add all the required libraries*/
var fs = require('fs'),
    mongoose = require('mongoose'), 
    Schema = mongoose.Schema, 
    Listing = require('./ListingSchema.js'), 
    config = require('./config');







/* Connect to your database using mongoose - remember to keep your key secret*/
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect(config.db.uri);


/* Fill out these functions using Mongoose queries*/
//Check out - https://mongoosejs.com/docs/queries.html

var findLibraryWest = function() {
  /* 
    Find the document that contains data corresponding to Library West,
    then log it to the console. 
   */
   
   
   Listing.find( {name: 'Library West' }, function(err, cbWestData){
	   if(err) throw err;
	   if (cbWestData){
		   console.log('\n Library West Found \n');
		   logEntry(cbWestData[0]);
	   }
	   else
	   {
		 		   console.log('\n Library West Not Found \n' ); 
	   }
   });
   
};

var removeCable = function() {
  /*
    Find the document with the code 'CABL'. This cooresponds with courses that can only be viewed 
    on cable TV. Since we live in the 21st century and most courses are now web based, go ahead
    and remove this listing from your database and log the document to the console. 
   */
   
   Listing.findOneAndRemove({code: "CABL"}, function(err, cbCable){
	   if(err) throw err;
	   if (cbCable){
		   console.log('\n Entry Cable Deleted \n');
	   }
	   else
	   {
		 		   console.log('\n Entry Cable not found \n' ); 
	   }
	   
	   
   });
};
var updatePhelpsLab = function() {
  /*
    Phelps Lab address is incorrect. Find the listing, update it, and then 
    log the updated document to the console. 
    
    Correct Address: 1953 Museum Rd, Gainesville, FL 32603

   */
   
const filter = {name : "Phelps Laboratory"};
const update = {address : "1953 Museum Rd, Gainesville, FL 32603"};
const options = {new : true};
   Listing.findOneAndUpdate(filter, update, options, function(err, cbPhelps){
    if(err) throw err;
	   if (cbPhelps){
		   console.log('\n Phelps Updated \n');
		   logEntry(cbPhelps);
	   }
	   else
	   {
		 		   console.log('\n Phelps not found \n' ); 
	   }
});
   
   
   
};
var retrieveAllListings = function() {
  
		Listing.find({}, function(err, cbRetrieve)
		{
			if(err) throw err;
	   if (cbRetrieve){
		   console.log('\n Found all \n');
		   for(var i = 0; i < cbRetrieve.length; i++){
		   logEntry(cbRetrieve[i]);
		   }
	   }
	   else
	   {
		 		   console.log('\n No records retrieved \n' ); 
	   }
			
		});
  
};

var logEntry = function(obj)
{
	
	console.log("\n\ncode : " + obj.code);
	console.log("name : " + obj.name);
	if(obj.coordinates)
	{
		console.log("Latitude : " + obj.coordinates.latitude);
		console.log("Longitude : " + obj.coordinates.longitude);
	}
	if(obj.address)
	{
		console.log("Address : " + obj.address);
	}
	console.log("Created at: " + obj.created_at);
	console.log("Updated at: " + obj.updated_at);
	
	
}
findLibraryWest();
removeCable();
updatePhelpsLab();
retrieveAllListings();
