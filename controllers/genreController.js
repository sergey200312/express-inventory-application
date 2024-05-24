const asyncHandler = require('express-async-handler');
const Genre = require('../models/genre');

exports.genre_list = asyncHandler(async(req, res, next) => {
    const allGenres = await Genre.find().sort({name: 1}).exec();
    res.render('genre_list', {title: 'Список жанров', genre_list: allGenres})
})

exports.genre_detail = asyncHandler(async(req, res, next) => {
    const genreDetail = await Genre.findById(req.params.id).exec();
    res.render("genre_detail", {genre_detail: genreDetail});
})

