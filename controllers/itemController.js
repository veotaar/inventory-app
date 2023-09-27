const Item = require('../models/item');
const Category = require('../models/category');

const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');

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

exports.item_create_post = [
  // Convert the category to an array.
  (req, res, next) => {
    if (!(req.body.category instanceof Array)) {
      if (typeof req.body.category === 'undefined') req.body.category = [];
      else req.body.category = new Array(req.body.category);
    }
    next();
  },

  // Validate and sanitize the name field.
  body('name', 'Item name must contain at least 3 characters')
    .trim()
    .isLength({ min: 3 })
    .escape(),

  body('description', 'Description must contain at least 3 characters')
    .trim()
    .isLength({ min: 3 })
    .escape(),

  body('price', 'Description must contain at least 1 character')
    .trim()
    .isLength({ min: 1 })
    .escape(),

  body('stock', 'Description must contain at least 1 character')
    .trim()
    .isLength({ min: 1 })
    .escape(),

  body('category.*').escape(),

  // Process request after validation and sanitization.
  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create a category object with escaped and trimmed data.
    const item = new Item({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      number_in_stock: req.body.stock,
      category: req.body.category
    });

    if (!errors.isEmpty()) {
      // There are errors. Render the form again with sanitized values/error messages.

      // get all categories for form
      const allCategories = await Category.find().exec();

      // mark selected categories as checked

      for (const category of allCategories) {
        if(item.category.includes(category._id)) {
          category.checked = 'true';
        }
      }

      res.render('item_form', {
        title: 'Create Item',
        item: item,
        categories: allCategories,
        errors: errors.array(),
      });
      // return;
    } else {
      // Data from form is valid. Save item
      await item.save();
      res.redirect(item.url);
    }
  }),
];

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