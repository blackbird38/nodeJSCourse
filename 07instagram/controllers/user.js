const User = require('../models/user');

exports.newUser = async (req, res, next) => { // insomnia POST multipart (email, password, name) http://localhost:3000/api/user
    console.log(req.body);
    try {
        let user = new User();
        user.email = req.body.email;
        user.password = req.body.password;
        user.name = req.body.name;
        user = await user.save();
        res.send(user);
    }catch(err) {
        next(err);
    }
};

exports.getAll = async (req, res) => { // insomnia GET http://localhost:3000/api/user/
    try {
        const users = await User.find();
        res.send(users);
    }catch(err) {
        next(err);
    }

};