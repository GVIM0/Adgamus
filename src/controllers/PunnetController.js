function inicioAnimal(req, res) {

    res.render('moduloPunnet/inicio', { name: req.session.name, module: "Punnet" });

}

module.exports = {
    inicioAnimal,

}