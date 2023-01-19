const express=require('express')
const path=require('path')
const app =express()
const process=require('process')
app.use(express.json())
const bodyParser = require('body-parser');
const {imagetype,myMulter}=require("./multer.js")
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/style.css",express.static(path.join(__dirname, "style.css")))
app.use("/uploads", express.static(path.join(__dirname, './uploads/picture')))
app.get('/index.html',(req,res)=>{
    res.sendFile(process.cwd()+"/index.html")
})
app.post('/api/fileanalyse',myMulter("/picture",imagetype.Type).single("upfile"),(req,res)=>{
    console.log(req.imagevalidtype)
    if(req.imagevalidtype){
    res.json({message:"not imagevalidtype"})
    }else{
        res.json({name:req.file.originalname,type:req.file.mimetype,size:req.file.size})
    }
})
app.listen(5500,()=>{
    console.log("done")
})