const Item = require('../models/item');
const Category= require('../models/category');
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require('express-validator');

exports.index = asyncHandler(async(req, res, next) => {
    [
        numItem,
        numCategory
    ] = await Promise.all([
        Item.countDocuments({}).exec(),
        Category.countDocuments({}).exec(),
    ]);
    res.render('index', {
        title: "Главная страница",
        item_count: numItem,
        category_count: numCategory
        }
    )
});

exports.item_list = asyncHandler(async(req, res, next) => {
    const allItems = await Item.find().sort({name: 1}).populate('genre').exec();
    console.log(allItems);
    res.render('item_list', { title: "Список товаров", item_list: allItems });
})

exports.item_detail = asyncHandler(async(req, res, next) => {
    const itemDetail= await Item.findById(req.params.id).populate('genre').exec();
    res.render("item_detail", {title: itemDetail.name, item_detail: itemDetail });
})

exports.item_create_get = asyncHandler(async(req, res, next) => {
    const categories = await Category.find().sort({name: 1}).exec();
    res.render('item_form', {title: "Форма создания продукта", categories: categories});
})

exports.item_create_post = [
    body("name", "Название должно состоять из букв")
        .trim()
        .matches(/^[а-яА-ЯёЁa-zA-Z0-9\s]+$/) // Пользовательский регекс для кириллических символов и пробелов
        .escape(),
    body("description", "Описание должно состоять из букв")
        .trim()
        .matches(/^[а-яА-ЯёЁa-zA-Z0-9\s]+$/) // Пользовательский регекс для кириллических символов и пробелов
        .escape(),
    body("price", "Цена должна состоять из цифр")
        .trim()
        .isNumeric()
        .escape(),
    body("weight", "Вес должен состоять из цифр")
        .trim()
        .isNumeric()
        .escape(),

    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);

        const item = new Item({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            weight: req.body.weight,
            genre: req.body.category,
            inStock: "true"
        });
        if (!errors.isEmpty()) {
            const categories = await Category.find().sort({ name: 1 }).exec();

            res.render('item_form', {
                title: 'Форма создания продукта',
                categories: categories,
                item: item,
                errors: errors.array()
            });
            return;
        } else {
            await item.save();
            res.redirect('/catalog');
        }
    })
];

exports.item_delete_get = asyncHandler(async(req, res, next) => {
    const item = await Item.findById(req.params.id).exec();
    res.render("delete_form", {item: item})
})

exports.item_delete_post = asyncHandler(async(req, res, next) =>{
    const item = await Item.findById(req.body.itemid).exec();

    if(item===null) {
        res.redirect('/catalog')
    }

    await Item.findByIdAndDelete(req.body.itemid);
    res.redirect('/catalog');
})


exports.item_update_get = asyncHandler(async(req, res, next) => {
    const [item, category]  = await Promise.all([
        Item.findById(req.params.id).exec(),
        Category.find().exec()
    ])
    res.render('item_form', {
        item: item,
        categories: category
    })

})

exports.item_update_post = [
    body("name", "Название должно состоять из букв")
        .trim()
        .matches(/^[а-яА-ЯёЁa-zA-Z0-9\s]+$/) // Пользовательский регекс для кириллических символов и пробелов
        .escape(),
    body("description", "Описание должно состоять из букв")
        .trim()
        .matches(/^[а-яА-ЯёЁa-zA-Z0-9\s]+$/) // Пользовательский регекс для кириллических символов и пробелов
        .escape(),
    body("price", "Цена должна состоять из цифр")
        .trim()
        .isNumeric()
        .escape(),
    body("weight", "Вес должен состоять из цифр")
        .trim()
        .isNumeric()
        .escape(),

    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);

        const item = await Item.findById(req.params.id).exec();

        const newItem = new Item({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            weight: req.body.weight,
            genre: req.body.category,
            inStock: "true",
            _id: item._id,
        });
        if (!errors.isEmpty()) {
            const categories = await Category.find().sort({ name: 1 }).exec();

            res.render('item_form', {
                title: 'Форма создания продукта',
                categories: categories,
                item: item,
                errors: errors.array()
            });
            return;
        } else {
            const updateItem = await Item.findByIdAndUpdate(
                req.params.id, newItem, {new: true}
            )
            res.redirect('/catalog/items')
        }
    })
];