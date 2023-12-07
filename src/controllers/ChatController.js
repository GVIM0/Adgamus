function ChatAyuda(req, res) {
    const name = req.session.name;
    const admin = req.session.admin;

    if (admin) {
        res.render('admin/ayuda', { name: name, admin: admin });
    } else {
        res.render('general/ayuda', { name: name });
    }
}

module.exports = {
    ChatAyuda,
}  