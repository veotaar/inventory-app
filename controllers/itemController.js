const Item = require('../models/item');
const Category = require('../models/category');

const asyncHandler = require('express-async-handler');

exports.index = asyncHandler(async (req, res, next) => {
  // get item and category counts
  const [numItems, numCategories] = await Promise.all([Item.countDocuments({}).exec(), Category.countDocuments({}).exec()]);

  res.render('index', {
    title: 'Inventory',
    item_count: numItems,
    category_count: numCategories,
  })
});

exports.item_list = asyncHandler(async (req, res, next) => {
  const allItems = await Item.find({}, 'name category').sort({ name: 1 }).populate('category').exec();

  res.render('item_list', {title: 'Item List', item_list: allItems});
});

exports.item_create_get = asyncHandler(async (req, res, next) => {
  const allCategories = await Category.find().exec();

  res.render('item_form', {
    title: 'Create Item',
    categories: allCategories
  });

});

exports.item_create_post = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: item create post');
});

exports.item_delete_get = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: item delete get');
});

exports.item_delete_post = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: item delete post');
});

exports.item_update_get = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: item update get');
});

exports.item_update_post = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: item update post');
});

exports.item_detail = asyncHandler(async (req, res, next) => {
  const item = await Item.findById(req.params.id).populate('category').exec();

  if (item === null) {
    // No results.
    const err = new Error('Book not found');
    err.status = 404;
    return next(err);
  }

  res.render('item_detail', {
    title: item.name,
    item: item
  })

})