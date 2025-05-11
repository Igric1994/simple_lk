const multer = require('multer');
const path = require('path');
const fs = require('fs');
const uploadDir = 'uploads/avatars';
const User = require('../models/user');

// Проверяем и создаем папку, если ее нет
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storeConf = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, "./uploads/avatars");
    },
    filename: async(req, file, cb) =>{
        console.log("multer");
        const id = req.params['id'];
        console.log(id)
        const fileName = id + file.originalname;
        const user = await User.findOneAndUpdate({_id : id}, {avatarName : fileName}, {new:true});
        console.log(user);
        if(id) {
            cb(null, fileName);
        }
    }
})

module.exports = multer({storage:storeConf}).single('avatar');
