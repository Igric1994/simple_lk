const User = require("../models/user.js");
const bcrypt = require('bcryptjs');

exports.signin = async (req, res) => {
    
    try{
        if (!req.body || !req.body.login || !req.body.pass) {
            
            return res.status(400).render('authPanel.hbs', { 
                error: 'Логин и пароль обязательны для заполнения' 
            });
        }
    
        const { login, pass } = req.body;

        const user = await User.findOne({login});

        if(!user) {
                return res.status(401).render('authPanel.hbs', { 
                error: 'Неверные учётные данные'
            });
        }

        const isPassValid = await bcrypt.compare(pass, user.pass);
        
        if (!isPassValid) {
            
            return res.status(401).render('authPanel.hbs', { 
                error: 'Неверные учётные данные'
            });
        }

        

        res.redirect(`../users/${user._id}`);
    } catch (error) {
        console.error(error);
        res.status(500).render('authPanel.hbs', {
            error: 'Произошла ошибка при авторизации. Пожалуйста, попробуйте позже'
        });
    }
}

exports.reg = async function (request, response){
    if (!request.body || !request.body.login || !request.body.pass) {
        return response.status(400).render('authPanel.hbs', { 
            error: 'Логин и пароль обязательны для заполнения' 
        });
    }

    const { login, pass } = request.body;
        
    
    const existingUser = await User.findOne({ login : login});

    if (existingUser) {
        console.log(5);
        return response.status(409).render('authPanel.hbs', {
            error: 'Пользователь с таким логином уже существует. Войдите в аккаунт или используйте другой логин'
        });
    }

    let hashedPass;
    try{
        hashedPass = await bcrypt.hash(pass, 10); 
    } catch(error){
        console.error("Hash error" + error)
    }

    const user = new User({ 
        login, 
        pass : hashedPass
    });
    await user.save();
    console.log(7);
    console.log(8);

    response.redirect(`../users/${user._id}`);
}

exports.getAuthPanel =  async(req, res) => {
    res.render('authPanel.hbs');
}

exports.logout = (req, res) => {
    res.redirect("/");
}