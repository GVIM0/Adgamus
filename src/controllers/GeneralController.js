function Ajustes(req, res){
    res.render('general/ajustes',{ name: req.session.name});

}

module.exports = {
    Ajustes,
}