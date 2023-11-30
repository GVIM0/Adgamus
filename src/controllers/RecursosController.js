function inicioRecursos(req, res) {

    res.render('moduloRecursos/inicio', { name: req.session.name, module: "Recursos" });

}

module.exports = {
    inicioRecursos,

}