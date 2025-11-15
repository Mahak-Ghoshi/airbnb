const express=require("express");
const app= express();
const session= require("express-session")
const flash= require("connect-flash")
const path= require("path")



app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));



const sessionOptions ={
    secret: "mysupersecretsting",
    resave: false, 
    saveUninitialized:true
}

app.use(session(sessionOptions))
app.use(flash())
  
app.use((req,res,next) => {
    res.locals.errorMsg= req.flash("error");
    res.locals.successMsg=req.flash("success")
    next()
})

app.get("/register", (req,res)=> {
    let {name = "anonymous"}= req.query;
    // console.log(req.session)
    req.session.name=name;
    if(name=== "anonymous"){
        req.flash("error","user not registered")
    }else{
    req.flash("success", "user register successfully")

    }
    res.redirect("/hello")
})

app.get("/hello", (req,res)=> {
    res.render("page.ejs", {name: req.session.name, msg: req.flash("success")})
})

app.get("/reqcount", (req,res) => {
    if(req.session.count){
        req.session.count++;
    }else{
    req.session.count=1
    }
    res.send(`you sent a request ${req.session.count} time`)
})

app.listen(3000, ()=> {
    console.log("server is listening on port 3000")
})