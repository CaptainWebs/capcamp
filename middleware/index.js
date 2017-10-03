var Campground = require("../modules/campground");
var Comment = require("../modules/comments");

var middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function(req, res, next){
    
    if(req.isAuthenticated())
    {
        
            var foundCampground = Campground.findById(req.params.id, function(err, campground){
            if(err)
            {
                res.redirect("back");
            }
            else
            {
                if(campground.author.id.equals(req.user._id))
                {
                   
                  next();
                    
                }else
                {
                    res.redirect("back");
                }
            }
          });

        
    }
    else
    {
        res.redirect("back");
    }
    
};  // function

middlewareObj.checkCommentOwnership = function(req, res, next){
    
    if(req.isAuthenticated())
    {
        
            var foundComment = Comment.findById(req.params.comment_id, function(err, comment){
            if(err)
            {
                res.redirect("back");
            }
            else
            {
                if(comment.author.id.equals(req.user._id))
                {
                   
                  next();
                    
                }else
                {
                    res.redirect("back");
                }
            }
          });

        
    }
    else
    {
        res.redirect("back");
    }
    
};  // function

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    
    req.flash("error", "Please login");
    res.redirect("/login");
};

module.exports = middlewareObj;