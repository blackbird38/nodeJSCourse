const express = require('express');
const router = express.Router();
const postController = require('../controllers/post');
const {hasDescription} = require('../validators/validator');
const multerImageUploader = require('../middleware/multer');

router.get('/', postController.index);
router.get('/:id', postController.show);
router.post('/', 
            multerImageUploader('posts').single('image'), 
            hasDescription, 
            postController.store);
 
router.patch('/:id', 
              hasDescription, 
              postController.update);

router.delete('/:id', postController.delete);              

module.exports = router;