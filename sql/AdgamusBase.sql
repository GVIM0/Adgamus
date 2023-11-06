-- MySQL Script generated by MySQL Workbench
-- Sat Oct 28 18:45:24 2023
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering
drop database if exists AdgamusBase;
SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `Adgamus` ;

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `Adgamus` DEFAULT CHARACTER SET utf8 ;
USE `Adgamus` ;

-- -----------------------------------------------------
-- Table `Adgamus`.`Usuario`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Adgamus`.`Usuario` ;

CREATE TABLE IF NOT EXISTS `Adgamus`.`Usuario` (
  `idUsuario` INT NOT NULL,
  `NombreUsuario` VARCHAR(45),
  `CorreoUsuario` VARCHAR(45),
  `Contraseña` VARCHAR(45),
  `Nombre` VARCHAR(45),
  `Apellido` VARCHAR(45),
  `Descripcion` VARCHAR(45),
  `Foto_Perfil` BLOB(1),
  `Preferencias` VARCHAR(45),
  PRIMARY KEY (`idUsuario`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Adgamus`.`Catalogo_Taxonomia_C`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Adgamus`.`Catalogo_Taxonomia_C` ;

CREATE TABLE IF NOT EXISTS `Adgamus`.`Catalogo_Taxonomia_C` (
  `idCatalogo_Taxonomia` INT NOT NULL,
  `Reino` VARCHAR(45),
  `Filo` VARCHAR(45),
  `Clase` VARCHAR(45),
  `Orden` VARCHAR(45),
  `Familia` VARCHAR(45),
  `Genero` VARCHAR(45),
  `Especie` VARCHAR(45),
  PRIMARY KEY (`idCatalogo_Taxonomia`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Adgamus`.`Cultivo`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Adgamus`.`Cultivo` ;

CREATE TABLE IF NOT EXISTS `Adgamus`.`Cultivo` (
  `idCultivo` INT NOT NULL,
  `Tipo` VARCHAR(45),
  `RegionGeografica` VARCHAR(45),
  `Foto` BLOB(1),
  `Nombre_Comun` VARCHAR(45),
  `Nombre_Especie` VARCHAR(45),
  `Nombre_Genero` VARCHAR(45),
  `Rasgos_Especificos` VARCHAR(45),
  `Informacion_Cuidado` VARCHAR(45),
  `Catalogo_Taxonomia_idCatalogo_Taxonomia` INT NOT NULL,
  PRIMARY KEY (`idCultivo`, `Catalogo_Taxonomia_idCatalogo_Taxonomia`),
  INDEX `fk_Cultivo_Catalogo_Taxonomia1_idx` (`Catalogo_Taxonomia_idCatalogo_Taxonomia` ASC) VISIBLE,
  CONSTRAINT `fk_Cultivo_Catalogo_Taxonomia1`
    FOREIGN KEY (`Catalogo_Taxonomia_idCatalogo_Taxonomia`)
    REFERENCES `Adgamus`.`Catalogo_Taxonomia_C` (`idCatalogo_Taxonomia`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Adgamus`.`Busqueda`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Adgamus`.`Busqueda` ;

CREATE TABLE IF NOT EXISTS `Adgamus`.`Busqueda` (
  `idBusqueda` INT NOT NULL,
  `idUsuario` INT NOT NULL,
  `idCultivo` INT NOT NULL,
  `Usuario_idUsuario` INT NOT NULL,
  `Cultivo_idCultivo` INT NOT NULL,
  PRIMARY KEY (`idBusqueda`, `Usuario_idUsuario`, `Cultivo_idCultivo`),
  INDEX `fk_Busqueda_Usuario1_idx` (`Usuario_idUsuario` ASC) VISIBLE,
  INDEX `fk_Busqueda_Cultivo1_idx` (`Cultivo_idCultivo` ASC) VISIBLE,
  CONSTRAINT `fk_Busqueda_Usuario1`
    FOREIGN KEY (`Usuario_idUsuario`)
    REFERENCES `Adgamus`.`Usuario` (`idUsuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Busqueda_Cultivo1`
    FOREIGN KEY (`Cultivo_idCultivo`)
    REFERENCES `Adgamus`.`Cultivo` (`idCultivo`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Adgamus`.`Seguimiento`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Adgamus`.`Seguimiento` ;

CREATE TABLE IF NOT EXISTS `Adgamus`.`Seguimiento` (
  `idSeguimiento` INT NOT NULL,
  `Tipo_Seg` VARCHAR(45),
  `Descripcion` VARCHAR(45),
  `Nombre` VARCHAR(45),
  `Usuario_idUsuario` INT NOT NULL,
  PRIMARY KEY (`idSeguimiento`, `Usuario_idUsuario`),
  INDEX `fk_Seguimiento_Usuario1_idx` (`Usuario_idUsuario` ASC) VISIBLE,
  CONSTRAINT `fk_Seguimiento_Usuario1`
    FOREIGN KEY (`Usuario_idUsuario`)
    REFERENCES `Adgamus`.`Usuario` (`idUsuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Adgamus`.`Catalogo_Taxonomia_A`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Adgamus`.`Catalogo_Taxonomia_A` ;

