const asyncHandler = require('express-async-handler');
const Category = require('../models/category');
const Item = require('../models/item');
const { body, validationResult} = require('express-validator');

exports.category_list = asyncHandler(async(req, res, next) => {
    const allCategories = await Category.find().sort({name: 1}).exec();
    res.render('category_list', {title: 'Список категорий', category_list: allCategories})
});

exports.category_detail = asyncHandler(async(req, res, next) => {
    [categoryDetail, nameCategory] = await Promise.all([
         Item.find({genre: req.params.id}).exec(),
         Category.findById(req.params.id).exec()
    ])
    res.render("category_detail", {category_detail: categoryDetail, category_name: nameCategory});
});

exports.create_category_get = asyncHandler(async(req, res, next) => {
    res.render("category_form", {title: 'Форма создания категории'});
})

exports.create_category_post = [
    body("name")
      .trim()
      .isLength({min: 1})
      .withMessage("Название категории обязательно")
      .isAlpha('ru-RU')
      .withMessage("Название должно состоять из букв")
      .escape(),

    asyncHandler(async(req, res, next) => {
        const errors = validationResult(req);

        const category = new Category({
            name: req.body.name,
        })

        if(!errors.isEmpty()) {
            res.render("category_form", {
                title: "Форма создания категории",
                category: category,
                errors: errors.array(),
            });
            return;
        }
        else {
            await category.save();
            res.redirect('/catalog');
        }
    })
]

exports.update_category_get = asyncHandler(async(req, res, next) => {
    const category = await Category.findById(req.params.id).exec();
    if(category===null) {
        const err = new Error("Страница не найдена");
        err.status = 404;
        next(err);
    }
    res.render("category_form", {category:category})
})

exports.update_category_post = [
    body("name")
      .trim()
      .matches(/^\p{L}+$/u)
      .withMessage("Название должно состоять из букв")
      .escape(),

      asyncHandler(async(req, res, next) => {
        const errors = validationResult(req);

        const category = await Category.findById(req.params.id).exec();

        const newCategory = new Category({
            name: req.body.name,
            _id: category._id
        })

        if(!errors.isEmpty()) {
            res.render("category_form", {
                category:category,
                errors: errors.array(),
            })
        }
        else {
            const updateCategory = await Category.findByIdAndUpdate(
                req.params.id, newCategory, {new: true}
            )
            res.redirect('/catalog')
        }
      })
]

exports.category_delete_get = asyncHandler(async(req, res, next) => {
    const [category, item] = await Promise.all([
        Category.findById(req.params.id).exec(),
        Item.find({genre: req.params.id}).exec()
    ])

    res.render('category_delete', {
        category_name: category,
        category_detail: item
    })
})

exports.category_delete_post = asyncHandler(async(req, res, next) => {
    const [category, item] = await Promise.all([
        Category.findById(req.body.categoryid).exec(),
        Item.find({genre: req.params.id}).exec()
    ])

    if(item.length > 0) {
        res.render('category_delete', {
            category_name: category,
            category_detail: item
        })
    } else {
        await Category.findByIdAndDelete(req.body.categoryid);
        res.redirect('/catalog/categories')
    }
})

