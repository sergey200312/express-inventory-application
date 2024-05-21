const express = require('express');
const gameController = require('../controllers/gameController');
const genreController = require('../controllers/genreController');
const authorController = require('../controllers/authorController');

const router = express.Router();

router.get('/', gameController.index);

router.get('/games', gameController.game_list);

router.get('/genres', genreController.genre_list);

router.get('/authors', authorController.author_list);

module.exports = router;