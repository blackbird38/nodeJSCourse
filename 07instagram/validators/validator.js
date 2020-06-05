const {body} = require('express-validator/check');

exports.hasDescription = body('description')
        .isLength({min: 5})
        .withMessage('Description is required. Min length is 5 characters')
exports.isEmail = body('email')
        .isEmail()
        .withMessage('Email field must contain a valid address');
exports.hasPassword = body('password')
        .exists()
        .withMessage('Password is required cannot be empty');
exports.hasName = body('name')
        .isLength({min: 5})
        .withMessage('Description is required. Min length is 5 characters');