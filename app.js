var express         = require("express"),
    mongoose        = require("mongoose"),
    request         = require("request"),
    app             = express(),
    bodyParser      = require('body-parser'),
    Campground      = require("./modules/campground"),
    Comment         = require("./modules/comments"),
    seedDB          = require("./seeds"),
    passport        = require("passport"),
    LocalStrategy   = require("passport-local"),
    User            = require("./models/user"),
    indexRoutes     = require("./routes/index"),
    commentRoutes   = require("./routes/comments"),
    methodOverride  = require("method-override"),
    flash           = require("connect-flash"),
    campRoutes      = require("./routes/campgrounds");
    
const getTheWeather = require("get-the-weather");



mongoose.connect("mongodb://nurlan:Iaready1995@ds161304.mlab.com:61304/bootcamp");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname+"/public"));
app.set("view engine", "ejs");
app.use(require("express-session")({
    secret: "Vusale",
    resave: false,
    saveUninitialized: false,
}));

app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.use(methodOverride("_method"));


// passport configuration

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// seedDB();


app.use(indexRoutes);
app.use(commentRoutes);
app.use(campRoutes);


let options = {
    zip: 10001,
    DarkSkyKey: "8c62ba672d1b80a02bb183764d00e688",
    ZipCodeApiKey: "QrgpnpYfDCMZKQRjF1AQh1UuoeIv96vZxLpVbobP1YPLPG5uIFl0Gfu5tdADj5DR"
}

getTheWeather(options).then(result => console.log(result.currently.temperature));

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Bootcamp server is started and running");
});