-- Active: 1699218736593@@localhost@3308@adgamus

CREATE DATABASE IF NOT EXISTS `adgamus` use adgamus;

CREATE TABLE
    IF NOT EXISTS `usuario` (
        `idUsuario` int NOT NULL,
        `NombreUsuario` varchar(45) DEFAULT NULL,
        `CorreoUsuario` varchar(45) DEFAULT NULL,
        `Contraseña` varchar(255) DEFAULT NULL,
        `Nombre` varchar(45) DEFAULT NULL,
        `Apellido` varchar(45) DEFAULT NULL,
        `Descripcion` varchar(45) DEFAULT NULL,
        `Foto_Perfil` tinyblob,
        `Preferencias` varchar(45) DEFAULT NULL,
        PRIMARY KEY (`idUsuario`)
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb3;

SELECT * FROM usuario;