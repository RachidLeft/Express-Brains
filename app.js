"use strict";
//Activation de express
const express = require('express')
const app = express();
const port = 3000;
//Activation de express-validator pour valider le contenu des formulaires
const {body, validationResult} = require('express-validator');
//Activation du Path pour génrer le chemin des views
const path = require('path');

//Importation du router
const gamerouter = require('./router/game-router')
const userRouter = require('./router/user-router')
//Importation de la base de données
const mongoose = require('./model/connectDb');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended : true}))
// Activation du systeme de session
const session = require('express-session');
app.use(session({
   secret: '!changeme!',
   saveUninitialized: true,
   resave: true
 }));

//Activation du système body parser
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: false}))
//Configurer mon système de vues ejs
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

//Routes vers game-router
app.use('/', gamerouter)

//router vers user-router
app.use('/', userRouter)



app.use((req,res) => {
    res.status(404).send('Error 404 : page not found')
})

app.listen(port, () =>{
    console.log(`Mon serveur Express tourne sur le port ${port}`);
})