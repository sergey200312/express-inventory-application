const Author = require('../models/author');
const asyncHandler = require('express-async-handler');

exports.author_list = asyncHandler(async(req, res, next) => {
    const allAuthors = await Author.find().sort({name: 1}).exec();
    res.render('author_list', {title: 'Список авторов', author_list: allAuthors});
})