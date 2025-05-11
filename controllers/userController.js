const User = require("../models/user.js");

exports.editProfile = async (req, res) => {
    try{
        if(!req.body) res.status(400);
        const user = await User.findOneAndUpdate({_id : req.body.id}, req.body, {new:true});
        res.json({});
    } catch(error){
        console.error("Ошибка при редактировании профиля", error)
    }
}

exports.getPage = async (req, res) => {
    console.log("gerPage");

    const id = req.params["id"];
    const user = await User.findOne({_id : id});
    if(user.avatarName){
        res.render('userProfile.hbs', {
                user : user,
                photo : `/uploads/avatars/${user.avatarName}`
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
