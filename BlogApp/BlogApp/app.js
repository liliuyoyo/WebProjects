var express = require("express"),
    expressSanitizer = require("express-sanitizer"),
    methodOverride = require("method-override"),
    app = express(),
    mongoose = require("mongoose"),
    bodyParser = require("body-parser");
    
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());
app.use(express.static("public"));
app.use(methodOverride("_method"));
mongoose.connect("mongodb://localhost:27017/blog_app",{useNewUrlParser: true });
mongoose.set('useFindAndModify', false);

/************************* 
  Set up schema and model
**************************/
var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {  type:Date, 
                default:Date.now()}
});
var Blog = mongoose.model("Blog",blogSchema);



/************************* 
      RESTful Routes
**************************/
/* INDEX route */
app.get("/",function(req,res){
    res.redirect("/blogs");
});

app.get("/blogs",function(req,res){
    Blog.find({},function(err,blogs){
        if(err){
            console.log("Fail to show blogs.")
        }else{
            res.render("index",{blogs: blogs});     
        }
    });
});

/* NEW route */
app.get("/blogs/new",function(req,res){
    res.render("new");
});

/* CREATE route */
app.post("/blogs",function(req,res){
    //create new blog
    req.body.blog.body = req.sanitize(req.body.blog.body);
    Blog.create(req.body.blog,function(err,newBlog){
        if(err){
            console.log("ERROR!");
            res.render("new");
        }else{
            res.redirect("/blogs");
        }
    });
});

/* SHOW route */
app.get("/blogs/:id",function(req, res) {
    Blog.findById(req.params.id,function(err,selectedBlog){
        if(err){
            console.log("Error!");
            res.redirect("/blogs");
        }else{
            res.render("show",{ blog:selectedBlog}); 
        }
    });
});

/* EDIT route */
app.get("/blogs/:id/edit",function(req, res) {
    Blog.findById(req.params.id,function(err,selectedBlog){
        if(err){
            console.log("Error!");
            res.redirect("/blogs");
        }else{
            res.render("edit",{ blog:selectedBlog}); 
        }
    });
});

/* UPDATE route */
app.put("/blogs/:id",function(req,res){
    req.body.blog.body = req.sanitize(req.body.blog.body);
    Blog.findByIdAndUpdate(req.params.id, req.body.blog ,function(err,updatedBlog){
        if(err){
            console.log("Error!");
            res.redirect("/blogs");
        }else{
            res.redirect("/blogs/"+req.params.id ); 
        }
    });    
});

/* DESTORY route */
app.delete("/blogs/:id",function(req,res){
    Blog.findByIdAndRemove(req.params.id,function(err,updatedBlog){
        if(err){
            console.log("Error!");
        }else{
            res.redirect("/blogs"); 
        }
    });
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Blog Server has started.");
});
    