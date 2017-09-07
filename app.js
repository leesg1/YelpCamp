var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    Campground = require("./models/campground"),
    seedDB = require("./seeds"),
    LocalStrategy = require("passport-local"),
    User = require("./models/user"),
    passport = require("passport"),
    Comment = require("./models/comment"),
    flash = require("connect-flash"),
    methodOverride = require("method-override")
//    User = require("./models/user");

var commentRoutes =  require("./routes/comments"),
    campgroundRoutes =  require("./routes/campgrounds"),
    indexRoutes = require("./routes/index");

mongoose.connect("mongodb://localhost/yelp_camp")
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname +"/public"))
app.use(methodOverride("_method"));
app.use(flash())
//seedDB();    


//passport configuration
app.use(require("express-session")({
   secret: "Some random string",
   resave:false,
   saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");

    next();
})
// rmake it so that the route files are being used
app.use(indexRoutes);   
app.use("/campgrounds", campgroundRoutes); // this allows us to remove the "campgrounds"
                                        //   from all our campground routes so in campgrounds.js
                                        // it is just"/"
                                    
app.use("/campgrounds/:id/comments",commentRoutes);


function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
    
}


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Website is running!");
})
