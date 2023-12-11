function Ajustes(req, res) {
    const name = req.session.name;
    const admin = req.session.admin;

    if (admin) {
        res.render('general/ajustes', { name: name, admin: admin });
    } else {
        res.render('general/ajustes', { name: name });
    }
}
function Home(req, res) {
    const name = req.session.name;
    const admin = req.session.admin;

    if (admin) {
        res.render('admin/admin', { name: name, admin: admin });
    } else {
        res.render('home', { name: name });
    }
}

module.exports = {
    Ajustes,
    Home,
}