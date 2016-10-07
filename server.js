// Pasha Pourmand
// Sep 27 2016

// for testing
var test = false;

// requirements
var express = require('express');
var app = express();
var router = express.Router();
var request = require('request');
var secretKey = 'lolcakes';
var satelize = require('satelize');
var publicIp = require('public-ip');
var ejs = require('ejs');
var http = require('http');

// global variables
var userip;
var userLatitude = '37.3537';
var userLongitude = '-122.0307';
var dailyWeatherObject;
var location;

// set the view engine to ejs
app.set('view engine', 'ejs');

// Initially fill out the API for long/lat defaults
//callWeatherAPI();
// var dt = new Date();
// console.log("Begin Interval: " + dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds());
callWeatherAPI();
setInterval(callWeatherAPI, 180000);



// static files
app.use(express.static('static'));


// since this is single page application, everything goes here
app.get('/', function (req, res) {
  if(test){
    userip = '50.131.201.19';
  }
  else{
    userip = req.headers["x-forwarded-for"];
      if (userip){
        var list = userip.split(",");
        userip = list[list.length-1];
      } else {
        userip = req.connection.remoteAddress;
      }

    userip = userip + '';
  }

  //console.log(req.ip);
  satelize.satelize({ip:userip}, function(err, payload) {
    userLatitude = payload['latitude'];
    userLongitude = payload['longitude'];
  });


  // for testing purposes, just call once
  // TEST DATA
  if(test){
    dailyWeatherObject = [{ time: 1475132400,
       summary: 'Mostly cloudy in the morning.',
       icon: 'partly-cloudy-night',
       sunriseTime: 1475157812,
       sunsetTime: 1475200522,
       moonPhase: 0.96,
       precipIntensity: 0,
       precipIntensityMax: 0,
       precipProbability: 0,
       temperatureMin: 54.79,
       temperatureMinTime: 1475215200,
       temperatureMax: 77.51,
       temperatureMaxTime: 1475186400,
       apparentTemperatureMin: 54.79,
       apparentTemperatureMinTime: 1475215200,
       apparentTemperatureMax: 77.51,
       apparentTemperatureMaxTime: 1475186400,
       dewPoint: 53.58,
       humidity: 0.73,
       windSpeed: 3.37,
       windBearing: 313,
       visibility: 9.66,
       cloudCover: 0.38,
       pressure: 1016.94,
       ozone: 288.5 },
     { time: 1475218800,
       summary: 'Mostly cloudy in the morning.',
       icon: 'partly-cloudy-night',
       sunriseTime: 1475244263,
       sunsetTime: 1475286831,
       moonPhase: 0.99,
       precipIntensity: 0,
       precipIntensityMax: 0,
       precipProbability: 0,
       temperatureMin: 49.87,
       temperatureMinTime: 1475236800,
       temperatureMax: 72.2,
       temperatureMaxTime: 1475272800,
       apparentTemperatureMin: 48.35,
       apparentTemperatureMinTime: 1475236800,
       apparentTemperatureMax: 72.2,
       apparentTemperatureMaxTime: 1475272800,
       dewPoint: 48.04,
       humidity: 0.71,
       windSpeed: 7.29,
       windBearing: 306,
       visibility: 9.73,
       cloudCover: 0.39,
       pressure: 1018.97,
       ozone: 293.37 },
     { time: 1475305200,
       summary: 'Mostly cloudy in the morning.',
       icon: 'partly-cloudy-night',
       sunriseTime: 1475330714,
       sunsetTime: 1475373140,
       moonPhase: 0.03,
       precipIntensity: 0,
       precipIntensityMax: 0,
       precipProbability: 0,
       temperatureMin: 48.92,
       temperatureMinTime: 1475323200,
       temperatureMax: 73.53,
       temperatureMaxTime: 1475359200,
       apparentTemperatureMin: 46.35,
       apparentTemperatureMinTime: 1475323200,
       apparentTemperatureMax: 73.53,
       apparentTemperatureMaxTime: 1475359200,
       dewPoint: 49.99,
       humidity: 0.77,
       windSpeed: 7.67,
       windBearing: 314,
       visibility: 9.96,
       cloudCover: 0.37,
       pressure: 1019.18,
       ozone: 304.2 },
     { time: 1475391600,
       summary: 'Drizzle starting in the afternoon, continuing until evening.',
       icon: 'rain',
       sunriseTime: 1475417166,
       sunsetTime: 1475459449,
       moonPhase: 0.06,
       precipIntensity: 0.0028,
       precipIntensityMax: 0.0091,
       precipIntensityMaxTime: 1475452800,
       precipProbability: 0.39,
       precipType: 'rain',
       temperatureMin: 48.17,
       temperatureMinTime: 1475409600,
       temperatureMax: 68.53,
       temperatureMaxTime: 1475442000,
       apparentTemperatureMin: 46.94,
       apparentTemperatureMinTime: 1475409600,
       apparentTemperatureMax: 68.53,
       apparentTemperatureMaxTime: 1475442000,
       dewPoint: 51.08,
       humidity: 0.82,
       windSpeed: 6.16,
       windBearing: 276,
       visibility: 9.81,
       cloudCover: 0.54,
       pressure: 1016.72,
       ozone: 321.84 },
     { time: 1475478000,
       summary: 'Partly cloudy starting in the afternoon.',
       icon: 'partly-cloudy-night',
       sunriseTime: 1475503618,
       sunsetTime: 1475545758,
       moonPhase: 0.09,
       precipIntensity: 0.0014,
       precipIntensityMax: 0.002,
       precipIntensityMaxTime: 1475506800,
       precipProbability: 0.04,
       precipType: 'rain',
       temperatureMin: 42.6,
       temperatureMinTime: 1475496000,
       temperatureMax: 71.42,
       temperatureMaxTime: 1475535600,
       apparentTemperatureMin: 42.6,
       apparentTemperatureMinTime: 1475496000,
       apparentTemperatureMax: 71.42,
       apparentTemperatureMaxTime: 1475535600,
       dewPoint: 45.77,
       humidity: 0.71,
       windSpeed: 5.06,
       windBearing: 285,
       cloudCover: 0.18,
       pressure: 1017.42,
       ozone: 308.2 },
     { time: 1475564400,
       summary: 'Partly cloudy in the morning.',
       icon: 'partly-cloudy-day',
       sunriseTime: 1475590070,
       sunsetTime: 1475632069,
       moonPhase: 0.12,
       precipIntensity: 0,
       precipIntensityMax: 0,
       precipProbability: 0,
       temperatureMin: 50.5,
       temperatureMinTime: 1475582400,
       temperatureMax: 75.65,
       temperatureMaxTime: 1475622000,
       apparentTemperatureMin: 50.5,
       apparentTemperatureMinTime: 1475582400,
       apparentTemperatureMax: 75.65,
       apparentTemperatureMaxTime: 1475622000,
       dewPoint: 52.79,
       humidity: 0.76,
       windSpeed: 3.31,
       windBearing: 268,
       cloudCover: 0.26,
       pressure: 1018.11,
       ozone: 274.75 },
     { time: 1475650800,
       summary: 'Clear throughout the day.',
       icon: 'clear-day',
       sunriseTime: 1475676522,
       sunsetTime: 1475718379,
       moonPhase: 0.15,
       precipIntensity: 0,
       precipIntensityMax: 0,
       precipProbability: 0,
       temperatureMin: 47.02,
       temperatureMinTime: 1475668800,
       temperatureMax: 81.97,
       temperatureMaxTime: 1475704800,
       apparentTemperatureMin: 47.02,
       apparentTemperatureMinTime: 1475668800,
       apparentTemperatureMax: 81.18,
       apparentTemperatureMaxTime: 1475704800,
       dewPoint: 50.13,
       humidity: 0.67,
       windSpeed: 3.55,
       windBearing: 295,
       cloudCover: 0.09,
       pressure: 1017.07,
       ozone: 281.71 },
     { time: 1475737200,
       summary: 'Mostly cloudy until afternoon.',
       icon: 'partly-cloudy-day',
       sunriseTime: 1475762975,
       sunsetTime: 1475804690,
       moonPhase: 0.18,
       precipIntensity: 0,
       precipIntensityMax: 0,
       precipProbability: 0,
       temperatureMin: 49.88,
       temperatureMinTime: 1475755200,
       temperatureMax: 85.87,
       temperatureMaxTime: 1475791200,
       apparentTemperatureMin: 49.88,
       apparentTemperatureMinTime: 1475755200,
       apparentTemperatureMax: 83.81,
       apparentTemperatureMaxTime: 1475791200,
       dewPoint: 48.82,
       humidity: 0.58,
       windSpeed: 3.47,
       windBearing: 278,
       cloudCover: 0.31,
       pressure: 1014.47,
       ozone: 289.05 }]
  }
  // else{
  //   callWeatherAPI();
  // }

  // loop through daily objects
  var sevenDays = [];
  var sevenDayIcons = [];
  var sevenDaySummaries = [];
  var sevenDayMinTemp = [];
  var sevenDayMaxTemp = [];
  var sevenDayChanceOfRain = [];

  for(var i = 0; i < dailyWeatherObject.length; i++){
    var dt = new Date(dailyWeatherObject[i]['time'] * 1000);
    var icons = dailyWeatherObject[i]['icon'];

    var dmy = (dt.getMonth() + 1) + '/' + dt.getDate();// + '/' + dt.getFullYear();
    sevenDays.push(dmy);
    sevenDayIcons.push(icons);
    sevenDaySummaries.push(dailyWeatherObject[i]['summary']);
    sevenDayMinTemp.push(dailyWeatherObject[i]['apparentTemperatureMin']);
    sevenDayMaxTemp.push(dailyWeatherObject[i]['apparentTemperatureMax']);
    sevenDayChanceOfRain.push(Math.floor(dailyWeatherObject[i]['precipProbability'] * 100));
  }

  sevenDayIcons = convertIconPack(sevenDayIcons);

  res.render('index', {
        days: sevenDays,
        icons: sevenDayIcons,
        summary: sevenDaySummaries,
        mins: sevenDayMinTemp,
        maxes: sevenDayMaxTemp,
        rain: sevenDayChanceOfRain,
    });
});

