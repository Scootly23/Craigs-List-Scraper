//------------- Edit personal preferences here -----------------//
var phone = "5550123"
var provider = "@vtext.com" //Verizon
// var provider = "@txt.att.net" //At&t
// var provider = "@tmomail.net" //Tmobile
// var provider = "@messaging.sprintpcs.com" //Sprint
//https://en.wikipedia.org/wiki/SMS_gateway


//Copy url from CL search and add '&format=rss' at the end
var queryStringUrl = [
    "https://minneapolis.craigslist.org/search/apa?query=loft&availabilityMode=0&format=rss",
    "https://minneapolis.craigslist.org/search/apa?query=warehouse&availabilityMode=0&format=rss",
    "https://minneapolis.craigslist.org/search/apa?query=industrial&availabilityMode=0&format=rss",
    "https://minneapolis.craigslist.org/search/apa?search_distance=5&postal=55344&max_price=1000&availabilityMode=0&sale_date=all+dates&format=rss"
];
//--------------------------------------------------------------//

var fs = require('fs');
var Bitly = require('bitly');
var bitly = new Bitly('a6c9f2f63d29924f2d49e8e1da050aeaaaaae42f');
var https = require('https');
var parseString = require('xml2js').parseString;
var nodemailer = require('nodemailer');
var firebase = require('firebase');
var testXML;
  var config = {
    apiKey: "AIzaSyBWK8eQRMEY8u7vtQC0GQ7Vg0yYItHrJg8",
    authDomain: "craigslist-scraper-2963c.firebaseapp.com",
    databaseURL: "https://craigslist-scraper-2963c.firebaseio.com",
    projectId: "craigslist-scraper-2963c",
    storageBucket: "craigslist-scraper-2963c.appspot.com",
    messagingSenderId: "343457473285"
  };
  firebase.initializeApp(config);
  var rootRef = firebase.database().ref();
 

    findNew = function(data){
        var items = data['rdf:RDF']['item'];
        var add = true;
        rootRef.child('oldPosts').once('value',function(snap){

            for(var x = 0;x<items.length;x++){
                var item = items[x];
                var itemUid = item['dc:source'].toString().substring(42).replace('.html','');
                var itemTitle = item['title'].toString().replace('&#x0024;','$');
                snap.forEach(function(childSnap){
                    var title = childSnap.val().title || null;
                    var uid = childSnap.val().uid || childSnap.val();
                    if(uid == itemUid || title == itemTitle){
                        add = false
                    }
                });
        if(add){
            rootRef.child('oldPosts').push({uid:itemUid,title:itemTitle});
            console.log('new listing found, Sending. . . ');
            sendNotification(item);
        }
        else{add = true;}
            }
        });
        }
        clearData = function(){
        rootRef.child('oldPosts').set({});

    }
  sendNotification = function(item){
      var shortUrl;
    //   console.log(item['dc:source'].toString().replace('https','http'));
    //   bitly.shorten(encodeURI(item['dc:source'].toString())).then(function(res){
    //       shortUrl = res.data.url;
    //       var message  = 'NEW LISTING\n'+item['title'].toString().replace('&#x0024;','$');
    //       if(message.length > 200){
    //           console.log(message)
    //           message = message.substring(0,200);
    //           message+'...';
    //       }
        message = item['dc:source'].toString();
        let transporter = nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                    user: 'clscraper12345@gmail.com',
                    pass: 'P@SSW0rD1234'
                }
            });

            let mailOptions = {
                from: "CL", // sender address
                to: phone+provider, // list of receivers
                text:  message,// plain text body // html body
            };
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return console.log(error);
                }
                console.log('Message %s sent: %s', info.messageId, info.response);
            });
  }
callback = function(response) {
  var str = '';
  response.on('data', function (chunk) {
    str += chunk;
  });

  response.on('end', function () {
    parseResponse(str);
  });
}

var parseResponse = function(xml){
    var x, i, xmlDoc, txt;
    xmlDoc = xml;
    txt = [];
    parseString(xml, function(err,result){
        findNew(result);
    });
}
var init = function(url){
    https.get(url, callback);
    setTimeout(()=>{init(url)},1800000);
}
queryStringUrl.forEach((url)=>{
    init(url);
});
//clearData();


