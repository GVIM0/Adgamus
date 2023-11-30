const bcrypt = require('bcrypt');

function login(req, res){

    if(req.session.loggedin != true){

        res.render('login/index');

    } else{

        res.redirect('/Adgamus/');
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

        conn.query('SELECT * FROM Usuario WHERE CorreoUsuario = ?', [data.CorreoUsuario], (err, userdata) => {

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
                            let admin = element.Administrador
                            if(admin === 1){
                                req.session.loggedin = true;
                                req.session.name = element.NombreUsuario;
                                req.session.admin = element.Administrador;
                                res.redirect('/Adgamus/');
                            }
                            else{
                                req.session.loggedin = true;
                                req.session.name = element.NombreUsuario;
                                res.redirect('/Adgamus/');
                            }
   
                            
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

function storeUser(req, res) {
    const data = req.body;

    req.getConnection((err, conn) => {
        if (err) {
            // Manejar errores de conexión a la base de datos
            console.error('Error de conexión a la base de datos:', err);
            return res.status(500).send('Error interno del servidor');
        }

        const checkUserQuery = 'SELECT * FROM Usuario WHERE CorreoUsuario = ?';

        conn.query(checkUserQuery, [data.CorreoUsuario], (err, userdata) => {
            if (err) {
                // Manejar errores de consulta a la base de datos
                console.error('Error en la consulta a la base de datos:', err);
                return res.status(500).send('Error interno del servidor');
            }

            if (userdata.length > 0) {
                // El usuario ya existe
                return res.render('login/register', { error: 'Error: ¡Usuario ya existente!' });
            }

            // Usuario no existe, proceder con la inserción
            bcrypt.hash(data.Contraseña, 12).then(hash => {
                data.Contraseña = hash;

                const insertUserQuery = 'INSERT INTO Usuario SET ?';

                conn.query(insertUserQuery, [data], (err, rows) => {
                    if (err) {
                        // Manejar errores de inserción a la base de datos
                        console.error('Error al insertar usuario en la base de datos:', err);
                        return res.status(500).send('Error interno del servidor');
                    }

                    req.session.loggedin = true;
                    req.session.name = data.NombreUsuario;
                    

                    res.redirect('/Adgamus/');
                });
            });
        });
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
