var express = require("express");
var path = require("path");

var routes = require("./routes");

var app = express();


// Variables que usa la api para validar que somos nosotros como empresa
var redirect_uri ="https://demo-transmit.herokuapp.com/home";
var clientID = "ea854282.0bee69f4.tid_671f9079.bindid.io";
var clientSecret = "911f24e5-5141-40b4-9ffb-115b04f48f00";


app.set("port", process.env.PORT || 5000);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(routes);
app.use("/static",express.static("static"));


app.listen(app.get("port"), function(){
    console.log("Server started on port " + app.get("port"));
})
