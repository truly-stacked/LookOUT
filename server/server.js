const express = require('express');
const morgan = require ('morgan');
const bodyParser = require('body-parser');
const keys = require('../config/keys.js');
const request = require ('request');

const app = express();


//++++ init
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(express.static('./client'));

//++++ routes

//Return an object that contains all events. 
app.get('/results', function (req, res){
  
  let eventsObj = [];
  let eventObj = {};

  request('https://www.eventbriteapi.com/v3/events/search/?token='+keys.oAuthKey+'&location.latitude=40.7831&location.longitude=-73.9712&expand=venue,category', function(err, body){
 	if(err) {
 		console.log('YOU FAILED', err);
 	} else {
 	  let eventbriteObj = JSON.parse(body.body).events;
 	    		
 	   eventbriteObj.forEach(function (event){
 
 	   	// eventObj.id = event.id;
 	   	// eventObj.name = event.name.text;
 	   	// eventObj.time = event.start.utc;
 	   	// eventObj.catName = event.category.name;
 	    // eventObj.cardImage = event.logo.url;
 	   	eventObj.ogImage = typeof (event.logo.original.url);
 	   	// eventObj.venue = event.venue.name;
 	   	// eventObj.venueAddress = event.venue.address.localized_address_display;
 	   	// eventObj.description = event.description.text;

 	   	eventsObj.push(eventObj);
 	   });

 	   console.log(eventsObj.length);

 	}

  });
});





app.get('/filtered', function (req, res){


});

app.get('/event', function (req, res){

});
//console.log(window.oAuthKey);




app.listen(process.env.port||8888);
