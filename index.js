import express from "express";
import bodyParser from "body-parser";

const app          = express();
const port         = 3000;
var   passwordFlag = false;
var   posts        = [];

app.use(express.static("public"));
const date = new Date();
let year = date.getFullYear();
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
    if(req.body['password'] == "garbodor"){
        passwordFlag = true;
    }
    next();
});

app.get("/", (req, res) => {
    res.render("index.ejs", {
        curYear: year,
    });
});

app.post("/submit", (req, res) => {
    if (passwordFlag){
        res.render("blog.ejs", {
            curYear:  year,
            curPosts: posts,
    
        });
    }else {
        res.render("index.ejs", {
            curYear: year,
        });
    }
});

app.post("/publish", (req, res) => {
    posts.push(req.body['newPost']);
    res.render("blog.ejs", {
        curYear:  year,
        curPosts: posts,
    });
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});