const Game = require('../models/game');
const Genre = require('../models/genre');
const Author = require('../models/author');
const asyncHandler = require("express-async-handler");

exports.index = asyncHandler(async(req, res, next) => {
    [
        numGame,
        numAuthor, 
        numGenre
    ] = await Promise.all([
        Game.countDocuments({}).exec(),
        Author.countDocuments({}).exec(),
        Genre.countDocuments({}).exec()
    ]);
    res.render('index', {
        title: "Главная страница",
        game_count: numGame,
        author_count: numAuthor,
        genre_count: numGenre 
        }
    )
});