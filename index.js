var express = require('express');
var path = require('path');
var app = express();
var child = require('child_process');

child.fork('./craigslistScraper.js')

app.use(express.static(path.join(__dirname, 'public')));

app.get('/captain',function(req,res){
    res.send("Ey, ey. Message recieved, captain!");
});

app.listen(2580,function(){
    console.log("Now listening on port: 2580");
})