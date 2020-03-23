var express = require("express");
var app = express();
var request = require("request");
var bodyParser = require("body-parser");
var mongoose = require("mongoose"),
    User = require("./model/user"),
    Contact = require("./model/contacts");


mongoose.connect("mongodb://localhost/curiosum", {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");


//Landing Page
app.get("/", function (req, res) {  
    res.render("index");
});

//To print the prime numbers till the variable "till"
app.get("/primes/:till", function (req, res) { 
    res.send(listPrimes(req.params.till));
});

app.post("/primes", function (req, res) { 
    res.send(listPrimes(req.body.till));
});

//To get the form to fill up the user form
app.get("/info", function (req, res) {  
    res.render("user");
});

//To fill up the contact form
app.get("/contacts", function (req, res) {  
    res.render("contact");
});

//Post route for the user info
app.post("/info", function(req, res){
    User.create(req.body.User, function(err, user){
        if(err){
            console.log(err);
        }else{
            // console.log(contacts.);
            user.save(function (err) { 
                if(err){
                    console.log(err);
                }
            });
            // console.log(user);
        }
        //Redirect back to the form
        res.redirect("/info");
    });

});



//Post route for the contact info
app.post("/contacts", function(req, res){
    Contact.create(req.body.Contact, function(err, contact){
        if(err){
            console.log(err);
        }else{ 
            contact.save(function (err) {  
                if (err) {
                    console.log(err);
                }else{
                    console.log("Contact added");
                }
            });
            User.find({}, function (err, users) {  
                console.log(users);
                users.forEach(function (user) {  
                    user.contacts.push(contact._id);
                    user.save(function (err) {
                        if(err){
                            console.log(err);
                        }else{
                            // console.log(user);
                        }
                    })
                });
            })
            res.redirect("/contacts");
        }
        //Redirect back to the form
    });
});

//Refrence existing stuff in case a new user is added after addition of a contact
app.post("/reference", function (req, res) {  
    User.find({}, function (err, users) {  
        if(err){
            console.log(err);
        }else{
            users.forEach(function(user){
                Contact.find({}, function (err, contacts) {  
                    if (err) {
                        console.log(err);
                    }else{
                        // console.log(user);
                        user.contacts = contacts;
                        user.save(function (err) {  
                            if(err){
                                console.log(err);
                            }
                        });
                        // console.log(user.contacts);
                    }
                });
                
               
            });
        }
        res.redirect("/show");

    });
});

//This page will show all the information of different users
app.get("/show", function (req, res) { 
    // console.log(user); 
    User.find({}).populate("contacts").exec(function (err, users) {  
        if(err){
            console.log(err);
        }else{
            Contact.find({}, function (err, contacts) {  
                if (err) {
                    console.log(err);
                }else{
                    // console.log(contacts.length);
                    res.render("show", {users:users, contacts:contacts});
                }
            });
        }
    });

    
});


//Sieve of eratosthenes is used to reduce the time complexity
function listPrimes( max ) {
    // Start with an empty list of primes
    var primes = [];
    // Initialize the sieve - each number is prime unless proven otherwise
    var sieve = new Array( max );
    for( var i = 1;  i <= max;  i++ ) {
        sieve[i] = true;
    }
    // Now check each number from 2 through max
    for( var p = 2;  p <= max;  p++ ) {
        if( sieve[p] ) {
            // p is prime, save it in the output list
            primes.push( p );
            // Mark p * 2, p * 3, p * 4, etc. as non-prime
            for( var t = p * 2;  t <= max;  t += p ) {
                sieve[t] = false;
            }
        }
    }
    return primes;
}

var port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("Server Has Started!");
});