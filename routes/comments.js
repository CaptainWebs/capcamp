var express         = require("express");
var router          = express.Router({mergeParams: true});
var Campground      = require("../modules/campground");
var Comment         = require("../modules/comments");
var middlewareObj = require("../middleware");



// =============================
//       Comment Routes
// =============================

router.get("/campgrounds/:id/comments/new", middlewareObj.isLoggedIn, function(req, res){
   
  Campground.findById(req.params.id, function(err, campground){
      if(err){
          console.log(err);
      }else{
          res.render("comments/new", {campground:campground});
      }
  });
    
});

router.post("/campgrounds/:id/comments", middlewareObj.isLoggedIn, function(req, res){
    
   Campground.findById(req.params.id, function(err, campground){
      
      if(err){
          console.log(err + " could not find the searched campground in db");
      }else{
          Comment.create(req.body.comment, function(err, comment){
             
             if(err){
                 console.log(err);
             }else{
                 
                 comment.author.id = req.user._id;
                 comment.author.username = req.user.username;
                 comment.save();
                 campground.comments.push(comment);
                 campground.save();
                 res.redirect("/campgrounds/" + campground._id);
             }
              
          });
      }
       
   });
    
});

router.get("/campgrounds/:id/comments/:comment_id/edit", middlewareObj.checkCommentOwnership, function(req, res){
    
    Comment.findById(req.params.comment_id, function(err, comment) {
        if(err){
            console.log(err);
        }else{
            res.render("../views/comments/edit",{campground_id: req.params.id,comment: comment });
        }
        
    })
    
    
});

router.put("/campgrounds/:id/comments/:comment_id", middlewareObj.checkCommentOwnership, function(req, res){
   
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
       if(err){
           console.log(err);
           res.redirect("back");
       }else{
           res.redirect("/campgrounds/" + req.params.id);
       }
   }); 
    
});

router.delete("/campgrounds/:id/comments/:comment_id", middlewareObj.checkCommentOwnership, function(req, res){
   
   Comment.findByIdAndRemove(req.params.comment_id, function(err, result){
       if(err){
           console.log(err);
       }else{
           res.redirect("/campgrounds/"+ req.params.id);
       }
   })
    
});
module.exports = router;