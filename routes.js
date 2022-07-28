var express = require("express");

var router = express.Router();


router.get("/", function(req, res) {
   // console.log("hello I'm on the start page");
res.render("index");
});


router.get("/home", function(req, res) {
   // console.log("hello I'm on the start page");
res.render("home");
});


module.exports = router;