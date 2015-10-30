// web.js
var express = require("express");
var logfmt = require("logfmt");
var bodyParser = require("body-parser");
var fs = require("fs");
var app = express();

try {
  var data = JSON.parse(fs.readFileSync("data.json", "utf8"));
} catch(e) {
  var data = {}
}

app.use(bodyParser());

app.get('/', function(req, res) {
	res.sendFile("index.html", {root : __dirname});
});

app.get('/CFA', function(req, res) {
  res.sendFile("cfa.html", {root : __dirname});
});

app.get('/Baker', function(req, res) {
  res.sendFile("baker.html", {root : __dirname});
});

app.get('/Wean', function(req, res) {
  res.sendFile("wean.html", {root : __dirname});
});

app.get('/Hunt', function(req, res) {
  res.sendFile("hunt.html", {root : __dirname});
});

app.get('/Cyert', function(req, res) {
  res.sendFile("cyert.html", {root : __dirname});
});

app.get("/data", function(req, res){
  res.json(data);
});

app.post("/data", function(req,res){
  var name = req.body.name;
  if (name !== "blank") {
    data[name] = {}
    data[name].date = new Date();
    data[name].andrew = data.user.andrew
  }
  res.send("Update complete");
  fs.writeFileSync("data.json", JSON.stringify(data));
});

app.post("/andrew", function(req,res){
  data.user = {
    andrew: req.body.andrew,
    date: new Date()
  }
  res.send("Login complete");
  fs.writeFileSync("data.json", JSON.stringify(data));
});

var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
  console.log("Listening on " + port);
});