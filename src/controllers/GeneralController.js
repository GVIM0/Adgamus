function Ajustes(req, res){
    const name = req.session.name;
    const admin = req.session.admin; 

    if (admin) {
        res.render('general/ajustes', { name: name, admin: admin });
    } else {
        res.render('general/ajustes', { name: name});
    }
}

module.exports = {
    Ajustes,
}