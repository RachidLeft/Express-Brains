//Importation de uuid
const{ v4:uuidv4 } = require('uuid')
const User = require('../model/userModel.js') 

//Activation de express-validator pour valider le contenu des formulaires
const {body, validationResult} = require('express-validator');

const inscriptionView =(req,res) =>{
    let errors=[];
    res.render('inscription', {errors: errors})
}

const connectionView = (req,res) =>{
    let errors=[];
    let message = req.session.message;
    delete req.session.message;
    res.render('connection',{errors: errors, message: message});
}

const newUser =  async(req,res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).render('inscription.ejs',{
            email: req.body.email,
            username: req.body.username,
            errors: errors.array()
        });
    }
    await User.create({
        email: req.body.email,
        pseudo: req.body.username,
        password: req.body.password,
        uuid: uuidv4(),
        admin: false
    })
    req.session.message = `Votre compte avec l'adresse ${req.body.email} a bien été créé.`;
    res.redirect('/connection');

}

const connectionUser = async(req,res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).render('connection.ejs', {
            errors: errors.array(),
            email: req.body.email
        });
    }

    //Rechercher l'utilisateur par email et mot de passe
    try {
        const user = await User.findOne({email: req.body.email});
        if (!user) {
            return res.status(422).render('connection.ejs', {
                errors: [{msg: 'Email ou mot de passe incorrect'}],
                email: req.body.email
            });
        }
        if (user.password !== req.body.password) {
            return res.status(422).render('connection.ejs', {
                errors: [{msg: 'Email ou mot de passe incorrect'}],
                email: req.body.email
            });
        }               
        req.session.user = user;
        res.redirect('/');
    } catch (error) {
        console.error(error);
        res.status(500).send('Erreur interne');
    }

}

module.exports = {
    inscriptionView,
    connectionView,
    newUser,
    connectionUser
}