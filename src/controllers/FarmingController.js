function inicioCultivos(req, res) {

    res.render('moduloCultivos/inicio', { name: req.session.name, module: "Cultivos" });

}

function buscadorCultivos(req, res) {
    res.render('moduloCultivos/buscador', { name: req.session.name });
}

function search(req, res) {
    const especie = req.query.especie.toLowerCase();

    // Consulta para obtener resultados y el total de filas
    const query = `
        SELECT Catalogo_Taxonomia_C.idCatalogo_Taxonomia, Reino, Filo, Clase, Orden, Familia, Genero, Especie,
            Cultivo.idCultivo, Tipo, RegionGeografica, Foto, Nombre_Comun, Nombre_Especie, Nombre_Genero,
            Rasgos_Especificos, Informacion_Cuidado
        FROM Catalogo_Taxonomia_C
        LEFT JOIN Cultivo ON Cultivo.Catalogo_Taxonomia_idCatalogo_Taxonomia = Catalogo_Taxonomia_C.idCatalogo_Taxonomia
        WHERE LOWER(Catalogo_Taxonomia_C.Especie) LIKE LOWER('%${especie}%') OR
            LOWER(Cultivo.Nombre_Especie) LIKE LOWER('%${especie}%')`;

    // Consulta para contar el total de filas
    let countQuery = `
        SELECT COUNT(*) AS total
        FROM Catalogo_Taxonomia_C
        LEFT JOIN Cultivo ON Cultivo.Catalogo_Taxonomia_idCatalogo_Taxonomia = Catalogo_Taxonomia_C.idCatalogo_Taxonomia
        WHERE LOWER(Catalogo_Taxonomia_C.Especie) LIKE LOWER('%${especie}%') OR
            LOWER(Cultivo.Nombre_Especie) LIKE LOWER('%${especie}%')`;

    req.getConnection((err, connection) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error interno del servidor');
        }

        connection.promise().query(query)
            .then(([results, fields]) => {
                connection.promise().query(countQuery)
                    .then(([countResult, countFields]) => {
                        const totalResults = countResult[0].total;
                        const formattedResults = Array.isArray(results) ? results : [results];
                        res.render('moduloCultivos/buscador', { results: formattedResults, searchTerm: especie, totalResults, name: req.session.name });
                    })
                    .catch((error) => {
                        console.error(error);
                        res.status(500).send('Error interno del servidor');
                    });
            })
            .catch((error) => {
                console.error(error);
                res.status(500).send('Error interno del servidor');
            });
    });
}

