var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");
var data = [
        {name: "Salmon Creek", 
        image:"https://www.w3schools.com/css/img_lights.jpg", 
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim veniam sint, eaque voluptatem possimus facilis, corporis quas quia molestias iusto reprehenderit nulla fugit dolorum quasi totam asperiores blanditiis minima natus."},
        
        {name: "Cod Creek", 
        image:"https://www.w3schools.com/css/img_fjords.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim veniam sint, eaque voluptatem possimus facilis, corporis quas quia molestias iusto reprehenderit nulla fugit dolorum quasi totam asperiores blanditiis minima natus."
        },
        
        {name: "Tuna Creek", 
        image:"https://camo.mybb.com/e01de90be6012adc1b1701dba899491a9348ae79/687474703a2f2f7777772e6a71756572797363726970742e6e65742f696d616765732f53696d706c6573742d526573706f6e736976652d6a51756572792d496d6167652d4c69676874626f782d506c7567696e2d73696d706c652d6c69676874626f782e6a7067",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim veniam sint, eaque voluptatem possimus facilis, corporis quas quia molestias iusto reprehenderit nulla fugit dolorum quasi totam asperiores blanditiis minima natus."}
 
    ]

function seedDB(){
    // remove all campgrounds
    Campground.remove({},function(err){
        if(err){
            console.log(err)
        } else{
            console.log("Removed Campgrounds");
        }
/*        
        // add some campgrounds
        data.forEach(function(seed){
        Campground.create(seed, function(err,data){
            if(err){
                console.log(err);
            } else{
                console.log("added a campground");
                 // add some comments
                Comment.create(
                    {
                        text: "Love this place",
                        author: "Homer"
                    },
                    function(err, comment){
                        if(err){
                            console.log(err);
                        }
                        data.comments.push(comment);
                        data.save();
                        console.log("Created new comment");
                        
                    });
            }
        })
    })
   */ })
   
   
}

module.exports = seedDB