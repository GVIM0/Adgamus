

function CRUDplantas(req, res){
        res.render('admin/CRUDplantas',{ name: req.session.name, admin: req.session.admin });

}


module.exports = {
    CRUDplantas,  
}
