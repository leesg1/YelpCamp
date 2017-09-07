var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware")

// INDEX - show all campgrounds
router.get("/", function(req,res){
    // get all campgrounds from db
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        } else
        {
            res.render("campgrounds/index",{campgrounds:allCampgrounds, currentUser: req.user});
        }
    })
})

// CREATE - add new campground to database
router.post("/", middleware.isLoggedIn, function(req, res){
    // get data from for and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var price = req.body.price;
    var desc = req.body.description;
    var author = {id: req.user._id, username: req.user.username};
    var newCampground = {name: name, price:price, image: image, description: desc, author:author};
    // Create a new campground and save to the database
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err)
        } else{
            console.log(newlyCreated);
            res.redirect("/campgrounds");
        }
    })
    //redirect back to the campgrounds page
});

// NEW - show form to create a new campground
router.get("/new", middleware.isLoggedIn, function(req,res){
    res.render("campgrounds/new");
    
})


//EDIT
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res){
   
    Campground.findById(req.params.id, function(err, foundCampground){
       res.render("campgrounds/edit", {campground: foundCampground})
    })
   
})

// UPDATE
router.put("/:id",middleware.checkCampgroundOwnership, function(req,res){
    // find the correct campground
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
       if(err){
           res.redirect("/campgrounds")
       } else {
           res.redirect("/campgrounds/" + req.params.id);
       }
    })
    //redirect to show page
    
})

//DESTROY CAMPGROUND
router.delete("/:id",middleware.checkCampgroundOwnership, function(req, res){
    
    Campground.findByIdAndRemove(req.params.id,function(err){
        if(err){
            res.redirect("/campgrounds")
        } else {
            res.redirect("/campgrounds")
        }
})
})


//SHOW - show info about specific campground
router.get("/:id", function(req,res){
    // find the campground with a certain id
    
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err)
        } else{
            res.render("campgrounds/show", {campground : foundCampground})
        }
    });
});


module.exports = router;