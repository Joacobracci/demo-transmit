var express = require("express");
var path = require("path");
var routes = require("./routes");
var XMLHttpRequest = require('xhr2');

var fecth = require("node-fetch")

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



fetch("https://demo.bindid-sandbox.io/demo-token-exchange", {

  "headers": {
    "accept": "application/json, text/plain, */*",
    "accept-language": "es-419,es;q=0.9",
    "content-type": "application/x-www-form-urlencoded",
    "sec-ch-ua": "\".Not/A)Brand\";v=\"99\", \"Google Chrome\";v=\"103\", \"Chromium\";v=\"103\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "Referer": "https://demo.bindid-sandbox.io/_complete?code=o4V6CFTpvzG_47Cz9_f606LDtrMA_np5ARQOQeDfHVo&state=152042878",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": "grant_type=authorization_code&code=o4V6CFTpvzG_47Cz9_f606LDtrMA_np5ARQOQeDfHVo&redirect_uri=https://demo.bindid-sandbox.io/_complete/acme&client_id=bid_demo_acme&client_secret=demo-client-secret",
  "method": "POST"
}); ;
    


    
})

app.listen(app.get("port"), function(){
    console.log("Server started on port " + app.get("port"));
})


