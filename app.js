var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    Campground = require("./models/campground"),
    seedDB = require("./seeds"),
    Comment = require("./models/comment")
//    User = require("./models/user");


    

mongoose.connect("mongodb://localhost/yelp_camp")
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname +"/public"))
seedDB();    


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Website is running!");
})

app.get("/", function(req,res){
    res.render("landing");
})


// INDEX - show all campgrounds
app.get("/campgrounds", function(req,res){
    // get all campgrounds from db
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        } else
        {
            res.render("campgrounds/index",{campgrounds:allCampgrounds});
        }
    })
})

// CREATE - add new campground to database
app.post("/campgrounds",function(req, res){
    // get data from for and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;

    
    var newCampground = {name: name, image: image, description: desc};
    // Create a new campground and save to the database
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err)
        } else{
            res.redirect("/campgrounds");
        }
    })
    //redirect back to the campgrounds page
});

// NEW - show form to create a new campground
app.get("/campgrounds/new", function(req,res){
    res.render("campgrounds/new");
    
})

// Comment routes
app.get("/campgrounds/:id/comments/new", function(req, res){
        Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        } else {
            res.render("comments/new", {campground : campground});
        }
    })
})

app.post("/campgrounds/:id/comments", function(req,res){
    // lookup campground using id
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
            res.redirect("/campgrounds")
        } else{
            console.log(req.body.comment)
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err)
                } else{
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect("/campgrounds/" + campground._id)
                }
            })
        }
    })
    
    //create new comments
    //connect new comment to campground
    //redirect to campground show page
    
})

//SHOW - show info about specific campground
app.get("/campgrounds/:id", function(req,res){
    // find the campground with a certain id
    
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err)
        } else{
            res.render("campgrounds/show", {campground : foundCampground})
        }
    });
});