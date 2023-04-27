//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose=require("mongoose");
const _=require("lodash");

const homeStartingContent = "Lacus vel facilisis.";
const aboutContent = "Hac habitasse platea dictums.";
const contactContent = "Scelerisque eleifend donec.";
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
mongoose.connect("mongodb+srv://Admin:shubh123@cluster0.ga5afas.mongodb.net/blogDB", {useNewUrlParser: true});

const postSchema = {

 title: String,

 content: String

};

const Post = mongoose.model("Post", postSchema);

app.get("/", function(req, res) {
    Post.find().then(posts =>{
      res.render("home", {
        startingContent: homeStartingContent,
        posts: posts
        });
    });
});

app.get("/contact",function(req,res){
  res.render("contact",{ContactContent:contactContent});
})
app.get("/about",function(req,res){
  res.render("about",{AboutContent:aboutContent});
})

app.get("/compose",function(req,res){
  res.render("compose");
});

app.get("/posts/:postId", function(req, res){
  const requestedPostId=req.params.postId;
    Post.findOne({_id:requestedPostId}).then(posts=>{
      res.render("post",{
        title: posts.title,
        content: posts.content
      });
    });
});

app.post("/compose",function(req,res){

  const post = new Post ({

    title: req.body.postTitle,

    content: req.body.postBody

  });

  post.save().then(() => {

        console.log('Post added to DB.');

        res.redirect('/');

      })

      .catch(err => {

        res.status(400).send("Unable to save post to database.");

      });

});


app.listen(3000, function() {
  console.log("Server started on port 3000");
});
