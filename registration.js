var express = require('express');
var app=express();

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended : true}));
var nodemailer = require('nodemailer');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/regdb', { useNewUrlParser: true });
app.use(express.static('public'));

console.log("connected");

var RegistrationSchema = mongoose.Schema({
    FirstName: String,
    LastName: String,
    Email: String,
    Gender: String,
    Subject: String,
    Comments:String,
    City:String,
});
var Registration = mongoose.model("Registration", RegistrationSchema);

app.get('/', function(request, response) {

	response.sendFile(__dirname + '/registration.html');
});

app.post('/person', function(req,res){ 

    var personInfo = req.body;
    
    console.log(personInfo);
    if(!personInfo.firstName || !personInfo.lastName || !personInfo.email || !personInfo.gender || !personInfo.subject || !personInfo.comments || !personInfo.city ){
        res.send('show_message').send ({
           message: "Sorry, you provided worng info", type: "error"});
     } else {
        var newRegistration = new Registration({

           FirstName: personInfo.firstName,
           LastName:personInfo.lastName,
           Email: personInfo.email,
           Gender: personInfo.gender,
           Subject: personInfo.subject,
           Comments: personInfo.comments,
           City: personInfo.city
    
    
        });
      
        newRegistration.save(function(err, Person){
           if(err)
              res.send('show_message Error Found ').send ({message: "Database error", type: "error"});
           else
           res.send(personInfo);
                 
                 });
     }
    
       
       
       });
    




var server = app.listen(8080, function () {
 
    console.log("http://127.0.0.1:8080")
 })
