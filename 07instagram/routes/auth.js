const express = require('express');
const router = express.Router();
const userController = require('../controllers/auth');
const {isEmail, hasPassword, hasName} = require('../validators/validator');
const passportJWT = require('../middleware/passportJWT')();


router.get('/', userController.getAll);
router.post('/login', userController.login);
router.post('/signup', [isEmail, hasPassword, hasName], userController.signup);
router.get("/me" , passportJWT.authenticate(), userController.me);

module.exports = router;