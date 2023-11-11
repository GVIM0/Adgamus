const bcrypt = require('bcrypt');

function login(req, res){

    if(req.session.loggedin != true){

        res.render('login/index');

    } else{

        res.redirect('/');
    }
}

function auth(req, res) {
    const data = req.body;

    req.getConnection((err, conn) => {
        if (err) {
            // Manejar errores de conexión a la base de datos
            console.error('Error de conexión a la base de datos:', err);
            return res.status(500).send('Error interno del servidor');
        }

        conn.query('SELECT * FROM usuario WHERE CorreoUsuario = ?', [data.CorreoUsuario], (err, userdata) => {
            if (err) {
                // Manejar errores de consulta a la base de datos
                console.error('Error en la consulta a la base de datos:', err);
                return res.status(500).send('Error interno del servidor');
            }

            if (userdata.length > 0) {
                userdata.forEach(element => {
                    bcrypt.compare(data.Contraseña, element.Contraseña, (err, isMatch) => {
                        if (err) {
                            // Manejar errores al comparar contraseñas
                            console.error('Error al comparar contraseñas:', err);
                            return res.status(500).send('Error interno del servidor');
                        }

                        if (!isMatch) {
                            res.render('login/index', { error: 'Error: ¡Contraseña incorrecta!' });
                        } else {
                            req.session.loggedin = true;
                            req.session.name = element.NombreUsuario;
                            res.redirect('/');
                        }
                    });
                });
            } else {
                res.render('login/index', { error: 'Error: ¡Usuario no existente!' });
            }
        });
    });
}


function register(req, res){

    if(req.session.loggedin != true){

        res.render('login/register');

    } else{

        res.redirect('/');
    }
}

function storeUser(req,res){
    const data = req.body;

    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM usuario WHERE CorreoUsuario = ?', [data.CorreoUsuario], (err, userdata) =>{
            if(userdata.length > 0){
                res.render('login/register', {error: 'Error: ¡Usuario ya existente!'});
            } else{

                bcrypt.hash(data.Contraseña, 12).then(hash =>{
                    data.Contraseña = hash;
            
                    req.getConnection((err, conn) => {
                        conn.query('INSERT INTO usuario SET ?', [data], (err, rows) => {

                            req.session.loggedin = true;
                            req.session.name = data.NombreUsuario;

                            res.redirect('/');
                        });
                    });
                });
            }
        })
    });
}

function logout(req, res){
    if(req.session.loggedin == true){

        req.session.destroy();
    }
        res.redirect('login');
    
}

module.exports = {
    login,
    register,
    storeUser,
    auth,
    logout,  
}
