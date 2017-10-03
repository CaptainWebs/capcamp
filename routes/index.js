var express         = require("express");
var router          = express.Router({mergeParams: true});
var Campground      = require("../modules/campground");
var Comment         = require("../modules/comments");
var passport        = require("passport");
var User            = require("../models/user");


router.get("/",function(req,res){
    res.render("home");
});


// =============================
// Auth Routes
// =============================

router.get("/register", function(req, res) {
    res.render("register");
});

router.post("/register", function(req, res) {
    User.register(new User({username: req.body.username}), req.body.password, function(err, user){
        if(err){
            req.flash("error", err.message)
            return res.redirect("/register");
        }
        
        passport.authenticate("local")(req, res, function(){
           
           res.redirect("/campgrounds");
            
        });
    });
});

// Login route
router.get("/login", function(req, res) {
    res.render("login");
});

router.post("/login", passport.authenticate("local",{
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}),function(req, res){
    
});

// Logout route
router.get("/logout", function(req, res) {
    req.logout();
    req.flash("success","You are logged out");
    res.redirect("/campgrounds");
});


module.exports = router;