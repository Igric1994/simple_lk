const User = require("../models/user.js");

exports.editProfile = async (req, res) => {
    try{
        if(!req.body) res.status(400);
        const id = req.params["id"]
        await User.findOneAndUpdate({_id : id}, req.body, {new:true});
        res.json({});
    } catch(error){
        console.error("Ошибка при редактировании профиля", error)
    }
}

exports.getPage = async (req, res) => {
    console.log("gerPage");

    const id = req.params["id"];
    const user = await User.findOne({_id : id});
    if(user.avatar){
        res.render('userProfile.hbs', {
                user : user,
                photo : `http://localhost:3000/uploads/${user.avatar}`
            });
    } else {
        res.render('userProfile.hbs', {
                user : user
            });
    }
}

exports.showcase = async (req, res) => {
    const allUsers = await User.find({});
    const id = req.query.id;
    res.render('showcaseOfUsers.hbs', {
        users: allUsers,
        id : id
    });
}

exports.savePhoto = async (req, res) => {
    try{
        if (!req.file) {
            console.error('Файл не загружен');
            return res.status(400).json({ error: 'Файл не загружен' });
        }

        const avatarPath = `${req.file.filename}`;
        const id = req.params["id"]
        await User.findByIdAndUpdate({_id:id}, { avatar: avatarPath });

        res.status(200).json({});
    } catch (err) {
        console.error('Ошибка загрузки фото', err)
        res.status(500).json({ error: 'Ошибка загрузки аватара' });
    }
}

exports.img = (req, res) => {
    res.render('imgTest.hbs',{
        path:'http://localhost:3000/uploads/Pasport_RF.jpg'
    })
}
