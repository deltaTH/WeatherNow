const express = require("express");
const https = require("https");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
});

app.post("/",function(req,res){
  console.log(req.body.city);
    const query = req.body.city;
    const apiKey = "080a57dc242dca426c7572b04d1512fb";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+unit;

    https.get(url,function(response){
        console.log(response.statuscode);
        response.on("data",function(data){

            const weatherData=JSON.parse(data);
            const temp = weatherData.main.temp
            ;
            const weatherDescription = weatherData.weather[0].description;
            console.log(weatherDescription);

            const icon = weatherData.weather[0].icon;


            res.write("<p>The weather is currently "+weatherDescription+"</p>");
            res.write("<h1>The temperature in "+req.body.city+" is "+temp+" degree celcius</h1>");
            res.write("<img src=https://openweathermap.org/img/wn/"+icon+"@4x.png>");
            res.send();
        })  
    });

});

app.listen(3000,function(){
    console.log("Server started on port 3000");
})