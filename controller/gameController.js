

const gameView = (req,res) => {
    if (!req.session.numeromystere) {
        req.session.numeromystere = parseInt(Math.random() * 100);
    }
    res.render('index', {numeromystere: req.session.numeromystere, message: '', user: req.session.user },)
}

const replay = (req,res) =>{
    req.session.numeromystere = parseInt(Math.random() * 100);
    res.redirect('/')
}

const game = (req,res) =>{
    
    const joueur = parseInt(req.body.game, 10);

     // Vérifier si l'entrée est un nombre
     if (isNaN(joueur)) {
        return res.render('index', {
            numeromystere: req.session.numeromystere,
            message: 'Erreur ! Vous devez saisir un nombre.'
        });
    }
    

    let message;
    if (joueur < req.session.numeromystere) {
        message = 'Vous êtes trop bas !';
    } else if (joueur > req.session.numeromystere) {
        message = 'Vous êtes trop haut !';
    } else {
        message = 'Bravo ! Vous avez gagné.';
    }

    res.render('index', {numeromystere: req.session.numeromystere, message: message})
}

const logout = (req, res) => {
    req.session.destroy()
    res.redirect('/')
}



module.exports = {gameView, replay, game, logout}