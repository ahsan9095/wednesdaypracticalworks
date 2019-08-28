var express    = require('express');
const bodyParser = require('body-parser');

var app = express();

var nodemailer = require('nodemailer');
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(express.static('homesolutionslondon.co.uk'));

app.get('/get-an-appointment', function(req, res){

  console.log(__dirname);

  res.sendFile(__dirname+'/homesolutionslondon.co.uk/get-an-appointment.html');
});


app.post('/send', function(req,res){ 

var Services=req.body.service_txt;
var Name=req.body.name_txt;
var Houseno=req.body.house_txt;
var Street=req.body.street_txt;
var Postcode=req.body.postcode_txt;
var Mobileno=req.body.mobile_txt;
var Email=req.body.email_txt;
var Message=req.body.message_txt;

/*console.log(Services);
console.log(Name);
console.log(Houseno);
console.log(Street);
console.log(Postcode);
console.log(Mobileno);
console.log(Email);
console.log(Message);*/



var emailMessage = `services: ${Services},\n\nName: ${Name}\n\nHouseNo: ${Houseno}\n\nStreet: ${Street}\n\nPostcode: ${Postcode}\n\nMobileNo: ${Mobileno}\n\nEmail: ${Email}\n\n Message:${Message}`;


console.log(emailMessage);




  
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'ahsan50414@gmail.com',
    pass: 'ayyaz786'
  }
});

var mailOptions = {
  from: 'ahsan50414@gmail.com',
  to: Email,
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


});

var server = app.listen(8081, function () {
   
  console.log("http://localhost:8081/")
}); 