function perfil(req, res){
    res.render('user/perfil', { name: req.session.name, admin: req.session.admin });
}


module.exports = {
    perfil,  
}
