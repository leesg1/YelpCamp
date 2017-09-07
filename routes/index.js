var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user")
var Campground = require("../models/campground");


// root route
router.get("/", function(req,res){
    res.render("landing");
})


// AUTH ROUTES


// show register form
router.get("/register", function(req,res){
    res.render("register");    
})

router.post("/register", function(req,res){
    var newUser = new User({username: req.body.username})
    User.register(newUser,req.body.password, function(err, user){
    
        if(err){
          return res.render("register", {"error": err.message});
        }
        passport.authenticate("local")(req,res,function(){
            req.flast("success", "You successfully signed in!")
            res.redirect("/campgrounds");
        })
    });
})

// show login form
router.get("/login", function(req,res){
    res.render("login");
});

router.post("/login",passport.authenticate("local",
    {
        successRedirect: "/campgrounds",
        failureRedirect: "/login"
    }), function(req,res){
});

// logout route

router.get("/logout",function(req,res){
    req.logout();
    req.flash("Success", "Logged you out!")
    res.redirect("/campgrounds");
})


module.exports = router;