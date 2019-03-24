// Initialize app
var myApp = new Framework7();


// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {
    // Because we want to use dynamic navbar, we need to enable it for this view:
    dynamicNavbar: true
});

// Handle Cordova Device Ready Event
$$(document).on('deviceready', function() {
    console.log("Device is ready!");
});


// Now we need to run the code that will be executed only for About page.

// Option 1. Using page callback for page (for "about" page in this case) (recommended way):
myApp.onPageInit('about', function (page) {
    // Do something here for "about" page

})

// Option 2. Using one 'pageInit' event handler for all pages:
$$(document).on('pageInit', function (e) {
    // Get page data from event data
    var page = e.detail.page;

    if (page.name === 'about') {
        // Following code will be executed for page with data-page attribute equal to "about"
        myApp.alert('Here comes About page');
    }
})

// Option 2. Using live 'pageInit' event handlers for each page
$$(document).on('pageInit', '.page[data-page="about"]', function (e) {
    // Following code will be executed for page with data-page attribute equal to "about"
    myApp.alert('Here comes About page');
})


Latitude=51.507351;
Longitude=-0.127758;

// geoLocation function
function geoLocation(){
   
    navigator.geolocation.getCurrentPosition(geoCallback, onError)
       

}


// onSuccess Callback
    //   This method accepts a `Position` object, which contains
    //   the current GPS coordinates
    //
    function geoCallback(position) {
        console.log(position);
        var element = document.getElementById('geolocation');
        element.innerHTML = 'Latitude: '  + position.coords.latitude      + '<br />' +
                            'Longitude: ' + position.coords.longitude     + '<br />' +
                            '<hr />'      + element.innerHTML;
                            // pass the location to opencage
                            
                           Latitude =position.coords.latitude;
                           Longitude =position.coords.longitude;
                            console.log(Latitude);
                            console.log(Longitude);
                             
                            
    }
 
    // onError Callback receives a PositionError object
    //
    function onError(error) {
        alert('code: '    + error.code    + '\n' +
              'message: ' + error.message + '\n');
        console.log(error);
    }
 
    // Options: throw an error if no update is received every 30 seconds.
    //
   // var watchID = navigator.geolocation.watchPosition(onSuccess, onError, { timeout: 30000 });


   

   function openCage(){
    
    console.log(Latitude , Longitude);
    // The XMLHttpRequest object, is the one in 
    // charge of handleing the request for us
    var http = new XMLHttpRequest();

    // The url to send the request to. Notice that we're passing
    // here some value of Latituted and longitude for the API 
    // to process   47.499663, 19.075570
    const url = 'https://api.opencagedata.com/geocode/v1/json?q=51.507351+-0.127758&key=a36ac62bfab44ff09eb13691ba88ea47';
    //const url = 'https://api.opencagedata.com/geocode/v1/json?q=Latitude+Longitude&key=a36ac62bfab44ff09eb13691ba88ea47';
    console.log(Latitude , Longitude);
    // Opening the request. Remember, we will send
    // a "GET" request to the URL define above
    http.open("GET", url);
    // Sending the request
    http.send();

    // Once the request has been processed and we have
    // and answer, we can do something with it
    http.onreadystatechange = (e) => {
        
        // First, I'm extracting the reponse from the 
        // http object in text format
        var response = http.responseText;

        // As we know that answer is a JSON object,
        // we can parse it and handle it as such
        var responseJSON = JSON.parse(response); 
    
        // Printing the result JSON to the console
        console.log(responseJSON);

        // Extracting the individual values, just as we
        // do with any JSON object. Just as we did 
        // with the position.
        // REMEMBER: In this case, we have an array inside 
        // the JSON object.
        var city = responseJSON.results[0].components.city;
        var country = responseJSON.results[0].components.country;
        var currency = responseJSON.results[0].annotations.currency.name;

        // Formattng data to put it on the front end
        var oc = "City: " + city + "<br>Country: " + country + "<br>Currency: " + currency;

        // Placing formatted data on the front ed
        document.getElementById('opencage').innerHTML = oc;
    }
    
}