CREATE TABLE IF NOT EXISTS `Adgamus`.`Catalogo_Taxonomia_A` (
  `idCatalogo_Taxonomia` INT NOT NULL,
  `Reino` VARCHAR(45),
  `Filo` VARCHAR(45),
  `Clase` VARCHAR(45),
  `Orden` VARCHAR(45),
  `Familia` VARCHAR(45),
  `Genero` VARCHAR(45),
  `Especie` VARCHAR(45),
  PRIMARY KEY (`idCatalogo_Taxonomia`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Adgamus`.`Especia_Animal`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Adgamus`.`Especia_Animal` ;

CREATE TABLE IF NOT EXISTS `Adgamus`.`Especia_Animal` (
  `idAnimal` INT NOT NULL,
  `Nombre_Especie` VARCHAR(45),
  `Nombre_Genero` VARCHAR(45),
  `Nombre_Comun_E` VARCHAR(45),
  `Descripcion_General` VARCHAR(45),
  `Descripcion_Fisica` VARCHAR(45),
  `Promedio_Vida` VARCHAR(45),
  `Foto` BLOB(1) NULL,
  `Catalogo_Taxonomia_A_idCatalogo_Taxonomia` INT NOT NULL,
  PRIMARY KEY (`idAnimal`, `Catalogo_Taxonomia_A_idCatalogo_Taxonomia`),
  INDEX `fk_Especia_Animal_Catalogo_Taxonomia_A1_idx` (`Catalogo_Taxonomia_A_idCatalogo_Taxonomia` ASC) VISIBLE,
  CONSTRAINT `fk_Especia_Animal_Catalogo_Taxonomia_A1`
    FOREIGN KEY (`Catalogo_Taxonomia_A_idCatalogo_Taxonomia`)
    REFERENCES `Adgamus`.`Catalogo_Taxonomia_A` (`idCatalogo_Taxonomia`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Cria`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Adgamus`.`Cria` ;

CREATE TABLE IF NOT EXISTS `Adgamus`.`Cria` (
  `idCria` INT NOT NULL,
  `idUsuario` VARCHAR(45) NOT NULL,
  `idAnimal` VARCHAR(45) NOT NULL,
  `Usuario_idUsuario` INT NOT NULL,
  `Especia_Animal_idAnimal` INT NOT NULL,
  PRIMARY KEY (`idCria`, `Usuario_idUsuario`, `Especia_Animal_idAnimal`),
  INDEX `fk_Cria_Usuario1_idx` (`Usuario_idUsuario` ASC) VISIBLE,
  INDEX `fk_Cria_Especia_Animal1_idx` (`Especia_Animal_idAnimal` ASC) VISIBLE,
  CONSTRAINT `fk_Cria_Usuario1`
    FOREIGN KEY (`Usuario_idUsuario`)
    REFERENCES `Adgamus`.`Usuario` (`idUsuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Cria_Especia_Animal1`
    FOREIGN KEY (`Especia_Animal_idAnimal`)
    REFERENCES `Adgamus`.`Especia_Animal` (`idAnimal`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Adgamus`.`Post`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Adgamus`.`Post` ;

CREATE TABLE IF NOT EXISTS `Adgamus`.`Post` (
  `idPost` INT NOT NULL,
  `Fecha` DATE,
  `Titulo` VARCHAR(45),
  `Descripcion` VARCHAR(45),
  `Etiquetas` VARCHAR(45),
  `Foto` BLOB(1),
  `Hora` TIME,
  `Usuario_idUsuario` INT NOT NULL,
  PRIMARY KEY (`idPost`, `Usuario_idUsuario`),
  INDEX `fk_Post_Usuario1_idx` (`Usuario_idUsuario` ASC) VISIBLE,
  CONSTRAINT `fk_Post_Usuario1`
    FOREIGN KEY (`Usuario_idUsuario`)
    REFERENCES `Adgamus`.`Usuario` (`idUsuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Adgamus`.`CatalogoEtiquetas`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Adgamus`.`CatalogoEtiquetas` ;

CREATE TABLE IF NOT EXISTS `Adgamus`.`CatalogoEtiquetas` (
  `idCatalogoEtiquetas` INT NOT NULL,
  `Descripcion` VARCHAR(45),
  PRIMARY KEY (`idCatalogoEtiquetas`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Adgamus`.`CatalogoRespuesta`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Adgamus`.`CatalogoRespuesta` ;

CREATE TABLE IF NOT EXISTS `Adgamus`.`CatalogoRespuesta` (
  `idCatalogoRespuesta` INT NOT NULL,
  `Descripcion` VARCHAR(45),
  PRIMARY KEY (`idCatalogoRespuesta`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Adgamus`.`Respuetas`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Adgamus`.`Respuetas` ;

CREATE TABLE IF NOT EXISTS `Adgamus`.`Respuetas` (
  `idRespuesta` INT NOT NULL,
  `CatalogoEtiquetas_idCatalogoEtiquetas` INT NOT NULL,
  `CatalogoRespuesta_idCatalogoRespuesta` INT NOT NULL,
  `Usuario_idUsuario` INT NOT NULL,
  PRIMARY KEY (`idRespuesta`, `CatalogoEtiquetas_idCatalogoEtiquetas`, `CatalogoRespuesta_idCatalogoRespuesta`, `Usuario_idUsuario`),
  INDEX `fk_ChatBot_CatalogoEtiquetas1_idx` (`CatalogoEtiquetas_idCatalogoEtiquetas` ASC) VISIBLE,
  INDEX `fk_ChatBot_CatalogoRespuesta1_idx` (`CatalogoRespuesta_idCatalogoRespuesta` ASC) VISIBLE,
  INDEX `fk_Respuetas_Usuario1_idx` (`Usuario_idUsuario` ASC) VISIBLE,
  CONSTRAINT `fk_ChatBot_CatalogoEtiquetas1`
    FOREIGN KEY (`CatalogoEtiquetas_idCatalogoEtiquetas`)
    REFERENCES `Adgamus`.`CatalogoEtiquetas` (`idCatalogoEtiquetas`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_ChatBot_CatalogoRespuesta1`
    FOREIGN KEY (`CatalogoRespuesta_idCatalogoRespuesta`)
    REFERENCES `Adgamus`.`CatalogoRespuesta` (`idCatalogoRespuesta`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Respuetas_Usuario1`
    FOREIGN KEY (`Usuario_idUsuario`)
    REFERENCES `Adgamus`.`Usuario` (`idUsuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Adgamus`.`Recurso`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Adgamus`.`Recurso` ;

CREATE TABLE IF NOT EXISTS `Adgamus`.`Recurso` (
  `idRecurso` INT NOT NULL,
  `Unidad_Medida` REAL,
  `Nombre` VARCHAR(45),
  `Tarifa` INT,
  `Descripcion` VARCHAR(45),
  PRIMARY KEY (`idRecurso`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Adgamus`.`Cotiza`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Adgamus`.`Cotiza` ;

CREATE TABLE IF NOT EXISTS `Adgamus`.`Cotiza` (
  `idCosto` INT NOT NULL,
  `idUsuario` INT NOT NULL,
  `idRecurso` INT NOT NULL,
  `Periodo_Facturacion` DATE,
  `Costo_Total` INT,
  `Recurso_idRecurso` INT NOT NULL,
  `Usuario_idUsuario` INT NOT NULL,
  PRIMARY KEY (`idCosto`, `Recurso_idRecurso`, `Usuario_idUsuario`),
  INDEX `fk_Cotiza_Recurso1_idx` (`Recurso_idRecurso` ASC) VISIBLE,
  INDEX `fk_Cotiza_Usuario1_idx` (`Usuario_idUsuario` ASC) VISIBLE,
  CONSTRAINT `fk_Cotiza_Recurso1`
    FOREIGN KEY (`Recurso_idRecurso`)
    REFERENCES `Adgamus`.`Recurso` (`idRecurso`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Cotiza_Usuario1`
    FOREIGN KEY (`Usuario_idUsuario`)
    REFERENCES `Adgamus`.`Usuario` (`idUsuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Adgamus`.`Consume`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Adgamus`.`Consume` ;

CREATE TABLE IF NOT EXISTS `Adgamus`.`Consume` (
  `idConsumo` INT NOT NULL,
  `idUsuario` INT NOT NULL,
  `idRecurso` INT NOT NULL,
  `Fecha` DATE,
  `Hora` TIME,
  `Cantidad` INT,
  `Recurso_idRecurso` INT NOT NULL,
  `Usuario_idUsuario` INT NOT NULL,
  PRIMARY KEY (`idConsumo`, `Recurso_idRecurso`, `Usuario_idUsuario`),
  INDEX `fk_Consume_Recurso1_idx` (`Recurso_idRecurso` ASC) VISIBLE,
  INDEX `fk_Consume_Usuario1_idx` (`Usuario_idUsuario` ASC) VISIBLE,
  CONSTRAINT `fk_Consume_Recurso1`
    FOREIGN KEY (`Recurso_idRecurso`)
    REFERENCES `Adgamus`.`Recurso` (`idRecurso`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Consume_Usuario1`
    FOREIGN KEY (`Usuario_idUsuario`)
    REFERENCES `Adgamus`.`Usuario` (`idUsuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;