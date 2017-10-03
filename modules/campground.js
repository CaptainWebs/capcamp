var mongoose = require("mongoose");

// Creating a Schema for each Campground
var campgroundSchema = new mongoose.Schema({
    
    name: String,
    imageUrl: String,
    description: String,
    author:{
        id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    comments: [
        
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Comment"
                
            }
        
        ]
    
   });
   
// Compiling a model from schema
module.exports = mongoose.model("Campground",campgroundSchema);