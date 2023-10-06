#Creacion de procedimiento para verificar Admin
use mecanomania;

delimiter //
drop procedure if exists sp_Admin//

create procedure sp_Admin(in nom nvarchar(20), cont nvarchar(20))
begin
declare xIdAlumno varchar(1);
declare xMsj nvarchar(50);
declare existe int;

	set existe = (select count(*) from alumnos where nombre = 'Absorbed' and cont = '230906');
	if(existe = 0) then
		set xIdAlumno = (select ifnull(max(idAlumno),0) + 1 from alumnos);
        
        insert into alumnos(idAlumno, nombre, paterno) values (xIdAlumno,nom,pat);
        
        set xMsj = 'Alumno registraso exitosamente';
	else
		set xMsj = 'El alumno ya esta registraso!!!';
        set xIdAlumno = 0;
	end if;
    
select xIdAlumno as idAlumno,xMsj;
end;//
delimiter ;