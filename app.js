var express = require("express");
var http = require("http");
var path = require("path");
var passport = require("passport");
var im = require("imagemagick");
var tmp = require("tmp");

var MongoClient = require("mongodb").MongoClient;
var ObjectID = require("mongodb").ObjectID;
var GoogleStrategy = require("passport-google").Strategy;
var S3Client = require("knox").createClient({
    key:    process.env.S3_KEY,
    secret: process.env.S3_SECRET,
    bucket: process.env.S3_BUCKET
});

var fs = require("fs");
var sys = require("sys");
var util = require("util");
    
// Initialize app
    
var app = express();

// Setup mongodb

var mongoUri = process.env.MONGO_PATH;

var mongoDb;
var mongo = function(callback){
    if(!mongoDb){
        console.log("Initializing mongodb connection");
        MongoClient.connect(mongoUri, function(error, db){
            console.log("Connected to mongodb");
            if(error){ callback(error, null); }
            mongoDb = db;
            callback(null, mongoDb);
        });
    }else{
        callback(null, mongoDb);
    }
};

// Authentication configuration

passport.serializeUser(function(user, done){
    done(null, user);
});

passport.deserializeUser(function(obj, done){
    done(null, obj);
});

passport.use(new GoogleStrategy({
        returnURL: (process.env.BASE_PATH) + "/auth/google/return",
        realm: process.env.BASE_PATH
    },
    function(identifier, profile, done){
        process.nextTick(function(){
            profile.identifier = identifier;
            return done(null, profile);
        });
    }
));

var ensureAuthenticated = function(req, res, next) {
    if(req.isAuthenticated()){ return next(); }
    res.redirect("/login")
}

// App configuration

app.configure(function(){
    app.set("port", process.env.PORT);
    app.use(express.static(path.join(__dirname, "static")));
    app.use(express.favicon());
    app.use(express.cookieParser());
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.session({ secret: process.env.SESSION_SECRET }));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(app.router);
}).listen(process.env.PORT, function(){});

app.get("/auth/google", passport.authenticate("google", { failureRedirect: "/" }), function(req, res){
    res.redirect("/");
});

app.get("/auth/google/return", passport.authenticate('google', { failureRedirect: "/" }), function(req, res){
    res.redirect("/");
});

app.get("/user", function(req, res){
    if(req.user){
        res.json(200, req.user);
    }else{
        res.json(500, {error: "Not logged in"});
    }
});

app.get("/logout", function(req, res){
    req.logout();
    res.redirect("/");
});

// Create a pattern

app.post("/pattern", function(req, res){
    // Generate image
    tmp.file(function(error, path, fd){
        if(error){
            res.json(500, {error: "Could not create temporary file"});
        }else{
            // Write image to temporary file
            var buffer = new Buffer(req.body.image, "base64");
            fs.writeFile(path, buffer, function(error){
                if(error){
                    res.json(500, {error: "Could not create temporary file"});
                }else{
                    // Validate image
                    im.identify(path, function(error, features){
                        if(error || features.format !== "PNG"){
                            res.json(500, {error: "Invalid image"});
                        }else{
                            // Upload to S3
                            S3Client.putFile(path, "/patterns/FIXME.png", {"x-amz-acl": "public-read"}, function(res){
                                console.log("Uploaded image to S3");
                                res.json(200, {message: "Saved successfully"});
                            });
                        }
                    });
                }
            });
        }
    });
});