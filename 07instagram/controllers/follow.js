const User = require('../models/user');

exports.follow = async (req, res, next) => { // insomnia POST (empty json, Header: Authorization Bearer the-token-of-a-logged-user)
                                            // http://localhost:3000/api/user/follow/5eda5e3c41dd4b2364d1003a
    try {
        const currentUser = req.user;
        const followedUserId = req.params.id;
        // before adding here, check if the id doesn't already exists in the 'following' prop of current user
        currentUser.following.push(followedUserId);
        currentUser.save();
        res.send({message: 'Success'});
    }
    catch (err) {
        next(err);
    }
};