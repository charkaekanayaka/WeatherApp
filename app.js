const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");


const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req, res){
 res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){
const query = req.body.cityName;
const appKey = "3d7488335a33000243aa1a980b293850";
const unit = "metric";
const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query +"&appid="+ appKey +"&units="

https.get(url, function(response){
  console.log(response.statusCode);

response.on("data", function(data){
   const weatherData = JSON.parse(data)
   const temp = weatherData.main.temp
   const weatherDescription = weatherData.weather[0].description
   const humidity = weatherData.main.humidity
   const pressure = weatherData.main.pressure
   const speed = weatherData.wind.speed
   const icon = weatherData.weather[0].icon;
   const imageURL = "http://openweathermap.org/img/wn/" + icon +"@2x.png"

res.write("<h1>The temperature in " + query + " is - " + temp + " -  degrees Celcius.</h1>");
res.write("<h4>The weather   " + weatherDescription + " currently.</h4>" );
res.write("<h4>The humidity  " + humidity + "% currently.</h4> " );
res.write("<h4>The pressure   " + pressure + " currently.</h4>" );
res.write("<h4>The Wind speed is   " + speed + " currently.</h4>" );
res.write("<img src=" + imageURL + ">" );
res.send()


})

})

})


app.listen(3000, function(){
  console.log("Port 3000 Funtional");

})
