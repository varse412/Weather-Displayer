const { response } = require("express");
const express=require("express");
const app=express();
const https=require("https");
const bodyParser=require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));
const { url } = require("inspector");
app.get("/",function(req,res){
   res.sendFile(__dirname+"/index.html");
   console.log("respondes to request");
});
//catch using post
app.post("/",function(req,res){
   console.log(req.body.cityName);
   
const apiKey="449157c9f1dacb4891f0f0a4c5fe4094";
const tempScale="metric";
const query=req.body.cityName;
const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&units="+tempScale+"&appid="+apiKey;
https.get(url,function(response){
    console.log(response.statusCode);
    response.on('data',function(data){
       
        const weatherData=JSON.parse(data);
        const weatherDescription=weatherData.weather[0].description;
        const temp=weatherData.main.temp;
        const icon=weatherData.weather[0].icon;
        const imageURL="http://openweathermap.org/img/w/" + icon + ".png";
        
        res.write("<p>Weather is currently : "+weatherDescription+"</p>")
        res.write("<h1>The current temperature in "+query +" is "+temp+" Degree Celsius</h1>");
        res.write("<img src="+imageURL+">")
        res.send();
    });
});
  
});




app.listen(3000,function(){
    console.log("Server started on port 3000");
});