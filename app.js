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

app.get("/auth/google/return", passport.authenticate("google", { failureRedirect: "/" }), function(req, res){
    res.end();
});

app.get("/user", function(req, res){
    if(req.user){
        res.json(200, req.user);
    }else{
        res.json(403, {error: "Not logged in"});
    }
});

app.get("/auth/logout", function(req, res){
    req.logout();
    res.redirect("/auth/logout/return");
});

app.get("/auth/logout/return", function(req, res){
    res.end();
});

app.get("/create", function(req, res){
    res.sendfile("static/index.html");
});

// Get a pattern by id

app.get("/pattern/:id/edit", function(req, res){
    res.sendfile("static/index.html");
});

app.get("/pattern/:id.json", function(req, res){
    mongo(function(error, db){
        var collection = db.collection("patterns");
        collection.findOne({_id: new ObjectID(req.params.id)}, function(error, pattern){
            res.json(200, pattern);
        });
    });
});

// Get a list of patterns

app.get("/patterns", function(req, res){
    mongo(function(error, db){
        var collection = db.collection("patterns");

        collection.find({}, {_id: true, name: true}, {}, function(error, patterns){
            patterns.toArray(function(error, patterns){
                res.json(200, patterns);
            });
        });
    });
});

// Create a pattern

app.post("/pattern", function(req, res){
    var pattern = req.body;

    // Validate pattern
    // TODO!

    // Generate image

    tmp.file(function(error, path, fd){
        if(error){
            res.json(500, {error: "Could not create temporary file"});
        }else{
            // Write image to temporary file

            var buffer = new Buffer(req.body.image, "base64");
            delete req.body.image; // We don't need this anymore

            fs.writeFile(path, buffer, function(error){
                if(error){
                    res.json(500, {error: "Could not create temporary file"});
                }else{
                    // Validate image

                    // im.identify(path, function(error, features){
                        // if(error || features.format !== "PNG"){
                        //    res.json(500, {error: "Invalid image"});
                        // }else{
                            // Save record to mongo

                             mongo(function(error, db){
                                var collection = db.collection("patterns");
                                var id = new ObjectID(pattern._id);

                                delete(pattern._id);

                                collection.findAndModify({_id: id}, null, pattern, {upsert: true}, function(error, result, details){
                                    if(error){
                                        res.json(500, {error: "Error inserting into database" + error}); 
                                    }else{
                                        var id = details.lastErrorObject.updatedExisting ? details.value._id : details.lastErrorObject.upserted;
                                        console.log("id", id, path);

                                        // Upload to S3

                                        S3Client.putFile(path, "/patterns/" + id + ".png", {"x-amz-acl": "public-read"}, function(){
                                            console.log("uploaded to s3")
                                            res.json(200, {message: "Saved successfully"});
                                        });
                                    }
                                });
                            });
                        // }
                    // });
                }
            });
        }
    });
});