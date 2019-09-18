'use strict';

/*

Import modules/files you may need to correctly run the script.

Make sure to save your DB's uri in the config file, then import it with a require statement!

*/

	var fs = require('fs'),
    mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    Listing = require('./ListingSchema.js'),
    config = require('./config');

 

/* Connect to your database using mongoose - remember to keep your key secret*/

//see https://mongoosejs.com/docs/connections.html

//See https://docs.atlas.mongodb.com/driver-connection/

 

mongoose.set('useUnifiedTopology', true);

mongoose.set('useNewUrlParser', true);

mongoose.connect(config.db.uri);

 

 

/*

Instantiate a mongoose model for each listing object in the JSON file,

and then save it to your Mongo database

//see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach


*/

 

//Read File

var err, listingData;

 

var readJson = function (path, cb) {

    fs.readFile(require.resolve(path), 'utf8', function (err, data) {

        if (err)

        cb(err)

        else

                                                listingData = JSON.parse(data);

            cb(null, listingData);

    })

}

function loadJSONData () {

    readJson('./listings.json', function (err, data ){

                    data.entries.forEach(function (entry,i){

//console.log(entry.name);

 

            if (entry.coordinates && entry.address) {

                var newDocument = new Listing ({

                    code: entry.code,

                    name: entry.name,

                    coordinates: {

                        latitude: entry.coordinates.latitude,

                        longitude: entry.coordinates.longitude

                    },

                    address: entry.address

                });

            }

            else if (entry.coordinates) {

                var newDocument = new Listing({

                    code: entry.code,

                    name: entry.name,

                    coordinates: {

                        latitude: entry.coordinates.latitude,

                        longitude: entry.coordinates.longitude

                    }

                });

            }

            else if (entry.address) {

                var newDocument = new Listing ({

                    code: entry.code,

                    name: entry.name,

                    address: entry.address

                });

            }

            else {

                var newDocument = new Listing ({

                    code: entry.code,

                    name: entry.name

                })

            }

            newDocument.save();

                                               

        });

 

 

  console.log('Done');

    });

};

 

loadJSONData();