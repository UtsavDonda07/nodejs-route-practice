const { render } = require("ejs");
const express = require("express");
const mongoose = require("mongoose");
const Blog = require("./model/blog");
const app = express();
const dotenv = require("dotenv")
const morgan = require("morgan")
const mongoConnect = require("./Connector/connectWithMongoDb")


dotenv.config()

// const dbUrl =
//   "mongodb+srv://utsav07:utsav123@cluster0.o9qno.mongodb.net/?retryWrites=true&w=majority";
// mongoose
//   .connect(dbUrl)
//   .then((result) => {
//     console.log("connected to db");
//     app.listen(3000,(err)=>{
//       if(err)
//       {
//         console.log("Error --->",err)
//       }else{
//         console.log("Successfully connected with server")
//       }
//     });
//   })
//   .catch((err) => console.log(err));

// app.set("view engine", "ejs");
app.listen(3000,(err)=>{
  if(err){
    console.log("Error occured")
  }else{
    console.log("Successfully Conneted")
    mongoConnect();
    }
})
app.set("view engine", "ejs");
app.use(morgan('tiny'))

// const blogs = [
//     { title: "share market", body: "this is blog of share market" },
//     { title: "flutter", body: "this is blog of fluter creating app" },
//     { title: "web devlopment", body: "this is blog of web development" },

// ];

// public css so run in browser

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// app.get('/add-blog', (req, res) => {
//     const blog = new Blog({
//         title: "express development 2",
//         body: "this is body of title 2"
//     });
//     blog.save()
//         .then((result) => { res.send(result) })
//         .catch((err) => console.log(err));
// });

app.get("/", (req, res) => {
  //   res.sendFile('./view/index.html', { root: __dirname });
  // res.render('index', { title: 'Home', blogs });
  res.redirect("/blogs");
});

app.get("/about", (req, res) => {
  //   res.sendFile('./view/about.html', { root: __dirname });
  res.render("about", { title: "about us" });
});

app.get("/blogs", (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render("index", { title: "All Blogs", blogs: result });
    })
    .catch((err) => console.log(err));
});
app.post("/blogs", (req, res) => {
  console.log("Hello I am Here")
  console.log(req.body)
  const blog = new Blog(req.body);
  blog
    .save()
    .then((result) => {
      res.redirect("/blogs");
    })
    .catch((err) => console.log("------------>",err));
});

app.get('/blogs/find/:id',(req,res)=>{
    const id=req.params.id;
   Blog.findById(id)
   .then(result => {
    res.render('details',{blog:result,title: "Blogs details"});
})
.catch((err) => console.log("---------------------->",err));
   }
);


app.get("/blogs/create", (req, res) => {

  console.log("create open");
  console.log("Here")
  res.render('create', { title: "create a blog" });
  console.log("create close");
});

app.delete('/blogs/:id',(req,res)=>{
  const {id}=req.params;
  mongoose.Types.ObjectId.isValid(id)
  console.log("********************************88",id);
  Blog.findByIdAndRemove(id)
  .then(result => {
    if(result)
    res.json({redirect: '/blogs'})
    else
    res.json({redirect:'/404'})
})
.catch((err) => console.log(err));
});

app.use((req, res) => {
  //   res.status(404).sendFile('./view/404.html', { root: __dirname });
  res.render("404", { title: "404" });
});
