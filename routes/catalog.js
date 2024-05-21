const express = require('express')
const gameController = require('../controllers/gameController')

const router = express.Router();

router.get('/', gameController.index)

router.get('/game', gameController.game_list)

module.exports = router;