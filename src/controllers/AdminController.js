const { render } = require("express/lib/response");

function CRUDplantas(req, res){
        res.render('admin/CRUDplantas',{ name: req.session.name, admin: req.session.admin });

}

function createPlants(req, res) {
    const data = req.body;

    req.getConnection(async (err, conn) => {
        if (err) {
            // Manejar errores de conexión a la base de datos
            console.error('Error de conexión a la base de datos:', err);
            return res.status(500).send('Error interno del servidor');
        }

        const checkPlantQuery = 'SELECT * FROM Cultivo WHERE Nombre_Genero = ? AND Nombre_Especie = ?';

        try {
            const [plantData] = await conn.promise().query(checkPlantQuery, [data.genero, data.especie]);

            if (plantData.length > 0) {
                // El registro ya existe
                return res.render('admin/CRUDplantas', { error: 'Error: Registro ya existente!' , name: req.session.name, admin: req.session.admin });
            }

            // Registro no existe, proceder con la inserción
            // Iniciar la transacción
            await conn.promise().beginTransaction();

            try {
                // Insertar datos en la tabla Catalogo_Taxonomia_C
                const [resultado1] = await conn.promise().query('INSERT INTO Catalogo_Taxonomia_C (Reino, Filo, Clase, Orden, Familia, Genero, Especie) VALUES (?, ?, ?, ?, ?, ?, ?)',
                    [data.reino, data.filo, data.clase, data.orden, data.familia, data.genero, data.especie]);

                const idCatalogoTaxonomia = resultado1.insertId;

                // Insertar datos en la tabla Cultivo
                await conn.promise().query('INSERT INTO Cultivo (Tipo, RegionGeografica, Foto, Nombre_Comun, Nombre_Especie, Nombre_Genero, Rasgos_Especificos, Informacion_Cuidado, Catalogo_Taxonomia_idCatalogo_Taxonomia) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
                    [data.tipo, data.regionGeografica, data.foto, data.nombreComun, data.especie, data.genero, data.rasgosEspecificos, data.informacionCuidado, idCatalogoTaxonomia]);

                // Hacer commit para aplicar los cambios
                await conn.promise().commit();

                console.log('Datos insertados correctamente.');
            } catch (error) {
                // Si hay un error, hacer rollback para deshacer los cambios
                await conn.promise().rollback();
                console.error('Error:', error);
                res.status(500).send('Error al insertar datos');
            } 

            // Redirigir después de que la operación se haya completado correctamente
            return res.render('admin/CRUDplantas', { name: req.session.name, admin: req.session.admin });

        } catch (err) {
            // Manejar errores de consulta a la base de datos
            console.error('Error: ', err);
            res.status(500).send('Error interno del servidor');
        }
    });
}

function readPlants(req, res){
    req.getConnection((err, conn) =>{
        if (err) {
            // Manejar errores de conexión a la base de datos
            console.error('Error de conexión a la base de datos:', err);
            return res.status(500).send('Error interno del servidor');
        }

        const readPlantQuery = 'SELECT idCultivo, Nombre_Comun, Nombre_Genero, Nombre_Especie, Tipo, RegionGeografica, Catalogo_Taxonomia_idCatalogo_Taxonomia FROM Cultivo';

        try{

            conn.query(readPlantQuery, (err, results) =>{
                if (err) {
                    // Manejar errores de consulta a la base de datos
                    console.error('Error en la consulta a la base de datos:', err);
                    return res.status(500).send('Error interno del servidor');
                }
                res.json(results);
            })

        } catch(error){

        }

    });  
}

function deletePlant(req, res) {
  
    const idCultivo = req.params.idCultivo;
  
    req.getConnection(async (err, conn) => {
      if (err) {
        console.error('Error de conexión a la base de datos:', err);
        return res.status(500).json({ success: false, message: 'Error interno del servidor' });
      }
  
      await conn.promise().beginTransaction();
  
      try {
        // Eliminar de la tabla "Cultivo"
        const deletePlantQuery = 'DELETE FROM Cultivo WHERE idCultivo = ?';
        await conn.promise().query(deletePlantQuery, [idCultivo]);
  
        // Eliminar de la tabla "Catalogo_Taxonomia_C"
        const deleteCatalogoTaxonomiaQuery = 'DELETE FROM Catalogo_Taxonomia_C WHERE idCatalogo_Taxonomia = ?';
        await conn.promise().query(deleteCatalogoTaxonomiaQuery, [idCultivo]);
  
        await conn.promise().commit();
  
        res.json({ success: true, message: 'Registros eliminados correctamente' });
    } catch (error) {
        await conn.promise().rollback();
        console.error('Error al eliminar registros:', error);
        res.status(500).json({ success: false, message: 'Error al eliminar registros: ' + error.message });
    }
    });
  }

  function redirectUpdatePlant (req, res){
    readOnlyPlant(req, res);

}

async function readOnlyPlant(req, res) {
    try {
        const conn = await new Promise((resolve, reject) => {
            req.getConnection((err, connection) => {
                if (err) {
                    console.error('Error de conexión a la base de datos:', err);
                    reject(err);
                } else {
                    resolve(connection);
                }
            });
        });

        const readPlantQuery = `
            SELECT 
                Cultivo.idCultivo, Cultivo.Tipo, Cultivo.RegionGeografica, Cultivo.Foto,
                Cultivo.Nombre_Comun, Cultivo.Nombre_Especie, Cultivo.Nombre_Genero,
                Cultivo.Rasgos_Especificos, Cultivo.Informacion_Cuidado,
                Catalogo_Taxonomia_C.idCatalogo_Taxonomia, Catalogo_Taxonomia_C.Reino,
                Catalogo_Taxonomia_C.Filo, Catalogo_Taxonomia_C.Clase,
                Catalogo_Taxonomia_C.Orden, Catalogo_Taxonomia_C.Familia,
                Catalogo_Taxonomia_C.Genero, Catalogo_Taxonomia_C.Especie
            FROM 
                Cultivo
            INNER JOIN 
                Catalogo_Taxonomia_C 
            ON 
                Cultivo.Catalogo_Taxonomia_idCatalogo_Taxonomia = Catalogo_Taxonomia_C.idCatalogo_Taxonomia
            WHERE
                Cultivo.idCultivo = ?`;

        const idCultivo = req.params.id;

        const results = await new Promise((resolve, reject) => {
            conn.query(readPlantQuery, [idCultivo], (err, results) => {
                if (err) {
                    console.error('Error en la consulta a la base de datos:', err);
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
        if (results && results.length > 0) {
            // Renderizar la plantilla con los datos obtenidos
            res.render('admin/UpdatePlantas', { plantData: results[0], name: req.session.name, admin: req.session.admin });
        } else {
            // No se encontraron resultados, puedes manejarlo de alguna manera, por ejemplo, redirigir a una página de error.
            res.status(404).send('No se encontraron datos para el ID proporcionado.');
        }

    } catch (error) {
        console.error('Error en la ejecución de la consulta:', error);
        res.status(500).send('Error interno del servidor');
    }
}



  

module.exports = {
    CRUDplantas,
    createPlants, 
    readPlants,
    redirectUpdatePlant,  
    deletePlant,
    readOnlyPlant, 
}
