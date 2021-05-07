// app crashed, I really couldn't find out why...

// step 1. $ npm init
// or $ npm init -y to agree with default settings
// step 2. $ npm i express

// step 3. require Express module
const express = require("express");
// step 9. https is a native module, we don't need to install first, just use it directly
const https = require("https");

// step 4. initialize a new Express app
const app = express();

// step 23. (actually the bodyParser has been depricated before now 07 May 2021)
const bodyParser = require("body-parser");

// step 24.
// app.use(bodyParser.urlencoded({extended:true}))
// see solution here https://stackoverflow.com/questions/66525078/bodyparser-is-deprecated
app.use(express.urlencoded({ extended: true }));
// after the above step then we're able to work on the app.post()
app.use(express.json()); // To parse the incoming requests with JSON payloads

// step 6. add app.get()
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

// step x. replace step 7, make a get request to the OpenWeatherMap's server

// step 5. at the very bottm do the app.listen and add the callback function

// step 21. app.post() after creating the Form in html
// step 22. in order to get the posted data, need to install $ npm i body-parser
app.post("/", function (req, res) {
  // step 25. req.body.cityName01 to clg the text that went into that input
  // step 28. delete the line below
  // console.log(req.body.cityName01);
  // step 26. paste back the codes below
  // step 7. res.send simply "server is up and running"
  // step 10. before sending the res, use the https module and call the get method. the get method needs an url that works. make sure to incl the https://
  // instead of stacking lots inside the get(), we put the url inside a constant and use it inside the get()
  //step 16. start to break down the url
  // step 27. change the previous const query = "London" to
  //const query = "London";
  const query = "req.body.cityName01";
  //step 17. delete the Taipei from
  /* const url ="https://api.openweathermap.org/data/2.5/weather?q=Taipei&appid=5858e1316c782a51f6b2c1610a09a510&units=metric#"; */
  //step 18. take out the appID 5858e1316c782a51f6b2c1610a09a510, and put it to const apiKey
  const apiKey = "5858e1316c782a51f6b2c1610a09a510";
  //step 19. do the same for the Units
  //step 20. work on index.html
  //step 21. replace everything inside get() with html
  const unit = "metric";
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    query +
    "&appid=" +
    apiKey +
    "&units=" +
    unit;

  https.get(url, function (response) {
    //console.log(response.statusCode);
    //step 11.the on() method to tap into a spicific moment, eg when we receive data
    response.on("data", function (data) {
      const weatherData = JSON.parse(data);
      // how to get a spicific piece of data
      const temp = weatherData.main.temp;
      const cityName = weatherData.name;
      const weatherDescription = weatherData.weather[0].description;
      //step 14. add icon
      const icon = weatherData.weather[0].icon;
      const imageURL ="https://openweathermap.org/img/wn/" + icon + "@2x.png";

      // step 12. start the process to put the spicific data to our website
      /* res.send(
        "<h1>The temperature in " +
          cityName +
          " is " +
          temp +
          " °C. Currently the weather is " +
          weatherDescription +
          ".</h1>" 
      );
      */
      //step 15. use res.write() for multiple items we can't use res.send()
      res.write(
        "<h1> The temperature in " +
          query +
          " is " +
          temp +
          " degrees Celsius. The weather currently has " +
          weatherDescription +
          "</h1>"
      );

      //not sure why but image causes error!
      res.write("<img src=" + imageURL + ">");
      
      res.send();
    });
  });
  //step 13. delete the res.send() below cuz each app.get can only contain 1x res.send()
  //res.send("Server is up and running");
});

app.listen(3000, function () {
  console.log("Server is running on port 3000.");
});

//step 8. $ nodemon app.js
