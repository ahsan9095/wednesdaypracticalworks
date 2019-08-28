var express = require('express');
var app = express();

app.get('/.html', function(req, res){

   res.send(req.body.html);

});

app.get('/', function(req, res){
   res.send(req.params.about.html);
});


 
 var server = app.listen(8081, function () {
 
   console.log("http://127.0.0.1:8081")
})

 