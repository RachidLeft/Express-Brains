//Pour la gestion du router
const express = require('express')
const router = express.Router()
const { gameView, replay, game, logout } = require('../controller/gameController.js')
 
// Dirige vers index.ejs
router.get('/', gameView)
// Dirige vers index.ejs pour rejouer
router.get('/replay', replay)
//Logique du jeu
router.post('/', game)
//logout
router.get('/logout', logout)

module.exports = router;