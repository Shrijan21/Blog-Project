//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");

const homeStartingContent = "Fitness means different things to different people and Health has something for everyone, whether you’re just getting started with a workout routine or have been training since before TikTok was a thing. Get our latest expert moves, pro-tips, and recommendations for who to follow.";
const aboutContent = "Hey folks!Shrijan this side.....Welcome to My BLOG Page.It is all about fitness.It has been my passion since 9 years.I have been actively paticipating in all the sports events which occured in my schhol and college level.Sports and Fitness have been an itegral part of my life!I also love to write and express myself.so here i am with my blog page.Hope you got some new knowledge by visiting here.";
const contactContent = "Thank you for visiting my blog page.We all have a spiritual connection to certain individuals, which transcends the mental and physical illusions of this experience we call life. It cannot be forgotten, even if we refuse to interact with those people concerned. This connection is true love, and nothing we say or do can break it. If you want to give any feedback you can ping me on my any of the social-handles. The links are given below.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://admin-shrijan:shrijanbushra@cluster0.pgmo3.mongodb.net/blogsDB", {useNewUrlParser: true});

const postSchema = {

 title: String,

 content: String

};
const Post = mongoose.model("Post", postSchema);


app.get("/", function(req, res) {
Post.find({}, function(err, posts){
  res.render("home", {
    startingContent: homeStartingContent,
    posts: posts
  });
  });
})

app.get("/about", function(req, res) {
  res.render("about", {
    aboutContent: aboutContent
  });
})

app.get("/contact", function(req, res) {
  res.render("contact", {
    contactContent: contactContent
  });
})

app.get("/compose", function(req, res) {
  res.render("compose");
})

app.post("/compose", function(req, res) {
  const post = new Post ({

    title: req.body.postTitle,

    content: req.body.postBody

  });

  post.save(function(err){

   if (!err){

     res.redirect("/");

   }

 });
});

app.get("/posts/:postId", function(req, res){
  const requestedTitle = _.lowerCase(req.params.postName);
  const requestedPostId = req.params.postId;

  Post.findOne({_id: requestedPostId}, function(err, post){

     res.render("post", {

       title: post.title,

       content: post.content

     });

   });
})

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}


app.listen(port, function() {
  console.log("Server has started successfully.");
});
