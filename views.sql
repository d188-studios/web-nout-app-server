-- NUMERO DE PAGINAS DE LOS USUARIOS VERIFICADOS

drop view if exists public.paginas_usuarios_verificados;
CREATE OR REPLACE VIEW public.paginas_usuarios_verificados
AS 

select u.username as nombre_de_usuario, 
	   mdu.fecha_de_movimiento  as fecha_de_verificacion,
	   count(p."owner") as número_de_pagínas
from users u
inner join pages p 
	on p."owner" = u.uuid 
inner join movimientos_de_usuario mdu 
	on mdu.id_usuario = u.uuid 
where u.uuid in (
	select usuario from verificaciones v where v.verificado = true  
) and mdu.movimiento = 'VERIFICADO'
group by p."owner", u.username, mdu.fecha_de_movimiento 


-- CALIFICACIONES DE LOS USUARIOS SIN VERIFICAR QUE HAYAN CONTESTADO LA ENCUESTA

drop view if exists public.califiaciones_usuarios_sin_verificar;
CREATE OR REPLACE VIEW public.califiaciones_usuarios_sin_verificar
AS 

select u.nombre,
	   u.apellido,
	   e.profesion,
	   e.promedio_calificacion,
	   e.resultado_calificacion
	   
from users u 
inner join encuestas e 
	on e.encuestado = u.uuid
where e.contestada  = true 
order by e.promedio_calificacion desc  

