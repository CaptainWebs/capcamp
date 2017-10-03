var express = require("express");
var router = express.Router({mergeParams: true});
var Campground = require("../modules/campground");
var middlewareObj = require("../middleware");

router.get("/campgrounds", function(req,res){
   
   Campground.find({},function(err, allOfCampgrounds){
      
      if(err){
          console.log(err);
      }else{
         
         res.render("campgrounds", {campgrounds:allOfCampgrounds, currentUser: req.user}); 
          
      }
       
   });
});

router.post("/campgrounds", middlewareObj.isLoggedIn, function(req, res){
    
   var name = req.body.name;
   var imageUrl = req.body.imageUrl;
   var description = req.body.description;
   
   var author = {
       id: req.user._id,
       username: req.user.username
   };
   
   var newCampground = {name: name, imageUrl: imageUrl, description: description, author: author};
   
   Campground.create(newCampground, function(err, newCampground){
       if(err){
           console.log(err);
       }else{
           res.redirect("/campgrounds");
       }
    });
   
});

router.get("/campgrounds/new", middlewareObj.isLoggedIn, function(req, res){
    
    res.render("new");
});

router.get("/campgrounds/:id", function(req, res) {
   
   Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
      
      if(err){
          console.log(err);
      }else{
          res.render("show", {campground: foundCampground});
      }
       
     }); 
    
});

router.get("/campgrounds/:id/edit", middlewareObj.checkCampgroundOwnership, function(req, res) {
    
        
        var foundCampground = Campground.findById(req.params.id, function(err, campground){
        res.render("../views/campgrounds/edit",{foundCampground: campground});


});

});

router.put("/campgrounds/:id", middlewareObj.checkCampgroundOwnership, function(req, res){
    
   Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
       if(err){
           console.log(err);
           res.redirect("/campgrounds");
       }else{
           res.redirect("/campgrounds/" + req.params.id);
       }
   }); 
    
});

router.delete("/campgrounds/:id", middlewareObj.checkCampgroundOwnership, function(req, res){
    
   Campground.findByIdAndRemove(req.params.id, function(err, result){
       if(err){
           res.redirect("/campgrounds");
       }else{
           res.redirect("/campgrounds");
       }
   }); 
    
});

module.exports = router;