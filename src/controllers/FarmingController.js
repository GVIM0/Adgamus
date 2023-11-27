function inicioCultivos(req, res) {

    res.render('moduloCultivos/inicio', { name: req.session.name, module: "Cultivos" });

}

function buscadorCultivos(req, res) {
    res.render('moduloCultivos/buscador', { name: req.session.name });
}

module.exports = {
    inicioCultivos,
    buscadorCultivos,
}
