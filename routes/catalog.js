const express = require('express');
const itemController = require('../controllers/itemController');
const categoryController = require('../controllers/categoryController');

 const router = express.Router();

router.get('/', itemController.index);

router.get('/items', itemController.item_list);

router.get('/item/:id', itemController.item_detail);

router.get('/categories', categoryController.category_list);

router.get('/category/:id', categoryController.category_detail);

router.get('/create', categoryController.create_category_get);

router.post('/create', categoryController.create_category_post);

router.get('/create/item', itemController.item_create_get)

router.post('/create/item', itemController.item_create_post);

router.get('/category/:id/update', categoryController.update_category_get);

router.post('/category/:id/update', categoryController.update_category_post);

router.get('/item/:id/delete', itemController.item_delete_get);

router.post('/item/:id/delete', itemController.item_delete_post);

router.get('/category/:id/delete', categoryController.category_delete_get);

router.post('/category/:id/delete', categoryController.category_delete_post);

router.get('/item/:id/update', itemController.item_update_get);

router.post('/item/:id/update', itemController.item_update_post)
// router.get('/genre/:id', genreController.genre_detail);


module.exports = router;