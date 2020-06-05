const express = require('express');
const router = express.Router();


const followController = require('../controllers/follow');

router.post('/:id', followController.follow);

module.exports = router;