function advancedSearch(req, res) {
    // Obtener parámetros del formulario
    const tipo = req.query.tipo ? req.query.tipo.toLowerCase() : null;
    const regionGeografica = req.query.regionGeografica ? req.query.regionGeografica.toLowerCase() : null;
    const nombreComun = req.query.nombreComun ? req.query.nombreComun.toLowerCase() : null;
    const reino = req.query.reino ? req.query.reino.toLowerCase() : null;
    const filo = req.query.filo ? req.query.filo.toLowerCase() : null;
    const clase = req.query.clase ? req.query.clase.toLowerCase() : null;
    const orden = req.query.orden ? req.query.orden.toLowerCase() : null;
    const familia = req.query.familia ? req.query.familia.toLowerCase() : null;
    const genero = req.query.genero ? req.query.genero.toLowerCase() : null;
    const especie = req.query.especie ? req.query.especie.toLowerCase() : null;

    // Construir la consulta SQL basada en los parámetros seleccionados
    let advancedSearchQuery = `
        SELECT Catalogo_Taxonomia_C.idCatalogo_Taxonomia, Reino, Filo, Clase, Orden, Familia, Genero, Especie,
            Cultivo.idCultivo, Tipo, RegionGeografica, Foto, Nombre_Comun, Nombre_Especie, Nombre_Genero,
            Rasgos_Especificos, Informacion_Cuidado
        FROM Catalogo_Taxonomia_C
        LEFT JOIN Cultivo ON Cultivo.Catalogo_Taxonomia_idCatalogo_Taxonomia = Catalogo_Taxonomia_C.idCatalogo_Taxonomia
        WHERE 1`;

    if (tipo) {
        advancedSearchQuery += ` AND LOWER(Tipo) = LOWER('${tipo}')`;
    }

    if (regionGeografica) {
        advancedSearchQuery += ` AND LOWER(RegionGeografica) = LOWER('${regionGeografica}')`;
    }

    if (nombreComun) {
        advancedSearchQuery += ` AND LOWER(Nombre_Comun) LIKE LOWER('%${nombreComun}%')`;
    }

    if (reino) {
        advancedSearchQuery += ` AND LOWER(Reino) = LOWER('${reino}')`;
    }

    if (filo) {
        advancedSearchQuery += ` AND LOWER(Filo) = LOWER('${filo}')`;
    }

    if (clase) {
        advancedSearchQuery += ` AND LOWER(Clase) = LOWER('${clase}')`;
    }

    if (orden) {
        advancedSearchQuery += ` AND LOWER(Orden) = LOWER('${orden}')`;
    }

    if (familia) {
        advancedSearchQuery += ` AND LOWER(Familia) = LOWER('${familia}')`;
    }

    if (genero) {
        advancedSearchQuery += ` AND LOWER(Genero) = LOWER('${genero}')`;
    }

    if (especie) {
        advancedSearchQuery += ` AND LOWER(Especie) LIKE LOWER('%${especie}%')`;
    }

    // Realizar la consulta y enviar los resultados a la vista
    req.getConnection((err, connection) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error interno del servidor');
        }

        // Consulta para contar el total de filas
        let countQuery = `
            SELECT COUNT(*) AS total
            FROM Catalogo_Taxonomia_C
            LEFT JOIN Cultivo ON Cultivo.Catalogo_Taxonomia_idCatalogo_Taxonomia = Catalogo_Taxonomia_C.idCatalogo_Taxonomia
            WHERE 1`;

        // Agregar condiciones según los parámetros seleccionados
        if (tipo) {
            countQuery += ` AND LOWER(Tipo) = LOWER('${tipo}')`;
        }

        if (regionGeografica) {
            countQuery += ` AND LOWER(RegionGeografica) = LOWER('${regionGeografica}')`;
        }

        if (nombreComun) {
            countQuery += ` AND LOWER(Nombre_Comun) LIKE LOWER('%${nombreComun}%')`;
        }

        if (reino) {
            countQuery += ` AND LOWER(Reino) = LOWER('${reino}')`;
        }

        if (filo) {
            countQuery += ` AND LOWER(Filo) = LOWER('${filo}')`;
        }

        if (clase) {
            countQuery += ` AND LOWER(Clase) = LOWER('${clase}')`;
        }

        if (orden) {
            countQuery += ` AND LOWER(Orden) = LOWER('${orden}')`;
        }

        if (familia) {
            countQuery += ` AND LOWER(Familia) = LOWER('${familia}')`;
        }

        if (genero) {
            countQuery += ` AND LOWER(Genero) = LOWER('${genero}')`;
        }

        if (especie) {
            countQuery += ` AND LOWER(Especie) LIKE LOWER('%${especie}%')`;
        }

        connection.promise().query(advancedSearchQuery)
            .then(([results, fields]) => {
                connection.promise().query(countQuery)
                    .then(([countResult, countFields]) => {
                        const totalResults = countResult[0].total;
                        const formattedResults = Array.isArray(results) ? results : [results];
                        res.render('moduloCultivos/buscador', { results: formattedResults, totalResults, name: req.session.name });
                    })
                    .catch((error) => {
                        console.error(error);
                        res.status(500).send('Error interno del servidor');
                    });
            })
            .catch((error) => {
                console.error(error);
                res.status(500).send('Error interno del servidor');
            });
    });
}




module.exports = {
    inicioCultivos,
    buscadorCultivos,
    search,
    advancedSearch,
}
