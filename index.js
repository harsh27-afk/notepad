const express=require("express")
const app=express();
const path=require("path")
const fs=require("fs");


app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,'public')))  // sets path for html,css and js static files

app.set("view engine","ejs");

app.get("/",function(req,res){
    fs.readdir("./files",(err,files)=>{
        // console.log(files[1].length);  files is an array of files provided by the path given
        res.render("index", {files:files})
    })
    
})

app.post("/create",(req,res)=>{
    fs.writeFile(`./files/${req.body.title.split(" ").join("")}.txt`, req.body.details,(err)=>{
        console.log(req.params)
         res.redirect("/")
    })



    // console.log(req.body);
    // res.send(`data received ${req.body.title}`)
})

app.get("/file/:filename",(req,res)=>{     // english conversion of data
    fs.readFile(`./files/${req.params.filename}`, "utf-8",function(err,filedata){
        res.render("show",{fileName:req.params.filename, fileData:filedata})
    })
})

app.post("/delete/:filename",(req,res)=>{
     
      
      fs.unlink(`./files/${req.params.filename}`,(err)=>{
              res.redirect("/")
      })
})

app.get("/edit/:filename",(req,res)=>{
      res.render("edit",{filename:req.params.filename})
})

app.post("/edit",(req,res)=>{
     fs.rename(`./files/${req.body.previous}`,`./files/${req.body.new}`,(err)=>{
        res.redirect("/")
     })
})



app.listen(1000,()=>{
    console.log("app running on port 1000")
})