function callWeatherAPI(){
  var dt = new Date();
  console.log("Called the API at: " + dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds());

  request({
    url: 'https://api.darksky.net/forecast/' + secretKey + '/' + userLatitude + ',' + userLongitude, //URL to hit
    method: 'GET', //Specify the method
  }, function(error, response, body){
    if(error) {
        console.log("error!!" + error);
    } else {
        var weatherData = JSON.parse(body);
        dailyWeatherObject = weatherData['daily']['data'];
        //console.log(dailyWeatherObject);
        // options: clear-day, clear-night, rain, snow, sleet, wind, fog, cloudy, partly-cloudy-day, or partly-cloudy-night
    }
});
}

function convertIconPack(icons){
  //console.log(icons);

  for(var i = 0; i < icons.length; i++){
    if(icons[i] === 'clear-day'){
      icons[i] = 'wi wi-day-sunny';
    }
    else if(icons[i] === 'clear-night'){
      icons[i] = 'wi wi-night-clear';
    }
    else if(icons[i] === 'rain'){
      icons[i] = 'wi wi-day-rain';
    }
    else if(icons[i] === 'snow'){
      icons[i] = 'wi wi-day-snow'
    }
    else if(icons[i] === 'sleet'){
      icons[i] = 'wi wi-day-sleet';
    }
    else if(icons[i] === 'wind'){
      icons[i] = 'wi wi-day-windy';
    }
    else if(icons[i] === 'fog'){
      icons[i] = 'wi wi-day-fog';
    }
    else if(icons[i] === 'cloudy'){
      icons[i] = 'wi wi-day-cloudy';
    }
    else if(icons[i] === 'partly-cloudy-day'){
      icons[i] = 'wi wi-day-sunny-overcast';
    }
    else if(icons[i] === 'partly-cloudy-night'){
      icons[i] = 'wi wi-night-partly-cloudy';
    }
    else if(icons[i] === 'rain'){
      icons[i] = 'wi wi-night-rain';
    }
    else if(icons[i] === 'snow'){
      icons[i] = 'wi wi-night-snow'
    }
    else if(icons[i] === 'sleet'){
      icons[i] = 'wi wi-night-sleet';
    }
    else if(icons[i] === 'wind'){
      icons[i] = 'wi wi-night-alt-cloudy-gusts';
    }
    else if(icons[i] === 'fog'){
      icons[i] = 'wi wi-night-fog';
    }
    else if(icons[i] === 'cloudy'){
      icons[i] = 'wi wi-night-alt-cloudy';
    }
  }

  return icons;
}

app.listen(process.env.PORT || 3000, function () {
  //console.log('App listening on port 3000!');
});