function getTime(){
  
    //alert('Hello');
    var d = new Date();
    document.getElementById("demo").innerHTML = d;
    console.log(d);
}
// weater simple

$(document).ready(function() {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(weather);
	} else {
		alert("Geolocation isn't supported!");
	}
});

function weather(position) {
	var lat = position.coords.latitude;
	var lon = position.coords.longitude;
	var apiKey = "13d492da3b2ecaeb186f71c0c80ff9ec";
	url =
		"https://api.darksky.net/forecast/" +
		apiKey +
		"/" +
		lat +
		"," +
		lon +
		"?exclude=alerts,hourly,alerts,flags";
	//Call DarkSky and pull current weather
	$.ajax({
		url: url,
		dataType: "jsonp",
		success: function(forecast) {
			
			var fTemp = forecast.currently.temperature;
			
			var currentTemp = fTemp;
			var cTemp = Math.floor((fTemp - 32) * 5 / 9);
			
			$("#temp").html('<h2 style = "float: right">' + currentTemp + "</h2>");
			$("#far").addClass("active");
			celConvert(cTemp, currentTemp, fTemp);
			farConvert(cTemp, currentTemp, fTemp);
			
			//Skycons
			var iconRequest = forecast.currently.icon;
			
			var icons = new Skycons({'color' : '#eeeeee'});
			
			var iconList = [
				"clear-day",
				"clear-night",
				"partly-cloudy-day",
				"partly-cloudy-night",
				"cloudy",
				"rain",
				"sleet",
				"snow",
				"wind",
				"fog"
			];		
			console.log(icons);
			for (i = 0; i < iconList.length; i++) {
				if (iconRequest == iconList[i]) {
						icons.set('icon', iconList[i]);
					
				}
			}
			icons.play();
		}
	});
	GoogleMaps(lat, lon);
}

function GoogleMaps(latitude, longitude) {
	$.get(
		"https://maps.googleapis.com/maps/api/geocode/json?latlng=" +
			latitude +
			"," +
			longitude +
			"&key=AIzaSyAW0tnVQ4-ezK2M9Lq-CDhFWJFn8-JuyCQ&result_type=locality|administrative_area_level_1",
		function(json) {
			var address_comp = json.results[0].address_components;
			var city = "";
			var state = "";

			address_comp.forEach(function(loc) {
				var type = loc.types;
				if (type.indexOf("locality") != -1) {
					city = loc.long_name;
				} else if (type.indexOf("administrative_area_level_1") != -1) {
					state = loc.short_name;
				}
			});
			address = city + ", " + state;
			$("#address").html('<h3 class = "text-center">' + address + "</h3>");
		}
	);
}

function celConvert(cTemp, currentTemp, fTemp) {
	$("#cel").click(function() {
		currentTemp = cTemp;
		$("#temp").html('<h2 style = "float: right">' + currentTemp + "</h2>");
		$("#far").removeClass("active");
		$("#cel").addClass("active");
	});
}

function farConvert(cTemp, currentTemp, fTemp) {
	$("#far").click(function() {
		currentTemp = fTemp;
		$("#temp").html('<h2 style = "float: right">' + currentTemp + "</h2>");
		$("#cel").removeClass("active");
		$("#far").addClass("active");
	});
}

