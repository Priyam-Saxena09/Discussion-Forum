const express = require("express")
require("./connection")
const port = process.env.PORT
const user = require("./schema")
const ext = require("./schema1")
const comment = require("./schema2")
const multer = require("multer")
const bcrypt = require("bcryptjs")
const app = express()
app.use(express.static("static"))
app.use(express.urlencoded())
app.set("view engine","hbs")
app.set("views",(__dirname,"./public"))
var login = ""
var imgarr = []

app.get("",(req,res) => {
    res.render("login",{})
})

app.get("/signup",(req,res) => {
    res.render("signup",{})
})

app.get("/about",(req,res) => {
    res.render("about",{})
})

var upload = multer({ 
    dest:"./static/Images/",
    limits:
    {
        fileSize:1000000
    },
    fileFilter(req,file,cb)
    {
        if(!file.originalname.endsWith(".jpg"))
        {
            return cb(new Error("File Invalid"))
        }
        cb(undefined,true)
    },
    filename(req,file,cb)
    {
        cb(undefined,`${file.originalname}`)
    }
 })

app.post("/come",upload.single(`images`),async(req,res) => {
    if(req.file)
    {
    req.body.images = req.file.filename
    }
    req.body.password = await bcrypt.hash(req.body.password,8)
    const User = await new user(req.body)
    await User.save().then(() => {
        res.render("login",{})
    }).catch((error) => {
        res.render("404",{
            "error":"User already exist or Please fill all the details and upload your pic of .jpg extension.",
            "back":"/signup"
        })
    })
},(error,req,res,next) => {
    res.render("404",{
        "error":"Please upload your pic of .jpg extension.",
        "back":"/signup"
    })
})

app.get("/verify",async(req,res) => {
    const User = await user.find({"name":req.query.name})
    const pass = await bcrypt.compare(req.query.password,User[0].password)
    if(pass)
    {
        login = req.query.name
        res.render("main",{
            "name":User[0].name,
            "pass":User[0].password,
            "images":User[0].images.toString()
        })
    }
    else
    {
        res.render("404",{
            "error":"User not Found or Wrong Password.",
            "back":"/"
    })
}
})

app.get("/verify1",async(req,res) => {
    const User = await user.find({"name":req.query.name})
    if(JSON.stringify(User) != "[]")
    {
        login = req.query.name
        res.render("main",{
            "name":User[0].name,
            "images":User[0].images.toString()
        })
    }
    else
    {
        res.render("404",{
            "error":"User not Found or Wrong Password.",
            "back":"/"
    })
}
})

app.get("/code",async(req,res) => {
    const code = await ext.find({"name":req.query.lan})
    const User = await user.find({"name":login})
    res.render("code",{
        "name":code[0].name,
        "desc":code[0].desc,
        "yname":User[0].name
    })
})

app.post("/coment",async(req,res) => {
    const User = await user.find({"name":login})
    const code = await ext.find({"name":req.query.name})
    const coment = await new comment({"name":login,"title":req.body.title,"comment":req.body.comment,"lang":req.query.name,"image":User[0].images})
    coment.save().then(() => {
        res.render("code",{
            "name":code[0].name,
            "desc":code[0].desc,
            "yname":User[0].name
        })
    })
})

app.get("/comments",async(req,res) => {
    const coment = await comment.find({"lang":req.query.lang})
    imgarr = []
    for(let i=0;i<coment.length;i++)
    {
        imgarr.push(coment[i].image.toString())
    }
    res.send({
        "comment":coment,
        "img":imgarr 
    })
})

app.get("/logout",(req,res) => {
    login=""
    res.render("login",{})
})

app.listen(port,() => {
    console.log("Server is on Port " + port)
})
