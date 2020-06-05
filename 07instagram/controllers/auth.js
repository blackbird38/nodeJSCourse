const User = require('../models/user');
const jwt = require('jwt-simple');
const config = require("../config")

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

exports.signup = async (req, res, next) => { // insomnia GET http://localhost:3000/api/user/login
    try {
       // validationHandler(req);
        const existingUser = await User.findOne({email: req.body.email});
        const email = req.body.email;
        const password = req.body.password;
        if(existingUser){
            const error = new Error('Existing user');
            error.statusCode = 401;
            throw error;
        }

        let user = new User();
        user.email = req.body.email;
        console.log(req.body.password);
        user.password = await user.encryptPassword(req.body.password);
        user.name = req.body.name;

        user = await user.save();
        
        const token = jwt.encode({id: user.id}, config.jwtSecret);
        res.send({user, token});
    }catch(err) {
        next(err);
    }
};

exports.login = async (req, res, next) => { // insomnia GET http://localhost:3000/api/user/login
    try {
        const email = req.body.email;
        const password = req.body.password;
        
        const user = await User.findOne({ email }).select("+password");
        if(!user){
            const error = new Error('Wrong credentials');
            error.statusCode = 401;
            throw error;
        }
        console.log(user);
        const validPassword = await user.validPassword(password, user.password);
        if(!validPassword){
            const error = new Error('Wrong credentials');
            error.statusCode = 401;
            throw error;
        }
        const token = jwt.encode({id: user.id}, config.jwtSecret);
        res.send({user, token});
    }catch(err) {
        next(err);
    }
};

exports.me =  async (req, res, next) => {
    try {
      const user = await User.findById(req.user);
      return res.send(user);
    } catch (err) {
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