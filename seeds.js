var mongoose = require("mongoose");
var Campground = require("./modules/campground");
var Comment = require("./modules/comments");

var data = [{name: "Tufandag", imageUrl: "https://t-ec.bstatic.com/images/hotel/max1024x768/793/79319684.jpg", description: "blah blah blah"},
                   {name: "Hauli Huvilla", imageUrl: "http://haulihuvila.com/wp-content/uploads/2012/09/hauli-huvila-campgrounds-lg.jpg", description: "blah blah blah"},
                   {name: "Vancouver", imageUrl: "http://farm9.staticflickr.com/8605/16573646931_22fc928bf9_o.jpg", description: "blah blah blah"},
                   {name: "Mount Abu", imageUrl: "https://invinciblengo.org/photos/event/slider/mount-abu-trekking-camp-aravalli-hills-rajasthan-nbMgzbA-1440x810.jpg", description: "blah blah blah"},
                   {name: "Tufandag", imageUrl: "https://t-ec.bstatic.com/images/hotel/max1024x768/793/79319684.jpg", description: "blah blah blah"},
                   {name: "Hauli Huvilla", imageUrl: "http://haulihuvila.com/wp-content/uploads/2012/09/hauli-huvila-campgrounds-lg.jpg", description: "blah blah blah"},
                   {name: "Vancouver", imageUrl: "http://farm9.staticflickr.com/8605/16573646931_22fc928bf9_o.jpg", description: "blah blah blah"},
                   {name: "Mount Abu", imageUrl: "https://invinciblengo.org/photos/event/slider/mount-abu-trekking-camp-aravalli-hills-rajasthan-nbMgzbA-1440x810.jpg", description: "blah blah blah"}

                 ];

function seedDB(){
        Campground.remove({},function(err){
        if(err){
            console.log(err);
               }
        console.log("Removed all of the campgrounds");
//         data.forEach(function(campground){
//             Campground.create(campground,function(err, campground){
//                 if(err){
//                     console.log(err);
//                 }else{
//                     console.log("added a campground");
//                     Comment.create({
//                         author: "Nurlan Isazade",
//                         text: "This is a test comment"
//                     }, function(err, comment){
//                         if(err){
//                             console.log(err);
//                         }else{
//                             campground.comments.push(comment);
//                             campground.save();
//                         }
//                     });
//                 }
//             });
//   });
  
});

}

module.exports = seedDB;