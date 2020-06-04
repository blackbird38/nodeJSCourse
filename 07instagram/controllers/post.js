const Post = require('../models/post');
const validationHandler = require('../validators/validationHandler');

exports.index = (req, res) => {
    //throw new Error('Random error');
    res.send({message: 'coucou'});
};

exports.store = async (req, res, next) => {
    try {
        validationHandler(req);
        //res.send({message: `The name is ${req.body.name}`});
        let post = new Post();
        post.description = req.body.description;
        post.image = req.file.filename;
        post = await post.save();
        res.send(post);
    }catch(err) {
        next(err);
    }

};