var express = require('express');
var app=express();

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended : true}));
var nodemailer = require('nodemailer');
app.use(express.static('public'));


var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mydb', { useNewUrlParser: true });

console.log("connected");

var personSchema = mongoose.Schema({
  name: String,
  email: String,
  phone: Number,
  web:String,
  Subject:String,
  Message:String
});
var Person = mongoose.model("Person", personSchema);


 app.get('/', function(request, response) {

	response.sendFile(__dirname + '/form.html');
});

 app.post('/person', function(req,res){ 

  var personInfo = req.body; 

  
   
   
   var emailMessage = `Name: ${personInfo.name},\n\nEmail: ${personInfo.email}\n\nPhoneNo: ${personInfo.phone}\n\nWebsite: ${personInfo.web}\n\nSubject: ${personInfo.Subject}\n\nMessage:${personInfo.Message}`;
   
   
     
   var transporter = nodemailer.createTransport({
     service: 'gmail',
     auth: {
       user: 'ahsan50414@gmail.com',
       pass: 'ayyaz786'
     }
   });
   
   var mailOptions = {
     from: 'ahsan50414@gmail.com',
     to: personInfo.email,
     subject: 'Sending Email using Node.js',
     text: emailMessage
   };
   
   transporter.sendMail(mailOptions, function(error, info){
     if (error) {
       console.log(error);
     } else {
       console.log('Email sent: ' + info.response);
   
     }
   });
   if(!personInfo.name || !personInfo.email || !personInfo.phone || !personInfo.web || !personInfo.Subject || !personInfo.Message ){
    res.send('show_message').send ({
       message: "Sorry, you provided worng info", type: "error"});
 } else {
    var newPerson = new Person({
       name: personInfo.name,
       email: personInfo.email,
       phone: personInfo.phone,
       web: personInfo.web,
       Subject: personInfo.Subject,
       Message: personInfo.Message


    });
  
    newPerson.save(function(err, Person){
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