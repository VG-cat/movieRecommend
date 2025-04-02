const multer = require('multer');
const fs = require('fs');


exports.upload = (req) =>{
    
    const imgurl =  req.file.path +'.' + req.file.originalname.split('.').reverse()[0]
    fs.renameSync(req.file.path, imgurl);
    return imgurl;

}
