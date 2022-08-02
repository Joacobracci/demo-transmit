var express = require("express");
var path = require("path");
var routes = require("./routes");
var XMLHttpRequest = require('xhr2');

var app = express();


var redirect_uri ="http://localhost:5000/home";
var clientID = "ea854282.0bee69f4.tid_671f9079.bindid.io";
var clientSecret = "911f24e5-5141-40b4-9ffb-115b04f48f00";


app.set("port", process.env.PORT || 5000);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(routes);
app.use("/static",express.static("static"));
app.use(express.json());

app.post("/auth", function (req,res){
    console.log(req.body.code)
    code = req.body.code


    const XHR = new XMLHttpRequest();
    XHR.open("POST", "https://demo.bindid-sandbox.io/demo-token-exchange", true);
    XHR.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    XHR.send(JSON.stringify({
        "grant_type": "authorization_code",
        "code": code,
        "redirect_uri": redirect_uri,
        "client_id": clientID,
        "client_secret": clientSecret
    }
    
));
    


    
})

app.listen(app.get("port"), function(){
    console.log("Server started on port " + app.get("port"));
})


