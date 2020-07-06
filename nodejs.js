const express = require("express")
const app = express();
const {middleware} = require('./middleware')

app.use(middleware);

app.set('view engine', 'ejs');
object = [
    {title: "Did you know?", snippet: "More is more."},
    {title: "Rule #1", snippet: "you gotta have fun"},
    {title: "LCS", snippet: "Jestem polsky co kurwa mid or feed"},
]
app.get("/",(req, res) => {
    res.render('index',{valtozo: 'Homar!',object})
})
app.get("/about",(req, res) => {
    res.render('about',{valtozo: 'About'})
})
app.get("*/create",(req,res)=>{
    res.render('create',{valtozo: 'Create'});
})
app.get("/about-us",(req, res) => {
    res.redirect('/about')
})


app.get("/js.js",(req,res) => {
    res.sendFile("./public/js.js",{root: __dirname})
})
app.get("/css",(req,res) => {
    res.sendFile("./public/css.css",{root: __dirname})
})

app.use((r,res) => {res.status(404).render('404')});


app.listen(3000,()=>{
    console.clear(); 
    console.log("\x1b[38;2;180;220;255;4m%s\x1b[0m\n","Szerváló hallgat a 3000-es kikötőn:")
});