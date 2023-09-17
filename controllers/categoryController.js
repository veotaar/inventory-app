const Item = require('../models/item');
const Category = require('../models/category');

const asyncHandler = require('express-async-handler');

exports.category_list = asyncHandler(async (req, res, next) => {
  const allCategories = await Category.find()
    .sort({ name: 1 })
    .exec();

  res.render('category_list', { title: 'Item List', category_list: allCategories });
});
