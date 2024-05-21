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

exports.game_list = asyncHandler(async(req, res, next) => {
    const allGames = await Game.find().sort({name: 1}).populate('author').exec();
    res.render('game_list', { title: "Информация об играх", game_list: allGames });
})