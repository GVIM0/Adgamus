drop database if exists mecanomania;
create database mecanomania;

use mecanomania;

#----------------- Tabla Usuario -------------------------------------------------

create table Usuario (idUsuario int auto_increment not null primary key, 
					nombre varchar(20) not null, 
					contrasenia varchar(20) not null);

insert into Usuario values(1,'Absorbed','230906'),
							(2,'0M1N', 'spider-manWoody777.'),
                            (3, 'Gabriel', 'Veracruz'),
                            (4, 'Ponce', 'Mañoso');

select * from Usuario;
#----------------- Tabla catalogoUsuario -------------------------------------------------

create table catalogoUsuario(idCatalogo int primary key,
							idUsuario int not null,
                            nombreUsu varchar(20),
                            contraseniaUsu varchar(20),
FOREIGN KEY (idUsuario) REFERENCES Usuario (idUsuario));

#----------------- Tabla Configuracion -------------------------------------------------

create table Configuracion (idConfiguracion int not null primary key,
							idUsuario int not null,
							idioma varchar(100),
							keyboard varchar(100),
                            musica varchar(50),
FOREIGN KEY (idUsuario) REFERENCES Usuario (idUsuario));

#----------------- Tabla catalogoIdioma -------------------------------------------------

-- create table catalogoIdioma (idIdioma int auto_increment not null primary key,
-- 							idConfiguracion int not null,
--                             descripcionIdioma varchar(50),
-- FOREIGN KEY (idConfiguracion) REFERENCES Configuracion (idConfiguracion));

#----------------- Tabla catalogoTipoKeyBoard -------------------------------------------------

-- create table catalogoTipoKeyBoard (idTipoKeyBoard int auto_increment not null primary key,
-- 								idConfiguracion int not null,
-- 								descripcionTipoKeyBoard varchar(50),
-- FOREIGN KEY (idConfiguracion) REFERENCES Configuracion (idConfiguracion));

#----------------- Tabla Puntaje -------------------------------------------------

create table Puntaje (idPuntaje int auto_increment not null primary key,
					nombreUsu varchar(20),
					puntajeUsu int);
                    
#----------------- Tabla relUsuPuntaje -------------------------------------------------                   

create table relUsuPuntaje(idreluP int auto_increment not null primary key,
							idUsuario int not null,
                            idPuntaje int not null,
FOREIGN KEY (idUsuario) REFERENCES Usuario (idUsuario),
FOREIGN KEY (idPuntaje) REFERENCES Puntaje (idPuntaje));

#----------------- Tabla Nivel -------------------------------------------------
                    
create table Nivel (idNivel int not null primary key,
					idUsuario int not null,
					numNivel int not null,
					nombreNivel varchar(25) not null,
					estadoNivel varchar(20) not null,
					dificultadNivel varchar(20),
					categoria varchar(100),
					musica varchar(100),
FOREIGN KEY (idUsuario) REFERENCES Usuario (idUsuario));

#----------------- Tabla catalogoCategoria -------------------------------------------------

-- create table catalogoCategoria (idCatCategoria int auto_increment not null primary key,
-- 								idNivel int not null,
--                                 tipoCategoria varchar(20),
--                                 descripcionCategoria varchar(20),
-- FOREIGN KEY (idNivel) REFERENCES Nivel(idNivel));

#----------------- Tabla catalogoMusica -------------------------------------------------

-- create table catalogoMusica (idCatMusica int auto_increment not null primary key,
-- 							idNivel int not null,
-- 							tipoMusica varchar(20),
-- FOREIGN KEY (idNivel) REFERENCES Nivel(idNivel));

#----------------- Tabla Trofeo -------------------------------------------------

create table Trofeo (idTrofeo int auto_increment primary key not null,
					nombre varchar(100),
                    estado varchar(100),
                    descripcion varchar(100));
                    
#----------------- Tabla relNivelTrofeo -------------------------------------------------

create table relNivelTrofeo (idRelNT int auto_increment not null primary key,
							idNivel int not null,
                            idTrofeo int not null,
FOREIGN KEY (idNivel) REFERENCES Nivel (idNivel),
FOREIGN KEY (idTrofeo) REFERENCES Trofeo (idTrofeo));

#----------------- Tabla catalogoTrofeo -------------------------------------------------

-- create table catalogoTrofeo (idCatTrofeo int auto_increment not null primary key,
-- 							idTrofeo int not null,
--                            nombreTrofeo varchar(20),
-- 							estadoTrofeo varchar(20),
--                             descripcionTrofeo varchar(20),
-- FOREIGN KEY (idTrofeo) REFERENCES Trofeo (idTrofeo));

#----------------- Tabla Logro -------------------------------------------------

create table Logro (idLogro int auto_increment primary key not null,
					nombre varchar(100),
                    estado varchar(100),
                    descripcion varchar(100),
                    calidad varchar(100));
                    
                    
#----------------- Tabla relNivelLogro -------------------------------------------------

create table relNivelLogro (idRelNL int auto_increment not null primary key,
							idNivel int not null,
                            idLogro int not null,
FOREIGN KEY (idNivel) REFERENCES Nivel (idNivel),
FOREIGN KEY (idLogro) REFERENCES Logro (idLogro));


#----------------- Tabla catalogoLogro -------------------------------------------------

-- create table catalogoLogro (idCatLogro int auto_increment not null primary key,
-- 							idLogro int not null,
--                             nombreLogro varchar(20),
--                             estadoLogro varchar(20),
-- 							descripcionLogro varchar(20),
--                             calidaLogro varchar(20),
-- FOREIGN KEY (idLogro) REFERENCES Logro (idLogro));



#------------------------- Prodecimiento buscar-----------------------------
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `buscar`(in var1 varchar(20), var2 varchar(20))
BEGIN

	select * from Usuario where contrasenia = var1 and nombre = var2;

END ;;
DELIMITER ;

#------------------------- Prodecimiento agregar-----------------------------
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `agregar`(in var1 int(10),
															var2 varchar(40), var3 varchar(40))
BEGIN
	insert into Usuario values (var1,var2,var3);
END ;;
DELIMITER ;

#------------------------- Prodecimiento comparar-----------------------------
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `buscar2`(in var1 int(10),
													var2 varchar(40))
BEGIN
declare existe VARCHAR(10);
set existe = (select count(*) from Usuario where nombre = var1 and contrasenia = var2);

END ;;
DELIMITER ;

#------------------------- Prodecimiento obtener_id-----------------------------
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `obtener_id`(in var1 varchar(40))
BEGIN
	select (idUsuario) from Usuario where nombre = var1;
END ;;
DELIMITER ;
#------------------------- Prodecimiento guardar_ajustes-----------------------------
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `guardar_ajustes`(in var1 int(10), var2 varchar(40), var3 varchar(40), var4 varchar(40))
BEGIN
	insert into Usuarios (idUsuario,idioma,keyboard,musica) values (var1, var2, var3,var4); 
END ;;
DELIMITER ;
#------------------------------------------------------


SHOW tables;

select * from Usuario;

delete from Usuario where idUsuario;