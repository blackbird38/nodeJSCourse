const express = require('express');
const router = express.Router();
const postController = require('../controllers/post');
const {hasDescription} = require('../validators/validator');
const multerImageUploader = require('../middleware/multer');

router.get('/', postController.index);
router.post('/', multerImageUploader('posts').single('image'), hasDescription, postController.store);

module.exports = router;