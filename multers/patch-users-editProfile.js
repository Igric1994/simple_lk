// utils/upload.js
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads/'); // Папка для сохранения
  },
  filename: (req, file, cb) => {
    const id = req.params["id"];
    if(!id) return cb(new Error('Отсутсвует id'));
    const newName = id + file.originalname;
    cb(null, id + file.originalname); // Генерируем уникальное имя
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Лимит 5 МБ
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Только JPG, PNG или GIF!'));
    }
  }
});

module.exports = upload;