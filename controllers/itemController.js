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
})