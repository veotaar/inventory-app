const express = require('express');
const router = express.Router();

const item_controller = require('../controllers/itemController');
const category_controller = require('../controllers/categoryController');

// item routes

router.get('/', item_controller.index);

router.get('/item/create', item_controller.item_create_get);
router.post('/item/create', item_controller.item_create_post);

router.get('/item/:id/delete', item_controller.item_delete_get);
router.post('/item/:id/delete', item_controller.item_delete_post);

router.get('/item/:id/update', item_controller.item_update_get);
router.post('/item/:id/update', item_controller.item_update_post);

router.get('/item/:id', item_controller.item_detail);

router.get('/items', item_controller.item_list);

router.get('/categories', category_controller.category_list);

module.exports = router;