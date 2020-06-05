const Post = require('../models/post');
const validationHandler = require('../validators/validationHandler');

exports.index = async (req, res) => { // insomnia GET http://localhost:3000/api/post
    // throw new Error('Random error');
    try {
        const posts = await Post.find({
            user: {$in : [...req.user.following, req.user.id]}
        }).populate('user').sort({createdAt: -1});
        res.send(posts);
    }catch(err) {
        next(err);
    }

};

exports.show = async (req, res, next) =>{ // insomnia GET http://localhost:3000/api/post/id
    try {
        const post = await Post.findOne({
            _id: req.params.id, 
            user: {$in : [...req.user.following, req.user.id]}
        }).populate('user');
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
        post.user = req.user;
        post = await post.save();
        res.send(post);
    }catch(err) {
        next(err);
    }
};

exports.update = async (req, res, next) => { // insomnia PATCH json (description ) http://localhost:3000/api/post/id
    try {
        validationHandler(req);
        let post = await Post.findById({
            _id: req.params.id
        });
        console.log(post,  req.user.id);
        // throw an error if the user requesting the update is not the author
        if (!post || post.user != req.user.id){
            const error = new Error('Wrong request, you are not the author of this post, you cannot modify it.');
            error.statusCode = 400;
            throw error;
        }
        post.description = req.body.description;
        post = await post.save();
        res.send(post);
    }catch(err) {
        next(err);
    }
};

exports.delete = async (req, res, next) => { // insomnia DELETE  http://localhost:3000/api/post/id
    try {
        validationHandler(req);
        let post = await Post.findById(req.params.id);
        // throw an error if the user requesting the delete is not the author
        if (!post || post.user != req.user.id) {
            const error = new Error("you are not the author of this post, you cannot delete it.");
            error.statusCode = 400;
            throw error;
          } 
        await post.delete();
        res.send({message: 'Delete successful.'});
    }catch(err) {
        next(err);
    }
};