//                    WEATER   java   


  
$(document).ready(function() {
    
    
    $('.fahrenheit').hide();
    $("#todayF").hide();
    $("#tomorrowF").hide();
    $("#afterTomorrowF").hide();
    $("#afterAfterTomorrowF").hide();
    var latitude;
    var longitude;
  
    if (navigator.geolocation) {
  
      navigator.geolocation.getCurrentPosition(function(location) {
        latitude = location.coords.latitude;
        longitude = location.coords.longitude;
        console.log(latitude + " " + longitude);
  
        //var geolocation = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + latitude + '%2C' + longitude + '&language=en';
        var geolocation = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyApFPNQ2WxbEueUXMJBPHjLenlPnFo68ls/geocode/json?latlng=' + latitude + '%2C' + longitude + '&language=en';
        // https://maps.googleapis.com/maps/api/js?key=AIzaSyApFPNQ2WxbEueUXMJBPHjLenlPnFo68ls
  
      
     setTimeout(function(){
          $('div').removeClass('loader');
      }, 1500);     
        
        $.getJSON(geolocation).done(function(location) {
          console.log(location);
          //var latitude = location.results[0].geometry.location["lat"];
          // var longitude = location.results[0].geometry.location["lng"];
          //console.log("City: " + location.results[0].address_components[1].long_name);
          //console.log("Country: " + location.results[0].address_components[3].long_name);
          //var location = location.results[0].address_components[1].long_name + ", " + location.results[0].address_components[3].long_name;
          var location = location.results[0];
          $("#location").html(location);
  
        })
  
        var url = "https://api.darksky.net/forecast/3ad7f8e54c6fdcafbe0dfa539a9ae18c/" + latitude + "," + longitude + "?callback=?&units=si";
  
        $.getJSON(url, function(data) {
          console.log(data);
  
          var temp = data.currently.temperature;
          var fahrenheit = (data.currently.temperature * 9 / 5 + 32).toFixed(1) + "&deg;F";
          var celsius = data.currently.temperature.toFixed(1) + "&deg;C";
          var description = data.currently.summary;
          var icon = "wi wi-forecast-io-" + data.currently.icon;
          var wind = " " + data.currently.windSpeed.toFixed(1) + " m/s ";
          var humidity = " " + (data.currently.humidity * 100).toFixed(0) + " %";
          
          //bloody timeout so you can see the loading bars
          setTimeout(function() {
            $("#icon").html("<i class=\"" + icon + "\">");
            $("#description").html(description);
            $("#humidity").html(humidity);
            $("#wind").html(wind);
            $(".celsius").html(celsius);
            $(".fahrenheit").html(fahrenheit);
  
          //today forecast in C
          var todayMaxTemp = data.daily.data[0].temperatureMax.toFixed(0);
          var todayMinTemp = data.daily.data[0].temperatureMin.toFixed(0);
          var todayIcon = "wi wi-forecast-io-" + data.daily.data[0].icon;
          $("#todayC").html("<br>"+ todayMinTemp + "&deg;/"+ todayMaxTemp +"&deg; <br> <i class=\"" + todayIcon + "\" id=\"smallIcon\">");
          //today forecast in F 
          
          var todayMaxTemp = (data.daily.data[0].temperatureMax *9/5+32).toFixed(0);
          var todayMinTemp = (data.daily.data[0].temperatureMin *9/5+32).toFixed(0);
          var todayIcon = "wi wi-forecast-io-" + data.daily.data[0].icon;
          $("#todayF").html("<br>"+ todayMinTemp + "&deg;/"+ todayMaxTemp +"&deg; <br> <i class=\"" + todayIcon + "\" id=\"smallIcon\">");
          
          
          //tomorrow forecast in C
          var tomorrowMaxTemp = data.daily.data[1].temperatureMax.toFixed(0);
          var tomorrowMinTemp = data.daily.data[1].temperatureMin.toFixed(0);
          var tomorrowIcon = "wi wi-forecast-io-" + data.daily.data[1].icon;
          $("#tomorrowC").html("<br>"+ tomorrowMinTemp + "&deg;/"+ tomorrowMaxTemp +"&deg; <br> <i class=\"" + tomorrowIcon + "\" id=\"smallIcon\">");
          //tomorrow forecast in F
          
          var tomorrowMaxTemp = (data.daily.data[1].temperatureMax *9/5+32).toFixed(0);
          var tomorrowMinTemp = (data.daily.data[1].temperatureMin *9/5+32).toFixed(0);
          var tomorrowIcon = "wi wi-forecast-io-" + data.daily.data[1].icon;
          $("#tomorrowF").html("<br>"+ tomorrowMinTemp + "&deg;/"+ tomorrowMaxTemp +"&deg; <br> <i class=\"" + tomorrowIcon + "\" id=\"smallIcon\">");
          

          //after tomorrow forecast in C
          var afterTomorrowMaxTemp = data.daily.data[2].temperatureMax.toFixed(0);
          var afterTomorrowMinTemp = data.daily.data[2].temperatureMin.toFixed(0);
          var afterTomorrowIcon = "wi wi-forecast-io-" + data.daily.data[2].icon;
          $("#afterTomorrowC").html("<br>"+ afterTomorrowMinTemp + "&deg;/"+ afterTomorrowMaxTemp +"&deg; <br> <i class=\"" + afterTomorrowIcon + "\" id=\"smallIcon\">");
          //after tomorrow forecast in F
          
          var afterTomorrowMaxTemp = (data.daily.data[2].temperatureMax *9/5+32).toFixed(0);
          var afterTomorrowMinTemp = (data.daily.data[2].temperatureMin *9/5+32).toFixed(0);
          var afterTomorrowIcon = "wi wi-forecast-io-" + data.daily.data[2].icon;
          $("#afterTomorrowF").html("<br>"+ afterTomorrowMinTemp + "&deg;/"+ afterTomorrowMaxTemp +"&deg; <br> <i class=\"" + afterTomorrowIcon + "\" id=\"smallIcon\">");
          
          
          //after after tomorrow forecast in C :))
          var afterAfterTomorrowMaxTemp = data.daily.data[3].temperatureMax.toFixed(0);
          var afterAfterTomorrowMinTemp = data.daily.data[3].temperatureMin.toFixed(0);
          var afterAfterTomorrowIcon = "wi wi-forecast-io-" + data.daily.data[3].icon;
          $("#afterAfterTomorrowC").html("<br>"+ afterAfterTomorrowMinTemp + "&deg;/"+ afterAfterTomorrowMaxTemp +"&deg; <br> <i class=\"" + afterAfterTomorrowIcon + "\" id=\"smallIcon\">");
          //after after tomorrow forecast in F :))
          
          var afterAfterTomorrowMaxTemp = (data.daily.data[3].temperatureMax *9/5+32).toFixed(0);
          var afterAfterTomorrowMinTemp = (data.daily.data[3].temperatureMin *9/5+32).toFixed(0);
          var afterAfterTomorrowIcon = "wi wi-forecast-io-" + data.daily.data[3].icon;
          $("#afterAfterTomorrowF").html("<br>"+ afterAfterTomorrowMinTemp + "&deg;/"+ afterAfterTomorrowMaxTemp +"&deg; <br> <i class=\"" + afterAfterTomorrowIcon + "\" id=\"smallIcon\">");
          
          
           }, 2200);   // end of timeout 
  
          //temp toggle 
          $(".fahrenheit-btn").on("click", function() {
            $(".celsius").hide();
            $("#todayC").hide();
            $("#tomorrowC").hide();
            $("#afterTomorrowC").hide();
            $("#afterAfterTomorrowC").hide();
            $(".fahrenheit").show(fahrenheit);
            $("#todayF").show();
            $("#tomorrowF").show();
            $("#afterTomorrowF").show();
            $("#afterAfterTomorrowF").show();
          });
          $(".celsius-btn").on("click", function() {
            $(".fahrenheit").hide();
            $("#todayF").hide();
            $("#tomorrowF").hide();
            $("#afterTomorrowF").hide();
            $("#afterAfterTomorrowF").hide();
            $(".celsius").show(celsius);
            $("#todayC").show();
            $("#tomorrowC").show();
            $("#afterTomorrowC").show();
            $("#afterAfterTomorrowC").show();
          });
  
          //  end of temp toggle  
        });
  
      });
    } else {
      alert("We couldn` retrieve your location, please check your location settings");
    };
  
   
    //date //
    var months = new Array(12);
    months[0] = "January";
    months[1] = "February";
    months[2] = "March";
    months[3] = "April";
    months[4] = "May";
    months[5] = "June";
    months[6] = "July";
    months[7] = "August";
    months[8] = "September";
    months[9] = "October";
    months[10] = "November";
    months[11] = "December";
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth(); //January is 0!
    var yyyy = today.getFullYear();
  
    if (dd < 10) {
      dd = '0' + dd
    }
  
    today = dd + '. ' + months[mm] + ', ' + yyyy;
    $(".date").html(today);
    //end date
  
   
  
  });