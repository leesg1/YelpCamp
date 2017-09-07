var express = require("express");
var router = express.Router({mergeParams: true}); // merges params from comments and campgroufds together
                                                // so we can access :id from here
var Campground = require("../models/campground");
var User = require("../models/user")
var middleware = require("../middleware")

var Comment = require("../models/comment");

// Comment routes

// /comments/new
router.get("/new", middleware.isLoggedIn, function(req, res){
        Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        } else {
            res.render("comments/new", {campground : campground});
        }
    })
})

router.get("/comment_id/edit", function(req, res){
    
})

// /comments
router.post("/", middleware.isLoggedIn, function(req,res){
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
                    // add username and id to comment 
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    console.log(req.user.username);
                    // save comment
                    
                    console.log(comment);
                    comment.save();

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

//EDIT 
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req,res){
    Comment.findById(req.params.comment_id, function(err, foundComment){
        if(err){
            res.redirect("back");
        } else {
            res.render("comments/edit",{campground_id: req.params.id, comment: foundComment})
        }
    })

})

//UPDATE
router.put("/:comment_id",middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
        if(err){
            res.redirect("back");
        } else {
            res.redirect("/campgrounds/" + req.params.id)
        }
    })
    
})

//DESTROY
router.delete("/:comment_id", middleware.checkCommentOwnership,function(req, res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err){
            res.redirect("back");
        } else {
            req.flash("success", "Comment deleted!")
            res.redirect("/campgrounds/"+ req.params.id);
        }
    })
})

module.exports = router;