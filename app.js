// npm install express mongoose body-parser ejs --save
var express = require("express"),
	app = express(),
	bodyParser = require("body-parser"),
	mongoose = require("mongoose");

// COPY: mongodb, view engine setup
mongoose.connect("mongodb://localhost/restful_blog_app");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

// Mongoose model configuration
var blogSchema = new mongoose.Schema({
	title: String,
	image: String,
	body: String,
	created: {type: Date, default: Date.now}
});
var Blog = mongoose.model("Blog", blogSchema);

// RESTful routes
app.get("/", function(req, res){
	res.redirect("/blogs");
});

// CREATE route
app.get("/blogs", function(req,res){
	// Retrieve all from DB and send them to index.ejs
	Blog.find({}, function(err, blogs){
		if(err){
			console.log(err);
		} else{
			res.render("index", {blogs: blogs});
		}
	})
});



// Listening
app.listen(3000, function(){
	console.log("Server is running.");
});