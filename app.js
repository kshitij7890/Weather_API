const express = require("express");
const https=require("https");
const bodyparser=require("body-parser");

const app=express();
app.use(bodyparser.urlencoded({extended:true}));


app.get("/",function(req,res){
  res.sendFile(__dirname + "/index.html");
});

app.post("/",function(req,res){
  //console.log(req.body.cityname);
  const query=req.body.cityname;
  const apikey="81f1b6726a54d969aae0ae1fe42b1095";
  const unit="metric";
  const url="https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid="+ apikey +"&units="+unit;

  https.get(url,function(response){
   console.log(response.statusCode);

   response.on("data",function(data){
     const weatherdata=JSON.parse(data);
     const temp=weatherdata.main.temp;
     const weatherdescription=weatherdata.weather[0].description;
     const icon=weatherdata.weather[0].icon;
     var imageURL="http://openweathermap.org/img/wn/" + icon + "@2x.png"
     //console.log(weatherdescription);
     res.write("<p>the weather is currently : " + weatherdescription + "</p>");
     res.write("<h1>The temperature in "+query+" is " + temp + " degrees celsius </h1>");
     res.write("<img src="+imageURL+">");
     res.send();
   });
  });
});





app.listen(3000,function(){
  console.log("server on port 3000 has started");
});
