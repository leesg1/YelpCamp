var express = require("express");
var app = express();
var bodyParser = require("body-parser");


 var campgrounds = [
        {name: "Salmon Creek", image:"https://www.w3schools.com/css/img_lights.jpg"},
        {name: "Cod Creek", image:"https://www.w3schools.com/css/img_fjords.jpg"},
        {name: "Tuna Creek", image:"https://camo.mybb.com/e01de90be6012adc1b1701dba899491a9348ae79/687474703a2f2f7777772e6a71756572797363726970742e6e65742f696d616765732f53696d706c6573742d526573706f6e736976652d6a51756572792d496d6167652d4c69676874626f782d506c7567696e2d73696d706c652d6c69676874626f782e6a7067"},
        {name: "Salmon Creek", image:"https://www.w3schools.com/css/img_lights.jpg"},
        {name: "Cod Creek", image:"https://www.w3schools.com/css/img_fjords.jpg"},
        {name: "Salmon Creek", image:"https://www.w3schools.com/css/img_lights.jpg"},
        {name: "Cod Creek", image:"https://www.w3schools.com/css/img_fjords.jpg"},
        {name: "Salmon Creek", image:"https://www.w3schools.com/css/img_lights.jpg"},
        {name: "Cod Creek", image:"https://www.w3schools.com/css/img_fjords.jpg"}
        ];
        
        
        
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Website is running!");
})

app.get("/", function(req,res){
    res.render("landing");
})

app.get("/campgrounds", function(req,res){
    res.render("campgrounds",{campgrounds:campgrounds});
})

app.post("/campgrounds",function(req, res){
    // get data from for and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    
    var newCampground = {name: name, image: image};
    campgrounds.push(newCampground);
    
    res.redirect("/campgrounds");
    //redirect back to the campgriunds page
    
});

app.get("/campgrounds/new", function(req,res){
    res.render("new.ejs");
    
})