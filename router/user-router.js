//Pour la gestion du router
const express = require('express')
const router = express.Router()
const {inscriptionView, connectionView, newUser, connectionUser} = require('../controller/userController.js')
  
//Activation de express-validator pour valider le contenu des formulaires
const {body, validationResult} = require('express-validator');
const { connection } = require('mongoose');

//Dirige vers inscription.ejs
router.get('/inscription', inscriptionView)

//Creation de l'utilisateur avec validation des champs
router.post('/inscription',
    body('email')
        .trim()
        .isEmail().withMessage("Merci de saisir une adresse email valide"),
    body('username')
        .trim()
        .isLength({min : 3}).withMessage("Le pseudo doit contenir au moins 3 caractères"),
    body('password')
        .trim()
        .isLength({min : 4}).withMessage("Le mot de passe doit contenir au moins 4 caractères"),
    body('confirmPassword')
        .custom((value, {req}) => {
            if (value !== req.body.password) {
                throw new Error('Les mots de passe ne correspondent pas')
            }
            return true
        }).withMessage('Les mots de passe ne correspondent pas'),
        newUser
   )

//Dirige vers connection.ejs
router.get('/connection', connectionView)

//Connexion de l'utilisateur
router.post('/connection', 
    body('email')
        .trim()
        .isEmail().withMessage("Merci de saisir une adresse email valide"),
    body('password')
        .trim()
        .isLength({min : 4}).withMessage("Le mot de passe doit contenir au moins 4 caractères"),
    connectionUser
)   

module.exports = router;