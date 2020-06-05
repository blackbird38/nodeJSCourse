const Post = require('../models/post');
const validationHandler = require('../validators/validationHandler');

exports.index = async (req, res) => { // insomnia GET http://localhost:3000/api/post/id
    // throw new Error('Random error');
    // res.send({message: 'coucou'});
    try {
        const posts = await Post.find().sort({createdAt: -1});
        res.send(posts);
    }catch(err) {
        next(err);
    }

};

exports.show = async (req, res, next) =>{ // insomnia GET http://localhost:3000/api/post 
    try {
        const post = await Post.findOne({_id: req.params.id});
        res.send(post);
    }catch(err){
        next(err);
    }
};

exports.store = async (req, res, next) => { // insomnia POST multipart (description, image (select file)) http://localhost:3000/api/post
    try {
        validationHandler(req);
        // res.send({message: `The name is ${req.body.name}`});
        let post = new Post();
        post.description = req.body.description;
        post.image = req.file.filename;
        post = await post.save();
        res.send(post);
    }catch(err) {
        next(err);
    }

};