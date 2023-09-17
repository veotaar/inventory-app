const express = require('express');
const router = express.Router();

const item_controller = require('../controllers/itemController');
const category_controller = require('../controllers/categoryController');

// item routes

router.get('/', item_controller.index);

router.get('/items', item_controller.item_list);

router.get('/categories', category_controller.category_list);

module.exports = router;