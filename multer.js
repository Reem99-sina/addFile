const fs= require("fs")
const multer= require("multer")
const  nanoId=require("nano-id")
const path =require("path")

const imagetype={
    Type:["image/jpeg","image/jpg","image/png"]
}
function myMulter(customPath, customvalid) {
 
      try { if (!customPath) {
            customPath = "general"
        }
        const fullPath = path.join(__dirname, `./uploads${customPath}`)
        if (!fs.existsSync(fullPath)) {
            fs.mkdirSync(fullPath, { recursive: true })
        }
        function fileFilte(req, file, cb) {
            console.log(customvalid,file)
            if (customvalid.includes(file.mimetype)) {
                cb(null, true)
            } else {
                req.imagevalidtype = true
                cb(null, false)
            }
        }
        const storage = multer.diskStorage({
            destination: function (req, file, cb) {
                req.destination = `uploads${customPath}`
                cb(null, fullPath)
            }, filename: function (req, file, cb) {
                const filestoragename = nanoId() + "_" + file.originalname
                cb(null, filestoragename)
            }
        })
        const upload = multer({ dest: fullPath, fileFilter:fileFilte, storage:storage })
        return upload}catch(error){
            console.log(error)
        }
}

module.exports = { myMulter, imagetype }