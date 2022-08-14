
const express = require("express");
const mongoose= require('mongoose');
const ejs = require("ejs")
const path = require("path")
const Post = require('./models/Post')


const app = express();

// connection database
mongoose
.connect('mongodb://localhost/cleanblog-test-db')
.then(() => console.log('database bağlantısı kuruldu'));

//template engine
app.set("view engine","ejs");

// MIDDLEWAres
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({extended:true}));
app.use(express.json());

//ROUTES
app.get("/", async (req, res) => {
  const posts = await Post.find({});
  res.render("index", {posts});
});
app.get("/about", (req, res) => {
  res.render("about")
});


app.get("/post", (req, res) => {
  res.render("post")
});

app.post("/add_post", async (req, res) => {
  await Post.create(req.body);
  res.redirect("/");
});



const port = 3000;
app.listen(port, () => {
  console.log(`server ${port} portunda çalışmaya başladı`);
});
