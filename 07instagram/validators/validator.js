const {body} = require('express-validator/check');

exports.hasDescription = body('description')
        .isLength({min: 5})
        .withMessage('Description is required. Min length is 5 characters')